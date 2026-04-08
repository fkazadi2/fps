"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Handshake } from "lucide-react";

const partners = [
  { id: 1, name: "OMS", logo: "/images/logos/oms.png", url: "https://www.who.int" },
  { id: 2, name: "UNICEF", logo: "/images/logos/unicef.png", url: "https://www.unicef.org" },
  { id: 3, name: "Banque Mondiale", logo: "/images/logos/worldbank.png", url: "https://www.worldbank.org" },
  { id: 4, name: "UNESCO", logo: "/images/logos/unesco.png", url: "https://www.unesco.org" },
  { id: 5, name: "UNFPA", logo: "/images/logos/unfpa.png", url: "https://www.unfpa.org" },
  { id: 6, name: "USAID", logo: "/images/logos/usaid.png", url: "https://www.usaid.gov" },
  { id: 7, name: "GAVI", logo: "/images/logos/gavi.png", url: "https://www.gavi.org" },
  { id: 8, name: "Fonds mondial", logo: "/images/logos/fonds-mondial.png", url: "https://www.theglobalfund.org" }
];

export default function PartnersSection() {
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
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Fond décoratif avec formes géométriques */}
      <div className="absolute top-0 right-0 opacity-5">
        <div className="w-96 h-96 rounded-full bg-[var(--accent)] blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 opacity-5">
        <div className="w-96 h-96 rounded-full bg-[var(--danger)] blur-3xl"></div>
      </div>
      
      {/* Grille de points décorative */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="partner-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="currentColor" className="text-[var(--primary)]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#partner-dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-[var(--accent)] bg-opacity-10 text-white rounded-full text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
              <Handshake className="w-4 h-4 text-white" />
              Collaboration
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] mb-4">
            Nos partenaires
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            Ensemble pour promouvoir la santé et le bien-être en République Démocratique du Congo
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8">
          {partners.map((partner, index) => (
            <Link 
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-8 flex flex-col items-center justify-center
                hover:shadow-2xl hover:border-[var(--accent)] transition-all duration-500
                transform ${isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
                hover:-translate-y-2
              `}
              style={{ transitionDelay: `${index * 100}ms`, transitionDuration: '500ms' }}
            >
              {/* Effet de brillance au survol */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              {/* Logo */}
              <div className="h-24 w-full relative mb-4 transform group-hover:scale-110 transition-transform duration-500">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100px, 150px"
                />
              </div>
              
              {/* Nom */}
              <span className="font-semibold text-gray-700 group-hover:text-[var(--primary)] transition-colors text-center">
                {partner.name}
              </span>

              {/* Ligne décorative */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
              
              {/* Icône de lien externe */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-1.5 bg-[var(--accent)] rounded-full">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Section informative */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4">
                Rejoignez notre réseau de partenaires
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Le FPS collabore avec des organisations locales et internationales pour maximiser son impact sur la santé publique en RDC. Ensemble, nous construisons un système de santé plus fort et plus équitable.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">8+ Partenaires internationaux</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Collaboration stratégique</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link 
                href="/financement/partenaires"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-white rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Voir tous nos partenaires
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 