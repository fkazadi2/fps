"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import useSWR from 'swr';

// Fetcher pour SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Structure de navigation avec sous-menus
const navigation = [
  { name: "Accueil", href: "/", submenu: [] },
  {
    name: "Notre raison d'être",
    href: "/a-propos",
    submenu: [
      { name: "Notre histoire", href: "/a-propos/histoire" },
      { name: "Nos missions", href: "/a-propos/mission" },
      { name: "Organisation", href: "/a-propos/gouvernance" },
      { name: "Cadre juridique", href: "/a-propos/juridique" },
    ],
  },
  {
    name: "Plateau technique",
    href: "/plateau-technique",
    submenu: [
      { name: "Infrastructures sanitaires", href: "/plateau-technique/infrastructures" },
      { name: "Dotation en médicaments", href: "/plateau-technique/medicaments" },
      { name: "Dotation en équipements", href: "/plateau-technique/equipements" },
      { name: "Banque de sang", href: "/plateau-technique/banque-de-sang" },
      { name: "Classification des ESS", href: "/plateau-technique/classification-ess" },
    ],
  },
  {
    name: "Gouvernance Santé",
    href: "/gouvernance-sante",
    submenu: [
      { name: "Capacitation Du personnel de santé", href: "/gouvernance-sante/capacitation" },
      { name: "Qualité des soins", href: "/gouvernance-sante/qualite-soins" },
      { name: "Système des références", href: "/gouvernance-sante/systeme-references" },
      { name: "Recherche médicale", href: "/gouvernance-sante/recherche-medicale" },
    ],
  },
  {
    name: "Médecine traditionnelle",
    href: "/medecine-traditionnelle",
    submenu: [
      { name: "Réglementation", href: "/medecine-traditionnelle/reglementation" },
      { name: "Formation des praticiens", href: "/medecine-traditionnelle/formation-praticiens" },
      { name: "Promotion des initiatives locales en santé", href: "/medecine-traditionnelle/promotion-initiatives" },
    ],
  },
  {
    name: "Publications",
    href: "/publications",
    submenu: [
      { name: "Offre d'emploi", href: "/publications/offre-emploi" },
      { name: "Appel d'offre", href: "/publications/appel-offre" },
      { name: "Rapports & Documentations", href: "/publications/rapports-documentations" },
      { name: "Gouvernance & Statuts", href: "/publications/rapports-documentations?type=gouvernance" },
      { name: "Bulletins d'Information", href: "/publications/rapports-documentations?type=bulletin" },
    ],
  },
  {
    name: "Centre de Presse",
    href: "/centre-presse",
    submenu: [
      { name: "Presse", href: "/centre-presse/presse" },
      { name: "Galerie Photo", href: "/centre-presse/galerie" },
      { name: "Événements", href: "/centre-presse/evenements" },
    ],
  },

];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<number | null>(null);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentPath = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Gestion de l'ouverture des sous-menus pour desktop uniquement
  const handleSubmenuToggle = (index: number) => {
    if (activeSubmenu === index) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(index);
    }
  };

  // Gestion des sous-menus mobiles (complètement séparée)
  const toggleMobileSubmenu = (index: number) => {
    setMobileActiveSubmenu(mobileActiveSubmenu === index ? null : index);
  };

  // Ouvrir le sous-menu au survol
  const handleMouseEnter = (index: number) => {
    // Annuler tout délai de fermeture en cours
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsMenuHovered(true);
    setActiveSubmenu(index);
  };

  // Préparer à fermer le sous-menu, mais avec un délai plus long pour une meilleure UX
  const handleMenuMouseLeave = () => {
    setIsMenuHovered(false);

    // Ajouter un délai avant de fermer pour permettre au curseur d'entrer dans le sous-menu
    closeTimeoutRef.current = setTimeout(() => {
      if (!isMenuHovered) {
        setActiveSubmenu(null);
      }
    }, 500); // Augmentation du délai à 500ms pour une meilleure UX
  };

  // Quand la souris entre dans le sous-menu
  const handleSubmenuMouseEnter = () => {
    // Annuler tout délai de fermeture en cours
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsMenuHovered(true);
  };

  // Récupérer la navigation depuis l'API avec SWR
  const { data: navData } = useSWR('/api/navigation?location=header', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Cache 1 minute
  });

  // Utiliser les données de l'API si disponibles, sinon utiliser la navigation par défaut
  // Utiliser la garde hasMounted pour éviter les erreurs d'hydratation
  const currentNavigation = (hasMounted && navData?.data?.items) ? navData.data.items : navigation;

  // Gérer les clics en dehors du menu pour fermer les sous-menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Vérifier si le clic est dans le menu principal
      if (menuRef.current && !menuRef.current.contains(target)) {
        setActiveSubmenu(null);
      }

    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="fixed w-full z-50 shadow-lg">
      {/* Top Bar défilante (Annonces) */}
      <div className="bg-red-600 text-white py-2 overflow-hidden border-b border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="flex-shrink-0 bg-white text-red-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded mr-4 z-10 animate-pulse">
            Annonce
          </div>
          <div className="relative flex-1 overflow-hidden h-6 flex items-center">
            <Link
              href="/publications/offre-emploi"
              className="animate-marquee hover:underline block cursor-pointer whitespace-nowrap text-sm font-medium"
            >
              🚀 Consulter nos nouvelles offres d'emploi dans la section Publications et Rejoignez l'équipe du Fonds de Promotion de la Santé (FPS) ! &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp; 🚀 Consulter nos avis de recrutement et contribuez à l'accès de tous aux soins de santé !
            </Link>
          </div>
        </div>
      </div>

      {/* Bande supérieure redessinée */}
      <div className="bg-gradient-to-r from-white via-gray-50 to-white border-b-2 border-[var(--accent)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo et nom */}
          <div className="flex items-center group">
            <Link href="/" className="flex items-center">
              <div className="relative mr-4">
                {/* Halo animé derrière le logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] rounded-full blur-xl opacity-30 animate-pulse"></div>

                <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Image
                    src="/images/logo-fps.jpg"
                    alt="Logo FPS"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-red-500 group-hover:text-[var(--primary)] transition-colors">
                  FONDS DE PROMOTION DE LA SANTE
                </h1>
                <p className="text-xs text-gray-600">
                  République Démocratique du Congo
                </p>
              </div>
            </Link>
          </div>

          {/* Contacts avec design moderne */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Email */}
            <div className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <a href="mailto:secretariat@fps.cd" className="text-sm font-medium text-gray-900 hover:text-[var(--primary)] transition-colors">
                  secretariat@fps.cd
                </a>
              </div>
            </div>

            {/* Téléphone - Bouton jaune */}
            <div className="flex items-center space-x-2 group">
              <a
                href="tel:+243819115812"
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-medium rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Appeler</span>
              </a>
            </div>

            {/* Bouton Contacts - Lien direct vers /contact */}
            <Link
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Contacts</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation principale avec gradients */}
      <nav className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)]" ref={menuRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Navigation desktop */}
            <div className="hidden lg:flex space-x-1 flex-1">
              {currentNavigation.map((item: any, index: number) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.submenu.length > 0 && handleMouseEnter(index)}
                  onMouseLeave={handleMenuMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-white font-medium hover:bg-red-600 hover:shadow-lg transition-all duration-300 flex items-center space-x-1 ${currentPath === item.href ? 'bg-red-700/60 shadow-inner' : ''
                      }`}
                  >
                    <span className="transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1 inline-block origin-left">{item.name}</span>
                    {item.submenu.length > 0 && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeSubmenu === index ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Mega Menu moderne avec placeholders d'images */}
                  {item.submenu.length > 0 && activeSubmenu === index && (
                    <div
                      className="absolute left-0 top-full mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slideDown z-50"
                      onMouseEnter={handleSubmenuMouseEnter}
                      onMouseLeave={handleMenuMouseLeave}
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[var(--accent)]">
                          {item.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {item.submenu.map((subItem: any, subIndex: number) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="group/item flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                              onClick={() => setActiveSubmenu(null)}
                            >
                              {/* Placeholder d'image avec gradient et icône */}
                              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--danger)] relative group-hover/item:scale-110 transition-transform duration-300">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <svg className="w-10 h-10 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                {/* Numéro du sous-item */}
                                <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-[var(--primary)]">
                                  {subIndex + 1}
                                </div>
                              </div>

                              {/* Contenu */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 mb-1 group-hover/item:text-[var(--primary)] transition-colors">
                                  {subItem.name}
                                </h4>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                  Découvrir nos actions en {subItem.name.toLowerCase()}
                                </p>
                                <span className="inline-flex items-center text-xs font-medium text-[var(--primary)] group-hover/item:underline">
                                  Découvrir
                                  <svg className="w-3 h-3 ml-1 group-hover/item:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bouton menu mobile */}
            <button
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile moderne */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
        {/* Overlay avec clic pour fermer (déplacé ici pour être DERRIÈRE le panel) */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Panel coulissant */}
        <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* En-tête du menu mobile */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                <Image
                  src="/images/logo-fps.jpg"
                  alt="Logo FPS"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-white font-bold">FPS</h2>
                <p className="text-white/80 text-xs">Menu de navigation</p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation mobile */}
          <nav className="p-6 space-y-2">
            {currentNavigation.map((item: any, index: number) => (
              <div key={item.name} className="border-b border-gray-100 pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${currentPath === item.href
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                      }`}
                    onClick={() => {
                      if (item.submenu.length === 0) {
                        setMobileMenuOpen(false);
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                  {item.submenu.length > 0 && (
                    <button
                      onClick={() => toggleMobileSubmenu(index)}
                      className={`p-3 rounded-lg transition-all ${mobileActiveSubmenu === index ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100'}`}
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${mobileActiveSubmenu === index ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                  )}
                </div>

                {/* Sous-menu mobile avec animation */}
                {item.submenu.length > 0 && mobileActiveSubmenu === index && (
                  <div className="mt-2 ml-4 space-y-1 animate-scale-up">
                    {item.submenu.map((subItem: any) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`block px-4 py-3 rounded-lg text-sm transition-all duration-300 ${currentPath === subItem.href
                          ? 'bg-red-500 text-white font-medium shadow-md'
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-700'
                          }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer du menu mobile */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Nous contacter</p>
            <div className="space-y-3">
              <a href="mailto:secretariat@fps.cd" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-[var(--primary)] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>secretariat@fps.cd</span>
              </a>
              <div className="space-y-2">
                <a href="tel:+243819115812" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-[var(--primary)] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>+243 819 115 812</span>
                </a>
                <a href="tel:+243981210031" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-[var(--primary)] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>+243 981 210 031</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
