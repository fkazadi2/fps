"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight, ExternalLink, Newspaper, Pause, Play } from "lucide-react";

// Type pour les articles
type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt?: string;
  createdAt: string;
  formattedDate?: string; // Optionnel, pré-formaté côté backend
};

type NewsHighlightsProps = {
  articles?: Article[];
  title?: string;
  subtitle?: string;
  linkText?: string;
  linkUrl?: string;
};

export default function NewsHighlights({
  articles = [],
  title = "Actualités récentes",
  subtitle = "Restez informé des dernières nouvelles et initiatives du FPS",
  linkText = "Toutes les actualités",
  linkUrl = "/actualites"
}: NewsHighlightsProps) {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    if (articles.length > 0) {
      const timer = setTimeout(() => {
        setVisibleItems(articles.map(item => item._id));
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [articles]);

  const isVisible = (id: string) => visibleItems.includes(id);

  // Défilement des cartes : automatique, en pause au survol, au clavier ou avec le bouton
  const piste = useRef<HTMLDivElement>(null);
  const [peutDefiler, setPeutDefiler] = useState(false);
  const [arrete, setArrete] = useState(false);
  const [survole, setSurvole] = useState(false);

  const defiler = useCallback((sens: 1 | -1) => {
    const el = piste.current;
    const carte = el?.firstElementChild as HTMLElement | null;
    if (!el || !carte) return;
    const fin = el.scrollWidth - el.clientWidth;
    if (sens === 1 && el.scrollLeft >= fin - 4) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (sens === -1 && el.scrollLeft <= 4) el.scrollTo({ left: fin, behavior: "smooth" });
    else el.scrollBy({ left: sens * (carte.offsetWidth + 32), behavior: "smooth" });
  }, []);

  useEffect(() => {
    const mesurer = () => {
      const el = piste.current;
      setPeutDefiler(!!el && el.scrollWidth > el.clientWidth + 4);
    };
    mesurer();
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, [articles]);

  useEffect(() => {
    // Respecte le réglage « réduire les animations » du visiteur
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setArrete(true);
  }, []);

  useEffect(() => {
    if (!peutDefiler || arrete || survole) return;
    const minuterie = setInterval(() => defiler(1), 5000);
    return () => clearInterval(minuterie);
  }, [peutDefiler, arrete, survole, defiler]);

  // Utiliser la date pré-formatée par le backend (optimisation Phase 4)
  const getFormattedDate = (article: Article) => {
    return article.formattedDate || article.publishedAt || article.createdAt;
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--primary)] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-[var(--danger)] bg-opacity-10 text-white rounded-full text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-white" />
                Centre de Presse
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] mb-4">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600">
              {subtitle}
            </p>
          </div>
          <Link
            href={linkUrl}
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--danger)] to-[var(--primary)] text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
          >
            {linkText} <ExternalLink className="w-5 h-5" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-lg">Aucune actualité disponible pour le moment.</p>
          </div>
        ) : (
          <div
            onMouseEnter={() => setSurvole(true)}
            onMouseLeave={() => setSurvole(false)}
            onFocus={() => setSurvole(true)}
            onBlur={() => setSurvole(false)}
          >
          {/* Les marges négatives laissent la place aux ombres et au soulèvement des cartes */}
          <div
            ref={piste}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 scroll-px-4 -my-6 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Actualités, défilement horizontal"
          >
            {articles.map((article, index) => (
              <article
                key={article._id}
                className={`
                  shrink-0 snap-start basis-full md:basis-[calc((100%-2rem)/2)] lg:basis-[calc((100%-4rem)/3)]
                  group bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 ease-out hover:shadow-2xl hover:-translate-y-2
                  ${isVisible(article._id)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                  }
                `}
                style={{ transitionDelay: `${Math.min(index, 2) * 150}ms` }}
              >
                {/* Image avec overlay dégradé */}
                <div className="h-56 relative overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay dégradé */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Badge catégorie */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-4 py-2 bg-[var(--danger)] text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>

                  {/* Date en bas */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white z-10">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">{getFormattedDate(article)}</span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Ligne de séparation */}
                  <div className="w-16 h-1 bg-gradient-to-r from-[var(--danger)] to-[var(--primary)] mb-6 transform group-hover:w-full transition-all duration-500"></div>

                  <Link
                    href={`/actualites/${article.slug}`}
                    className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold group-hover:gap-3 transition-all"
                  >
                    Lire la suite
                    <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {peutDefiler && (
            <div className="mt-10 flex justify-center gap-4">
              {[
                { nom: "Actualité précédente", action: () => defiler(-1), Icone: ChevronLeft },
                { nom: arrete ? "Reprendre le défilement" : "Mettre en pause", action: () => setArrete(v => !v), Icone: arrete ? Play : Pause },
                { nom: "Actualité suivante", action: () => defiler(1), Icone: ChevronRight },
              ].map(({ nom, action, Icone }, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={action}
                  aria-label={nom}
                  title={nom}
                  className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 text-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors cursor-pointer"
                >
                  <Icone className="w-5 h-5" />
                </button>
              ))}
            </div>
          )}
          </div>
        )}

        <div className="mt-10 text-center md:hidden">
          <Link
            href={linkUrl}
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)]"
          >
            {linkText} <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
} 