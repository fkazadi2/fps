"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// Définition du type Slide pour la prop
interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

interface HeroSliderProps {
  customSlides?: Slide[];
  autoplay?: boolean;
  duration?: number;
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    title: "Accès aux soins pour les vulnérables",
    description: "L'accès aux prestations de santé pour les indigents et les vulnérables sur toute l'étendue de la RDC.",
    image: "/images/slides/new-slides/acces-aux-soins-pour-les-vulnerables.jpg",
    buttonText: "Découvrir le FPS",
    buttonLink: "/a-propos",
  },
  {
    id: 2,
    title: "Mise en œuvre de la CSU",
    description: "Nous envisageons la mise en œuvre du système de la CSU comme un processus en tenant compte de la diversité des contextes géographiques, socio-culturels et économiques.",
    image: "/images/slides/new-slides/mise-en-œuvre-de-la-CSU.jpg",
    buttonText: "En savoir plus",
    buttonLink: "/programmes",
    secondaryButtonText: "Contactez-nous",
    secondaryButtonLink: "/contact",
  },
  {
    id: 3,
    title: "Équité dans l'accès aux soins",
    description: "L'accès aux soins des populations, des familles et des individus en assurant l'équité, en enlevant les barrières de toutes sortes.",
    image: "/images/slides/new-slides/equite-dans-l-acces-aux-soins.jpg",
    buttonText: "Voir les programmes",
    buttonLink: "/programmes",
    secondaryButtonText: "Partenaires",
    secondaryButtonLink: "/financement#partenaires",
  },
  {
    id: 4,
    title: "Participation communautaire",
    description: "La participation communautaire suppose que la communauté s'organise pour créer une dynamique en faveur du processus de la CSU.",
    image: "/images/slides/new-slides/participation-communautaire.jpg",
    buttonText: "Nos initiatives",
    buttonLink: "/programmes#capacites",
    secondaryButtonText: "Contactez-nous",
    secondaryButtonLink: "/contact",
  },
];

