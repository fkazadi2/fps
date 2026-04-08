"use client";

import { ReactNode } from "react";

interface ImagePlaceholderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  gradient?: "primary" | "secondary" | "accent" | "danger" | "custom";
  customGradient?: string;
  height?: "small" | "medium" | "large";
}

const gradientClasses = {
  primary: "from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]",
  secondary: "from-[var(--secondary)] via-[var(--primary)] to-[var(--danger)]",
  accent: "from-[var(--accent)] via-[var(--primary)] to-[var(--secondary)]",
  danger: "from-[var(--danger)] via-[var(--primary)] to-[var(--accent)]",
  custom: ""
};

const heightClasses = {
  small: "h-48 md:h-64",
  medium: "h-64 md:h-96",
  large: "h-96 md:h-[500px]"
};

export default function ImagePlaceholder({
  title,
  subtitle = "À remplacer par photo réelle de terrain",
  icon,
  gradient = "primary",
  customGradient,
  height = "medium"
}: ImagePlaceholderProps) {
  const gradientClass = gradient === "custom" && customGradient 
    ? customGradient 
    : gradientClasses[gradient];

  const defaultIcon = (
    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${heightClasses[height]} rounded-xl overflow-hidden relative bg-gradient-to-br ${gradientClass} group`}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90 p-6">
            <div className="w-24 h-24 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              {icon || defaultIcon}
            </div>
            <p className="text-lg font-semibold text-center">{title}</p>
            <p className="text-sm text-white/70 text-center mt-2">{subtitle}</p>
          </div>
          {/* Pattern décoratif */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 right-8 w-32 h-32 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
