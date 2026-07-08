import Image from "next/image";
import { LucideIcon } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  variant?: 'green' | 'blue' | 'red' | 'purple' | 'orange' | 'indigo' | 'teal' | 'emerald' | 'slate' | 'amber' | 'rose' | 'violet' | 'red-dark';
  breadcrumbs: { name: string; href: string }[];
  backgroundImage?: string;
}

export default function PageHeader({
  title,
  description,
  icon: Icon,
  variant = 'blue',
  breadcrumbs,
  backgroundImage
}: PageHeaderProps) {
  const gradients = {
    green: 'from-green-800 to-green-600',
    blue: 'from-blue-800 to-blue-600',
    red: 'from-red-800 to-red-600',
    purple: 'from-purple-800 to-purple-600',
    orange: 'from-orange-800 to-orange-600',
    indigo: 'from-indigo-800 to-indigo-600',
    teal: 'from-teal-800 to-teal-600',
    emerald: 'from-emerald-800 to-emerald-600',
    slate: 'from-slate-800 to-slate-600',
    amber: 'from-amber-700 to-amber-500',
    rose: 'from-rose-800 to-rose-600',
    violet: 'from-violet-800 to-violet-600',
    'red-dark': 'from-red-950 to-red-800'
  };

  const iconBg = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    teal: 'bg-teal-100 text-teal-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    slate: 'bg-slate-100 text-slate-600',
    amber: 'bg-amber-100 text-amber-600',
    rose: 'bg-rose-100 text-rose-600',
    violet: 'bg-violet-100 text-violet-600',
    'red-dark': 'bg-red-100 text-red-600'
  };

  return (
    <div className={`bg-gradient-to-r ${gradients[variant]} text-white py-10 shadow-inner relative overflow-hidden`}>
      {/* Background Image with 30% opacity */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={backgroundImage} 
            alt="" 
            fill 
            className="object-cover opacity-30" 
            priority
          />
        </div>
      )}

      {/* Decorative circles as seen in screenshot */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-20 -mb-20 blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Breadcrumbs items={breadcrumbs} variant="white" />
        
        <div className="text-center mt-8">
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-2xl ${iconBg[variant]} shadow-2xl transform hover:scale-110 transition-transform duration-300`}>
              <Icon className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
