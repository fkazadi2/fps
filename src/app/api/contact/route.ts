import { spawn } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "reclamation@fps.gouv.cd";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "no-reply@fps.cd";
const SENDMAIL_PATH = process.env.SENDMAIL_PATH || "/usr/sbin/sendmail";

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

function encodeHeader(value: string): string {
  return `=?UTF-8?B?${Buffer.from(stripHeaderValue(value), "utf8").toString("base64")}?=`;
}

function formTypeLabel(formType: ContactPayload["formType"]): string {
  if (formType === "reclamation") return "Réclamation";
  if (formType === "nous-ecrire") return "Nous écrire";
  return "Contact";
}

function buildEmail(payload: ContactPayload): { subject: string; body: string } {
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
    body: lines.join("\n"),
  };
}

function sendMail(payload: ContactPayload): Promise<void> {
  const { subject, body } = buildEmail(payload);
  const replyTo = stripHeaderValue(payload.email);
  const senderName = stripHeaderValue(payload.name);

  const message = [
    `To: ${RECIPIENT_EMAIL}`,
    `From: FPS Website <${FROM_EMAIL}>`,
    `Reply-To: ${senderName} <${replyTo}>`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body,
  ].join("\n");

  return new Promise((resolve, reject) => {
    const child = spawn(SENDMAIL_PATH, ["-t", "-oi"]);
    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(stderr || `sendmail exited with code ${code}`));
      }
    });

    child.stdin.end(message);
  });
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

    await sendMail(payload);

    return NextResponse.json({
      ok: true,
      recipient: RECIPIENT_EMAIL,
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
