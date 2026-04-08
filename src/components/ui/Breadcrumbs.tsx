import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'white' | 'dark';
}

export default function Breadcrumbs({ items, variant = 'white' }: BreadcrumbsProps) {
  const textColor = variant === 'white' ? 'text-white/80' : 'text-gray-500';
  const activeColor = variant === 'white' ? 'text-white' : 'text-[var(--primary)]';
  const hoverColor = variant === 'white' ? 'hover:text-white' : 'hover:text-[var(--secondary)]';

  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className={`inline-flex items-center text-sm font-medium ${textColor} ${hoverColor} transition-colors`}
          >
            <Home className="w-4 h-4 mr-2" />
            Accueil
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href}>
            <div className="flex items-center">
              <ChevronRight className={`w-4 h-4 ${textColor} mx-1`} />
              <Link
                href={item.href}
                className={`ml-1 text-sm font-medium ${
                  index === items.length - 1 ? activeColor : textColor + ' ' + hoverColor
                } md:ml-2 transition-colors`}
              >
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
