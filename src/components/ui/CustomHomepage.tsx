"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Heart, 
  Shield, 
  Users, 
  Building, 
  Briefcase, 
  Calendar,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Star
} from 'lucide-react';
import HeroSlider from './HeroSlider';

// Interfaces
interface HomepageSection {
  id: string;
  type: 'hero' | 'about' | 'services' | 'news' | 'contact' | 'testimonials' | 'stats' | 'team' | 'cta';
  title: string;
  isVisible: boolean;
  config: Record<string, unknown>;
  order: number;
}

interface HomepageConfig {
  sections: HomepageSection[];
  settings: {
    title: string;
    description: string;
    socialLinks: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    };
  };
}

interface CustomHomepageProps {
  config: HomepageConfig;
}

// Composants des sections
const HeroSection = () => (
  <HeroSlider />
);

const AboutSection = ({ config }: { config: Record<string, unknown> }) => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {String(config.title || 'Notre Mission')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div 
              className="prose max-w-none text-gray-600 mb-8"
              dangerouslySetInnerHTML={{ __html: String(config.content || '') }}
            />
            
            {Array.isArray(config.features) && (
              <ul className="space-y-3">
                {config.features.map((feature: unknown, index: number) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {String(feature)}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {Boolean(config.image) && (
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={String(config.image)}
                alt="À propos"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = ({ config }: { config: Record<string, unknown> }) => {
  const getServiceIcon = (iconName: string) => {
    const icons = {
      heart: Heart,
      shield: Shield,
      users: Users,
      building: Building,
      briefcase: Briefcase
    };
    const Icon = icons[iconName as keyof typeof icons] || Heart;
    return <Icon className="h-8 w-8" />;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {String(config.title || 'Nos Services')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(config.services) && config.services.map((service: unknown, index: number) => {
              const serviceObj = service as Record<string, unknown>;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-blue-600 mb-4">
                    {getServiceIcon(String(serviceObj.icon || 'heart'))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {String(serviceObj.title)}
                  </h3>
                  <p className="text-gray-600">
                    {String(serviceObj.description)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = ({ config }: { config: Record<string, unknown> }) => {
  const getStatIcon = (iconName: string) => {
    const icons = {
      users: Users,
      building: Building,
      briefcase: Briefcase,
      calendar: Calendar
    };
    const Icon = icons[iconName as keyof typeof icons] || Users;
    return <Icon className="h-8 w-8" />;
  };

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              {String(config.title || 'Nos Statistiques')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(config.stats) && config.stats.map((stat: unknown, index: number) => {
              const statObj = stat as Record<string, unknown>;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                    {getStatIcon(String(statObj.icon || 'users'))}
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {String(statObj.value)}
                  </div>
                  <div className="text-blue-100">
                    {String(statObj.label)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsSection = ({ config }: { config: Record<string, unknown> }) => {
  const [articles, setArticles] = useState<unknown[]>([]);

  useEffect(() => {
    // Charger les articles depuis localStorage (pages avec status published)
    const storedPages = localStorage.getItem('fps_cms_pages');
    if (storedPages) {
      const pages = JSON.parse(storedPages);
      const publishedPages = pages
        .filter((page: Record<string, unknown>) => page.status === 'published')
        .sort((a: Record<string, unknown>, b: Record<string, unknown>) => 
          new Date(String(b.createdAt)).getTime() - new Date(String(a.createdAt)).getTime()
        )
        .slice(0, Number(config.showCount) || 3);
      setArticles(publishedPages);
    }
  }, [config.showCount]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {String(config.title || 'Actualités')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => {
              const articleObj = article as Record<string, unknown>;
              return (
                <Link key={index} href={`/${String(articleObj.slug)}`} className="group">
                  <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {String(articleObj.title)}
                      </h3>
                      
                      {Boolean(config.showDate) && (
                        <p className="text-sm text-gray-500 mb-3">
                          {new Date(String(articleObj.createdAt)).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                      
                      {Boolean(config.showExcerpt) && (
                        <p className="text-gray-600">
                          {String(articleObj.content).replace(/<[^>]*>/g, '').substring(0, 150)}...
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/actualites"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              Voir toutes les actualités
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ config }: { config: Record<string, unknown> }) => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {String(config.title || 'Contactez-nous')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Téléphone</h3>
            <p className="text-gray-600">{String(config.phone || '+225 XX XX XX XX')}</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">{String(config.email || 'contact@fps.ci')}</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Adresse</h3>
            <p className="text-gray-600">{String(config.address || 'Abidjan, Côte d\'Ivoire')}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = ({ config }: { config: Record<string, unknown> }) => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {String(config.title || 'Témoignages')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(config.testimonials) && config.testimonials.map((testimonial: unknown, index: number) => {
            const testimonialObj = testimonial as Record<string, unknown>;
            return (
              <div key={index} className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">
                  &quot;{String(testimonialObj.content)}&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{String(testimonialObj.author)}</div>
                    <div className="text-sm text-gray-500">{String(testimonialObj.role)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

const CTASection = ({ config }: { config: Record<string, unknown> }) => (
  <section className="py-20 bg-blue-600 text-white">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          {String(config.title || 'Rejoignez-nous')}
        </h2>
        <p className="text-xl mb-8 opacity-90">
          {String(config.description || 'Ensemble, améliorons l\'accès aux soins de santé')}
        </p>
        {Boolean(config.buttonText) && (
          <Link
            href={String(config.buttonLink || '#')}
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            {String(config.buttonText)}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  </section>
);

export default function CustomHomepage({ config }: CustomHomepageProps) {
  const renderSection = (section: HomepageSection) => {
    if (!section.isVisible) return null;

    switch (section.type) {
      case 'hero':
        return <HeroSection key={section.id} />;
      case 'about':
        return <AboutSection key={section.id} config={section.config} />;
      case 'services':
        return <ServicesSection key={section.id} config={section.config} />;
      case 'stats':
        return <StatsSection key={section.id} config={section.config} />;
      case 'news':
        return <NewsSection key={section.id} config={section.config} />;
      case 'contact':
        return <ContactSection key={section.id} config={section.config} />;
      case 'testimonials':
        return <TestimonialsSection key={section.id} config={section.config} />;
      case 'cta':
        return <CTASection key={section.id} config={section.config} />;
      default:
        return null;
    }
  };

  // Trier les sections par ordre
  const sortedSections = [...config.sections].sort((a, b) => a.order - b.order);

  return (
    <MainLayout>
      {sortedSections.map(renderSection)}
    </MainLayout>
  );
} 