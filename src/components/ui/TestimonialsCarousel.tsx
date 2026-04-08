"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "Grâce au soutien du FPS, notre centre de santé a pu améliorer considérablement la qualité des soins offerts aux patients. Le personnel est désormais mieux formé et équipé.",
    author: "Dr. Jeanne Mulumba",
    role: "Directrice d'un centre de santé à Kinshasa",
    image: "/images/avatar.png"
  },
  {
    id: 2,
    content: "L'initiative de la CSU a transformé la vie de nombreuses familles dans notre communauté. Les soins de santé sont devenus plus accessibles, notamment pour les femmes enceintes et les enfants.",
    author: "Pierre Kabongo",
    role: "Chef de communauté à Lubumbashi",
    image: "/images/avatar.png"
  },
  {
    id: 3,
    content: "Le partenariat avec le FPS a permis de renforcer notre programme de prévention du paludisme et a considérablement réduit l'incidence de la maladie dans les zones ciblées.",
    author: "Marie Tshilombo",
    role: "Coordinatrice de programmes de santé, ONG Internationale",
    image: "/images/avatar.png"
  }
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  
  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };
  
  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, [current]);
  
  return (
    <section className="py-16 bg-fps-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[var(--primary)] sm:text-4xl">
            Témoignages
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Découvrez l'impact du FPS à travers les témoignages de nos partenaires et bénéficiaires
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-10 left-0 text-[var(--accent)]/30">
            <Quote size={80} />
          </div>
          
          <div className="overflow-hidden relative z-10">
            <div className="relative h-64 sm:h-56">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === current 
                      ? "opacity-100 translate-x-0" 
                      : index < current 
                        ? "opacity-0 -translate-x-full" 
                        : "opacity-0 translate-x-full"
                  }`}
                >
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <p className="text-lg text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-gray-200 relative">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white shadow-md text-[var(--danger)] hover:bg-fps-primary-light"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === current ? "bg-[var(--accent)] scale-125" : "bg-gray-300"
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full bg-white shadow-md text-[var(--danger)] hover:bg-fps-primary-light"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 