export default function HeroSlider({ customSlides, autoplay = true, duration = 7000 }: HeroSliderProps) {
  const slides = Array.isArray(customSlides) && customSlides.length > 0 ? customSlides : defaultSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs pour une gestion stable des timers
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayRef = useRef(autoplay);
  const durationRef = useRef(duration);
  const slidesRef = useRef(slides);
  const isAnimatingRef = useRef(false);

  // Durée de la transition CSS (doit correspondre à la durée dans le CSS)
  const TRANSITION_DURATION = 1000; // Augmenté pour des transitions plus fluides

  // Mise à jour des refs quand les props changent
  useEffect(() => {
    autoplayRef.current = autoplay;
    durationRef.current = duration;
  }, [autoplay, duration]);

  useEffect(() => {
    slidesRef.current = slides;
  }, [slides]);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  // Nettoie tous les timers de manière sûre
  const clearAllTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Fonction pour passer au slide suivant
  const goToNextSlide = useCallback(() => {
    if (isAnimatingRef.current) return;

    setIsAnimating(true);
    setActiveIndex(currentIndex => {
      const nextIndex = (currentIndex + 1) % slidesRef.current.length;
      return nextIndex;
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  }, []);

  // Fonction pour passer au slide précédent
  const goToPrevSlide = useCallback(() => {
    if (isAnimatingRef.current) return;

    setIsAnimating(true);
    setActiveIndex(currentIndex => {
      const prevIndex = currentIndex === 0 ? slidesRef.current.length - 1 : currentIndex - 1;
      return prevIndex;
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  }, []);

  // Fonction pour aller à un slide spécifique
  const goToSlide = useCallback((index: number) => {
    if (isAnimatingRef.current || index < 0 || index >= slidesRef.current.length) return;

    setActiveIndex(currentIndex => {
      if (index === currentIndex) return currentIndex;
      return index;
    });

    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  }, []);

  // Démarre l'autoplay de manière stable
  const startAutoplay = useCallback(() => {
    clearAllTimers();

    if (!autoplayRef.current || slides.length <= 1) return;

    intervalRef.current = setInterval(() => {
      // Utiliser goToNextSlide qui gère déjà l'animation
      goToNextSlide();
    }, durationRef.current);
  }, [goToNextSlide]);

  // Initialisation du composant
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(loadTimer);
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Démarrer l'autoplay après le chargement
  useEffect(() => {
    if (isLoaded) {
      startAutoplay();
    }
    return () => clearAllTimers();
  }, [isLoaded, startAutoplay, clearAllTimers]);


  // Gestion des changements de props autoplay/duration
  useEffect(() => {
    if (isLoaded) {
      startAutoplay();
    }
  }, [autoplay, duration, isLoaded, startAutoplay]);

  // Gestion des changements de slides
  useEffect(() => {
    if (isLoaded && activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [slides.length, activeIndex, isLoaded]);

  // Afficher un placeholder pendant le chargement initial
  if (!isLoaded) {
    return (
      <div className="relative h-[850px] overflow-hidden bg-[var(--primary)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,91,176,0.7)] to-[rgba(0,91,176,0.3)]">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[900px] overflow-hidden">
      <div className="slider-container h-full w-full relative">
        {/* CSS global pour les animations */}
        <style jsx global>{`
          @keyframes zoomInOut {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
          
          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          .slider-track {
            display: flex;
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
          }
          
          .slide {
            flex: 0 0 100%;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1),
                        transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            z-index: 1;
          }
          
          .slide.active {
            opacity: 1;
            transform: translateY(0);
            z-index: 10;
            pointer-events: auto;
          }
          
          .slide-image-container {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          
          .slide-image-wrapper {
            width: 100%;
            height: 100%;
            animation: zoomInOut 20s ease-in-out infinite;
            will-change: transform;
          }
          
          .slide:not(.active) .slide-image-wrapper {
            animation: none;
          }
          
          /* Animations du contenu textuel */
          .slide-content {
            opacity: 0;
            transition: opacity 0.6s ease-out 0.3s;
          }
          
          .slide.active .slide-content {
            opacity: 1;
            animation: fadeInUp 0.8s ease-out 0.4s both;
          }
          
          .slide-badge {
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.6s ease-out 0.5s, transform 0.6s ease-out 0.5s;
          }
          
          .slide.active .slide-badge {
            opacity: 1;
            transform: translateY(0);
            animation: fadeInUp 0.6s ease-out 0.5s both;
          }
          
          .slide-slogan {
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.6s ease-out 0.7s, transform 0.6s ease-out 0.7s;
          }
          
          .slide.active .slide-slogan {
            opacity: 1;
            transform: translateY(0);
            animation: fadeInUp 0.6s ease-out 0.7s both;
          }
          
          .slide-title {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out 0.9s, transform 0.8s ease-out 0.9s;
          }
          
          .slide.active .slide-title {
            opacity: 1;
            transform: translateY(0);
            animation: fadeInUp 0.8s ease-out 0.9s both;
          }
          
          .slide-description {
            opacity: 0;
            transform: translateY(15px);
            transition: opacity 0.8s ease-out 1.1s, transform 0.8s ease-out 1.1s;
          }
          
          .slide.active .slide-description {
            opacity: 1;
            transform: translateY(0);
            animation: fadeInUp 0.8s ease-out 1.1s both;
          }
          
          .slide-buttons {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out 1.3s, transform 0.8s ease-out 1.3s;
          }
          
          .slide.active .slide-buttons {
            opacity: 1;
            transform: translateY(0);
            animation: fadeInUp 0.8s ease-out 1.3s both;
          }
        `}</style>

        <div className="slider-track">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={slide.id}
                className={`slide ${isActive ? 'active' : ''}`}
              >
                {/* Image d'arrière-plan avec animation de zoom */}
                <div className="absolute inset-0 z-0 slide-image-container">
                  <div className={`absolute inset-0 slide-image-wrapper ${isActive ? 'active' : ''}`}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Overlay avec gradient moderne et pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,91,176,0.85)] via-[rgba(41,51,92,0.7)] to-[rgba(225,0,0,0.6)] z-1">
                  <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-10"></div>
                  {/* Formes géométriques décoratives */}
                  <div className="absolute top-20 right-20 w-64 h-64 border-2 border-white/20 rounded-full blur-sm"></div>
                  <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-white/20 rotate-45 blur-sm"></div>
                </div>

                {/* Contenu du slide avec design moderne */}
                <div className="absolute inset-0 flex items-center z-2 slide-content">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8 pt-10 md:pt-16 pb-20">
                      <div className="lg:col-span-8 text-center lg:text-left">
                        {/* Badge animé */}
                        <div className="inline-block mb-6 slide-badge">
                          <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold tracking-wide uppercase border border-white/30">
                            Fonds de Promotion de la Santé
                          </span>
                        </div>

                        {/* Slogan institutionnel */}
                        <div className="mb-4 slide-slogan">
                          <p className="text-lg md:text-lg text-yellow-500 font-regular drop-shadow-md">
                            « Une RDC où la santé est financée de manière durable et équitable pour tous »
                          </p>
                        </div>

                        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl xl:text-6xl mt-4 leading-tight drop-shadow-lg slide-title">
                          {slide.title}
                        </h1>

                        {/* Ligne décorative */}
                        <div className="w-24 h-1 bg-gradient-to-r from-[var(--accent)] to-transparent my-6 mx-auto lg:mx-0 slide-title"></div>

                        <p className="mt-6 text-xl md:text-2xl text-white text-opacity-95 max-w-3xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md slide-description">
                          {slide.description}
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start slide-buttons">
                          <Link
                            href={slide.buttonLink}
                            className="group px-8 py-4 rounded-xl text-white bg-[var(--danger)] hover:bg-opacity-90 font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                          >
                            {slide.buttonText}
                            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                          {slide.secondaryButtonText && slide.secondaryButtonLink && (
                            <Link
                              href={slide.secondaryButtonLink}
                              className="group px-8 py-4 rounded-xl text-white bg-white/10 backdrop-blur-md border-2 border-white/50 hover:bg-white hover:text-[var(--primary)] font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                            >
                              {slide.secondaryButtonText}
                              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Illustration décorative sur grand écran */}
                      <div className="hidden lg:flex lg:col-span-4 items-center justify-center relative">
                        <div className="relative w-full h-96">
                          {/* Cercle principal avec effet de pulsation */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-full border-4 border-white/30 flex items-center justify-center animate-pulse">
                              <div className="w-48 h-48 bg-white/20 rounded-full border-2 border-white/40 flex items-center justify-center">
                                <svg className="w-24 h-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation et contrôles du slider - positionnement fixe en bas de la section */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="flex items-center justify-center gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === activeIndex
                ? "bg-white scale-125"
                : "bg-white bg-opacity-50 hover:bg-opacity-70"
                }`}
              aria-label={`Aller au slide ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>

      {/* Flèches de navigation */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white bg-opacity-40 hover:bg-opacity-70 text-fps-primary z-30 transition-all hover:scale-105 shadow-md"
        aria-label="Slide précédent"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white bg-opacity-40 hover:bg-opacity-70 text-fps-primary z-30 transition-all hover:scale-105 shadow-md"
        aria-label="Slide suivant"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
} 