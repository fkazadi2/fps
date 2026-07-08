"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type HorizontalAutoScrollProps = {
  /** px to scroll on each step; defaults to container width */
  stepPx?: number;
  /** interval in ms */
  intervalMs?: number;
  /** children must render as horizontal row */
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export default function HorizontalAutoScroll({
  stepPx,
  intervalMs = 4500,
  children,
  className = "",
  innerClassName = "",
}: HorizontalAutoScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<number | null>(null);

  const resolvedStep = useMemo(() => {
    if (typeof stepPx === "number") return stepPx;
    return null;
  }, [stepPx]);

  const pauseTemporarily = (ms: number = 8000) => {
    setIsPaused(true);
    if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = window.setTimeout(() => setIsPaused(false), ms);
  };

  const scrollByStep = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = resolvedStep ?? Math.max(260, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: direction * step, behavior: "smooth" });
    pauseTemporarily();
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onUserInteract = () => pauseTemporarily();
    el.addEventListener("wheel", onUserInteract, { passive: true });
    el.addEventListener("touchstart", onUserInteract, { passive: true });
    el.addEventListener("pointerdown", onUserInteract, { passive: true });
    el.addEventListener("scroll", onUserInteract, { passive: true });

    return () => {
      el.removeEventListener("wheel", onUserInteract);
      el.removeEventListener("touchstart", onUserInteract);
      el.removeEventListener("pointerdown", onUserInteract);
      el.removeEventListener("scroll", onUserInteract);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (isPaused) return;

    const id = window.setInterval(() => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const atEnd = el.scrollLeft >= maxScrollLeft - 8;

      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const step = resolvedStep ?? Math.max(260, Math.floor(el.clientWidth * 0.9));
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, isPaused, resolvedStep]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        type="button"
        aria-label="Défiler vers la gauche"
        onClick={() => scrollByStep(-1)}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        type="button"
        aria-label="Défiler vers la droite"
        onClick={() => scrollByStep(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Padding latéral pour éviter que les cartes passent sous les boutons */}
      <div
        ref={scrollerRef}
        className="overflow-x-auto pb-3 -mx-4 px-14 scroll-px-14"
      >
        <div className={innerClassName}>{children}</div>
      </div>
    </div>
  );
}

