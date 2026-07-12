"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Facebook, Linkedin, MessageCircle, Send, Share2 } from "lucide-react";

interface SocialShareButtonsProps {
    title: string;
    path?: string;
    className?: string;
}

export default function SocialShareButtons({ title, path, className = "" }: SocialShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [shareUrl, setShareUrl] = useState(path || "");

    useEffect(() => {
        setShareUrl(path ? new URL(path, window.location.origin).toString() : window.location.href);
    }, [path]);

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(shareUrl);

    const shareLinks = [
        {
            label: "Facebook",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: Facebook,
            className: "bg-blue-600 hover:bg-blue-700",
        },
        {
            label: "X",
            href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            icon: Send,
            className: "bg-slate-900 hover:bg-black",
        },
        {
            label: "LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            icon: Linkedin,
            className: "bg-blue-800 hover:bg-blue-900",
        },
        {
            label: "WhatsApp",
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            icon: MessageCircle,
            className: "bg-green-600 hover:bg-green-700",
        },
    ];

    const shareNatively = async () => {
        if (typeof navigator === "undefined" || !navigator.share) return;

        try {
            await navigator.share({ title, url: shareUrl });
        } catch {
            // L'utilisateur peut annuler le partage natif sans que ce soit une erreur utile.
        }
    };

    const copyLink = async () => {
        if (!shareUrl) return;

        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(shareUrl);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = shareUrl;
                textarea.setAttribute("readonly", "");
                textarea.style.position = "absolute";
                textarea.style.left = "-9999px";
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            }

            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className={`flex flex-wrap items-center gap-3 ${className}`}>
            <span className="text-gray-700 font-medium">Partager :</span>

            {shareLinks.map(({ label, href, icon: Icon, className: buttonClassName }) => (
                <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Partager sur ${label}`}
                    title={`Partager sur ${label}`}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${buttonClassName}`}
                >
                    <Icon className="h-5 w-5" />
                </a>
            ))}

            <button
                type="button"
                onClick={shareNatively}
                aria-label="Partager avec les options de l'appareil"
                title="Partager"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md"
            >
                <Share2 className="h-5 w-5" />
            </button>

            <button
                type="button"
                onClick={copyLink}
                aria-label="Copier le lien de l'article"
                title="Copier le lien"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md"
            >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copié" : "Copier"}
            </button>
        </div>
    );
}
