import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Settings,
  Users,
  Image,
  Newspaper,
  Calendar,
  BarChart3,
  Home,
  ChevronDown,
  ChevronRight,
  Search,
  Menu
} from 'lucide-react';

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  external?: boolean;
  children?: NavigationItem[];
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
  collapsible?: boolean;
}

export default function EnhancedNavigation() {
  const pathname = usePathname();
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleSection = (sectionTitle: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionTitle)) {
      newCollapsed.delete(sectionTitle);
    } else {
      newCollapsed.add(sectionTitle);
    }
    setCollapsedSections(newCollapsed);
  };

  const toggleItem = (href: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedItems(newExpanded);
  };

  const navigationStructure: NavigationSection[] = [
    {
      title: 'Principal',
      items: [
        { href: '/admin/dashboard', label: 'Tableau de bord', icon: Home },
        { href: '/admin/homepage', label: 'Page d\'accueil', icon: Settings },
        { href: '/', label: 'Voir le site', icon: Search, external: true }
      ]
    },
    {
      title: 'Contenu',
      collapsible: true,
      items: [
        {
          href: '/admin/pages',
          label: 'Pages',
          icon: FileText,
          children: [
            { href: '/admin/pages', label: 'Toutes les pages', icon: FileText },
            { href: '/admin/pages/new', label: 'Nouvelle page', icon: FileText },
            { href: '/admin/pages?status=draft', label: 'Brouillons', icon: FileText, badge: 3 }
          ]
        },
        { href: '/admin/posts', label: 'Actualités', icon: Newspaper },
        { href: '/admin/events', label: 'Événements', icon: Calendar },
        { href: '/admin/media', label: 'Médiathèque', icon: Image }
      ]
    },
    {
      title: 'Analytics',
      collapsible: true,
      items: [
        { href: '/admin/analytics', label: 'Statistiques', icon: BarChart3 },
        { href: '/admin/reports', label: 'Rapports', icon: FileText }
      ]
    },
    {
      title: 'Configuration',
      collapsible: true,
      items: [
        { href: '/admin/site', label: 'Paramètres du site', icon: Settings },
        { href: '/admin/navigation', label: 'Menus & Navigation', icon: Menu },
        { href: '/admin/users', label: 'Utilisateurs', icon: Users },
        { href: '/admin/seo', label: 'SEO', icon: Search }
      ]
    }
  ];

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const hasActiveChild = (items: NavigationItem[]): boolean => {
    return items.some(item => {
      if (isActive(item.href)) return true;
      if (item.children) return hasActiveChild(item.children);
      return false;
    });
  };

  const renderNavigationItem = (item: NavigationItem, isChild = false) => {
    const active = isActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.href) || (hasChildren && hasActiveChild(item.children!));

    const baseClasses = `
      group flex items-center w-full text-left
      ${isChild ? 'pl-8 py-2' : 'px-3 py-2'}
      text-sm font-medium rounded-md transition-colors
    `;

    const activeClasses = active
      ? 'bg-blue-100 text-blue-900 border-r-2 border-blue-600'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';

    const content = (
      <div className={`${baseClasses} ${activeClasses}`}>
        <item.icon
          className={`
            ${isChild ? 'w-4 h-4' : 'w-5 h-5'} mr-3 flex-shrink-0
            ${active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}
          `}
        />
        <span className="flex-1">{item.label}</span>

        {item.badge && (
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {item.badge}
          </span>
        )}

        {hasChildren && (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleItem(item.href);
            }}
            className="ml-2 p-1 rounded hover:bg-gray-200"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    );

    return (
      <li key={item.href}>
        {item.external ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {content}
          </a>
        ) : hasChildren ? (
          <div>
            <div className="cursor-pointer" onClick={() => toggleItem(item.href)}>
              {content}
            </div>
            {isExpanded && (
              <ul className="mt-1 space-y-1">
                {item.children!.map(child => renderNavigationItem(child, true))}
              </ul>
            )}
          </div>
        ) : (
          <Link href={item.href} className="block">
            {content}
          </Link>
        )}
      </li>
    );
  };

  const renderSection = (section: NavigationSection) => {
    const isCollapsed = collapsedSections.has(section.title);
    const sectionHasActive = hasActiveChild(section.items);

    return (
      <div key={section.title} className="space-y-1">
        {section.collapsible ? (
          <button
            onClick={() => toggleSection(section.title)}
            className={`
              w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors
              ${sectionHasActive ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
            `}
          >
            <span>{section.title}</span>
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        ) : (
          <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {section.title}
          </h3>
        )}

        {(!section.collapsible || !isCollapsed) && (
          <ul className="space-y-1">
            {section.items.map(item => renderNavigationItem(item))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <nav className="flex-1 px-2 py-4 space-y-6">
      {navigationStructure.map(section => renderSection(section))}
    </nav>
  );
} 