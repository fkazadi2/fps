import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { PageComponent } from '@/components/admin/PageComponentSelector';

interface PageRendererProps {
  components: PageComponent[];
}

const PageRenderer: React.FC<PageRendererProps> = ({ components }) => {
  if (!components || components.length === 0) {
    return null;
  }

  return (
    <div className="space-y-16">
      {components.map((component) => (
        <div key={component.id} className="component-wrapper">
          {renderComponent(component)}
        </div>
      ))}
    </div>
  );
};

// Fonction qui rend le composant en fonction de son type
const renderComponent = (component: PageComponent) => {
  switch (component.type) {
    case 'text':
      return <TextComponent data={component.data} />;
    case 'gallery':
      return <GalleryComponent data={component.data} />;
    case 'cta':
      return <CTAComponent data={component.data} />;
    case 'stats':
      return <StatsComponent data={component.data} />;
    case 'testimonials':
      return <TestimonialsComponent data={component.data} />;
    default:
      return <div>Type de composant non pris en charge</div>;
  }
};

// Composant de texte
const TextComponent = ({ data }: { data: any }) => {
  const columnClass = {
    1: 'max-w-3xl mx-auto',
    2: 'grid md:grid-cols-2 gap-8 max-w-6xl mx-auto',
    3: 'grid md:grid-cols-3 gap-8 max-w-7xl mx-auto'
  }[(data.columns || 1) as 1 | 2 | 3];

  return (
    <div className="text-section py-4">
      {data.title && (
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-6 text-center">
          {data.title}
        </h2>
      )}
      <div className={columnClass}>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </div>
  );
};

// Composant de galerie
const GalleryComponent = ({ data }: { data: any }) => {
  return (
    <div className="gallery-section">
      {data.title && (
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-6 text-center">
          {data.title}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.images && data.images.map((image: any, index: number) => (
          <div key={index} className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src={image.url || '/placeholder.jpg'}
              alt={image.caption || `Image ${index + 1}`}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant d'appel à l'action
const CTAComponent = ({ data }: { data: any }) => {
  return (
    <div className="cta-section bg-gray-50 rounded-xl p-8 md:p-12 text-center">
      {data.title && (
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4">
          {data.title}
        </h2>
      )}
      {data.text && (
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {data.text}
        </p>
      )}
      {data.buttonText && data.buttonUrl && (
        <Link 
          href={data.buttonUrl}
          className="inline-flex items-center px-6 py-3 bg-[var(--danger)] text-white font-medium rounded-md hover:bg-[var(--danger-dark)] transition-colors"
        >
          {data.buttonText}
          <ChevronRight className="ml-2 w-4 h-4" />
        </Link>
      )}
    </div>
  );
};

// Composant de statistiques
const StatsComponent = ({ data }: { data: any }) => {
  return (
    <div className="stats-section">
      {data.title && (
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-8 text-center">
          {data.title}
        </h2>
      )}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {data.stats && data.stats.map((stat: any, index: number) => (
          <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-[var(--danger)] mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant de témoignages
const TestimonialsComponent = ({ data }: { data: any }) => {
  return (
    <div className="testimonials-section">
      {data.title && (
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-8 text-center">
          {data.title}
        </h2>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data.testimonials && data.testimonials.map((testimonial: any, index: number) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="quote text-gray-600 italic mb-4">
              "{testimonial.content}"
            </div>
            <div className="font-semibold">{testimonial.name}</div>
            <div className="text-gray-500 text-sm">{testimonial.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageRenderer; 