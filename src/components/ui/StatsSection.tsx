"use client";

import { useState, useEffect, useRef } from "react";
import { Users, Building, CheckCircle, TrendingUp, BarChart3 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StatValue {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface StatsContent {
  title: string;
  subtitle: string;
  values: StatValue[];
}

interface StatsSectionProps {
  customContent?: StatsContent;
}

export default function StatsSection({ customContent }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);

  // Hook pour l'effet parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Configuration par défaut
  const defaultContent: StatsContent = {
    title: "Notre impact en chiffres",
    subtitle: "Le FPS en action pour améliorer la santé publique en RDC",
    values: [
      { label: "Personnes couvertes", value: "5M+", icon: "users", color: "bg-[var(--danger)]" },
      { label: "Centres de santé partenaires", value: "650+", icon: "building", color: "bg-[var(--accent)]" },
      { label: "Provinces couvertes", value: "26", icon: "check", color: "bg-emerald-500" },
      { label: "Taux de satisfaction", value: "85%", icon: "trending", color: "bg-blue-500" }
    ]
  };

  const content = customContent || defaultContent;

  // Fonction pour extraire le nombre d'une chaîne
  const extractNumber = (str: string): number => {
    const match = str.match(/[\d.]+/);
    if (!match) return 0;
    const num = parseFloat(match[0]);
    if (str.includes('M')) return num * 1000000;
    if (str.includes('K')) return num * 1000;
    return num;
  };

  // Valeurs cibles pour les compteurs
  const targetValues = content.values.map(v => extractNumber(v.value));

  // Formats d'affichage pour les valeurs
  const formatValues = content.values.map(v => {
    if (v.value.includes('M+')) return (val: number) => `${Math.floor(val / 1000000)}M+`;
    if (v.value.includes('+')) return (val: number) => `${val}+`;
    if (v.value.includes('%')) return (val: number) => `${val}%`;
    return (val: number) => `${val}`;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Effet pour animer les compteurs
  useEffect(() => {
    if (!isVisible) return;

    // Durée de l'animation en ms
    const animationDuration = 2000;
    const framesPerSecond = 60;
    const totalFrames = animationDuration / 1000 * framesPerSecond;

    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      // Fonction d'easing pour ralentir vers la fin
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      // Mettre à jour les compteurs avec les valeurs intermédiaires
      setCounts(targetValues.map(target => Math.floor(target * easedProgress)));

      if (frame >= totalFrames) {
        clearInterval(counter);
        // S'assurer que les valeurs finales sont exactes
        setCounts([...targetValues]);
      }
    }, 1000 / framesPerSecond);

    return () => clearInterval(counter);
  }, [isVisible]);

  // Fonction pour obtenir l'icône
  const getIcon = (iconName: string) => {
    const iconClass = "w-10 h-10";
    switch (iconName) {
      case 'users': return <Users className={iconClass} />;
      case 'building': return <Building className={iconClass} />;
      case 'check': return <CheckCircle className={iconClass} />;
      case 'trending': return <TrendingUp className={iconClass} />;
      default: return <CheckCircle className={iconClass} />;
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)] relative overflow-hidden">
      {/* Image de fond avec opacité et effet Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/images/home/result-fps.jpg"
          alt="Impact Background"
          className="absolute inset-0 w-full h-[130%] object-cover opacity-40"
          style={{ y, top: "-15%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/80 via-[var(--secondary)]/80 to-[var(--primary)]/80"></div>
      </div>

      {/* Motifs de fond animés */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stats-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="white" />
                <circle cx="0" cy="0" r="1" fill="white" />
                <circle cx="100" cy="100" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stats-pattern)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold tracking-wide uppercase border border-white/30 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-white" />
              Impact & Résultats
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {content.title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-white/90">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {content.values.map((stat, index) => (
            <div
              key={index}
              className={`group relative bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 overflow-hidden border border-white/20 transform transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:shadow-3xl
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Gradient animé au survol */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative flex flex-col items-center text-center">
                {/* Icône avec effet de halo */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-xl transform group-hover:scale-125 transition-transform duration-500"></div>
                  <div className={`relative p-4 rounded-2xl ${stat.color} text-white transform transition-all duration-500 group-hover:rotate-12`}>
                    {getIcon(stat.icon)}
                  </div>
                </div>

                {/* Compteur animé */}
                <p className="text-5xl md:text-6xl font-extrabold text-white mb-3 transition-all drop-shadow-lg">
                  {formatValues[index](counts[index])}
                </p>

                {/* Label */}
                <p className="text-lg text-white/90 font-medium leading-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Élément décoratif en bas */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-white/70 text-sm">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50"></div>
            <span className="uppercase tracking-wide">Données mises à jour régulièrement</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/50"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 