import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const RESEND_API_URL = "https://api.resend.com/emails";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "reclamation@fps.gouv.cd";
const FROM_EMAIL = stripHeaderValue(
  process.env.CONTACT_FROM_EMAIL || "FPS Website <onboarding@resend.dev>"
);

const contactSchema = z.object({
  formType: z.enum(["contact", "reclamation", "nous-ecrire"]),
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional().default(""),
  subject: z.string().trim().optional().default(""),
  category: z.string().trim().optional().default(""),
  message: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
  date: z.string().trim().optional().default(""),
  location: z.string().trim().optional().default(""),
  trackingNumber: z.string().trim().optional().default(""),
});

type ContactPayload = z.infer<typeof contactSchema>;

function stripHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formTypeLabel(formType: ContactPayload["formType"]): string {
  if (formType === "reclamation") return "Réclamation";
  if (formType === "nous-ecrire") return "Nous écrire";
  return "Contact";
}

function buildEmail(payload: ContactPayload): { subject: string; text: string; html: string } {
  const message = payload.message || payload.description;
  const subject =
    payload.subject ||
    payload.category ||
    (payload.formType === "reclamation" ? "Nouvelle réclamation" : "Nouveau message");

  const lines = [
    `Type de formulaire: ${formTypeLabel(payload.formType)}`,
    payload.trackingNumber ? `Numéro de suivi: ${payload.trackingNumber}` : "",
    "",
    `Nom: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Téléphone: ${payload.phone}` : "",
    payload.category ? `Catégorie / sujet: ${payload.category}` : "",
    payload.date ? `Date de l'incident: ${payload.date}` : "",
    payload.location ? `Lieu de l'incident: ${payload.location}` : "",
    "",
    "Message:",
    message,
    "",
    `Envoyé depuis le site fps.cd le ${new Date().toLocaleString("fr-FR", {
      timeZone: "Africa/Kinshasa",
    })}`,
  ].filter(Boolean);

  return {
    subject: `[FPS] ${formTypeLabel(payload.formType)} - ${subject}`,
    text: lines.join("\n"),
    html: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap; line-height: 1.5;">${escapeHtml(
      lines.join("\n")
    )}</pre>`,
  };
}

async function sendMail(payload: ContactPayload): Promise<string | null> {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const { subject, text, html } = buildEmail(payload);
  const replyTo = stripHeaderValue(payload.email);

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "fps-website/1.0",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [RECIPIENT_EMAIL],
      subject,
      text,
      html,
      reply_to: replyTo,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      result?.error?.message ||
      result?.message ||
      (typeof result?.error === "string" ? result.error : null) ||
      `Resend API error (${response.status})`;
    throw new Error(message);
  }

  return result?.id || result?.data?.id || null;
}

export async function POST(request: NextRequest) {
  try {
    const parsed = contactSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Veuillez vérifier les champs du formulaire." },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const message = payload.message || payload.description;

    if (!message) {
      return NextResponse.json(
        { error: "Veuillez saisir un message." },
        { status: 400 }
      );
    }

    const emailId = await sendMail(payload);

    return NextResponse.json({
      ok: true,
      recipient: RECIPIENT_EMAIL,
      emailId,
      trackingNumber: payload.trackingNumber || null,
    });
  } catch (error) {
    console.error("[POST /api/contact] Email error:", error);

    return NextResponse.json(
      {
        error:
          "Le message n'a pas pu être envoyé. Veuillez réessayer ou écrire directement à reclamation@fps.gouv.cd.",
      },
      { status: 500 }
    );
  }
}
