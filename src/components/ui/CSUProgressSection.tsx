"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function CSUProgressSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
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
  
  const goals = [
    { id: 1, name: "Couverture sanitaire", target: 100, current: 68, color: "bg-[var(--danger)]" },
    { id: 2, name: "Accès aux soins prénataux", target: 100, current: 75, color: "bg-[var(--accent)]" },
    { id: 3, name: "Vaccination infantile", target: 100, current: 82, color: "bg-red-600" },
    { id: 4, name: "Réduction des maladies évitables", target: 100, current: 58, color: "bg-[var(--accent)]" }
  ];
  
  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-[var(--primary)] via-red-700 to-[var(--secondary)] text-white relative overflow-hidden">
      {/* Motifs de fond animés */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[var(--accent)] blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-[var(--danger)] blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-4 border-white/10 rounded-full"></div>
      </div>

      {/* Réseau de points */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="csu-dots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#csu-dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold tracking-wide uppercase border border-white/30 flex items-center gap-2">
              <Shield className="w-4 h-4 text-white" />
              Couverture Santé Universelle
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Objectifs de la CSU
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-white/90 leading-relaxed">
            Notre progression vers les objectifs de la Couverture Santé Universelle en République Démocratique du Congo
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 relative z-10">
          {goals.map((goal, index) => (
            <div 
              key={goal.id} 
              className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {/* Icône décorative */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{goal.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${goal.color.replace('bg-', 'bg-')} animate-pulse`}></div>
                    <span className="text-sm text-white/70">En progression</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-extrabold drop-shadow-lg">
                    {isVisible ? (
                      <span className="counter bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                        {goal.current}%
                      </span>
                    ) : "0%"}
                  </div>
                  <div className="text-sm text-white/70 mt-1">Atteint</div>
                </div>
              </div>
              
              {/* Barre de progression moderne */}
              <div className="relative mb-6">
                <div className="h-4 w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                    className={`h-full ${goal.color} rounded-full transition-all duration-2000 ease-out relative overflow-hidden`}
                    style={{ width: isVisible ? `${goal.current}%` : "0%" }}
                  >
                    {/* Effet de brillance animé */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                {/* Marqueur d'objectif */}
                <div className="absolute -top-2 right-0 flex flex-col items-center">
                  <div className="w-8 h-8 bg-white rounded-full border-4 border-white/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs text-white/70 mt-1">100%</span>
                </div>
              </div>
              
              {/* Informations supplémentaires */}
              <div className="flex items-center justify-between text-sm pt-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-white/80">Progression constante</span>
                </div>
                <span className="text-white/80 font-medium">{goal.target - goal.current}% restant</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-white/90 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
            Le FPS travaille activement pour atteindre ces objectifs à travers des programmes ciblés 
            et des partenariats stratégiques dans toutes les provinces de la RDC.
          </p>
          <Link
            href="/programmes"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--primary)] rounded-xl font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-2xl"
          >
            Découvrir nos programmes
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Animation CSS pour l'effet shimmer */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
} 