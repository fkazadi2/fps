import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface FeaturedImageBoxProps {
  label?: string;
  icon?: LucideIcon;
  variant?: 'blue' | 'green' | 'red' | 'purple';
  image?: string;
}

export default function FeaturedImageBox({
  label,
  icon: Icon,
  variant = 'blue',
  image,
}: FeaturedImageBoxProps) {
  const gradients = {
    blue: 'from-blue-600 via-blue-700 to-indigo-900',
    green: 'from-green-600 via-green-700 to-teal-900',
    red: 'from-red-600 via-red-700 to-rose-900',
    purple: 'from-purple-600 via-purple-700 to-violet-900'
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`h-80 md:h-[450px] rounded-[2.5rem] overflow-hidden relative bg-gradient-to-br ${gradients[variant]} shadow-2xl transition-all hover:scale-[1.02] duration-500`}>
          {image ? (
            <div className="absolute inset-0">
              <Image
                src={image}
                fill
                className="object-cover" alt={label || ""} />
              <div className="absolute inset-0 bg-black/35" />
            </div>
          ) : null}
          <div className="absolute top-10 right-10 w-40 h-40 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-white/20 rounded-full"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            {Icon && (
              <div className="mb-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            )}
            {label && (
              <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-4xl drop-shadow-2xl">
                {label}
              </h2>
            )}
          </div>

          <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
