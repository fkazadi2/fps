import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  TrendingUp,
  Activity,
  Eye,
  ExternalLink,
  Plus,
  Edit,
  Settings
} from 'lucide-react';

interface PageData {
  id: string;
  title: string;
  slug: string;
  status: string;
  lastUpdated: string;
  author: string;
}

interface AnalyticsData {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  recentActivities: Activity[];
  popularPages: PopularPage[];
}

interface Activity {
  id: string;
  type: 'page_created' | 'page_updated' | 'page_published';
  title: string;
  timestamp: Date;
  user: string;
}

interface PopularPage {
  title: string;
  slug: string;
  views: number;
  lastModified: Date;
}

interface StatCard {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href?: string;
}

export default function EnhancedDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données réelles depuis localStorage
    const loadAnalytics = () => {
      try {
        // Récupérer les pages depuis localStorage
        const pagesData = localStorage.getItem('fps_cms_pages');
        const pages: PageData[] = pagesData ? JSON.parse(pagesData) : [];
        
        const publishedPages = pages.filter((p: PageData) => p.status === 'published');
        const draftPages = pages.filter((p: PageData) => p.status === 'draft');

        // Générer des activités récentes basées sur les pages
        const recentActivities: Activity[] = pages.slice(0, 5).map((page: PageData, index: number) => ({
          id: page.id || `activity-${index}`,
          type: page.status === 'published' ? 'page_published' : 'page_updated',
          title: page.title || 'Page sans titre',
          timestamp: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
          user: page.author || 'Admin FPS'
        }));

        // Pages populaires simulées
        const popularPages: PopularPage[] = pages.slice(0, 3).map((page: PageData) => ({
          title: page.title || 'Page sans titre',
          slug: page.slug || '/',
          views: Math.floor(Math.random() * 1000) + 100,
          lastModified: new Date(page.lastUpdated || Date.now())
        }));

        setAnalytics({
          totalPages: pages.length,
          publishedPages: publishedPages.length,
          draftPages: draftPages.length,
          recentActivities,
          popularPages
        });
      } catch (error) {
        console.error('Erreur lors du chargement des analytics:', error);
        // Données par défaut en cas d'erreur
        setAnalytics({
          totalPages: 0,
          publishedPages: 0,
          draftPages: 0,
          recentActivities: [],
          popularPages: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats: StatCard[] = [
    {
      title: 'Total des pages',
      value: analytics?.totalPages || 0,
      icon: FileText,
      color: 'bg-blue-500',
      href: '/admin/pages'
    },
    {
      title: 'Pages publiées',
      value: analytics?.publishedPages || 0,
      change: 12,
      icon: Eye,
      color: 'bg-green-500',
      href: '/admin/pages?status=published'
    },
    {
      title: 'Brouillons',
      value: analytics?.draftPages || 0,
      icon: Edit,
      color: 'bg-yellow-500',
      href: '/admin/pages?status=draft'
    },
    {
      title: 'Activité',
      value: analytics?.recentActivities.length || 0,
      icon: Activity,
      color: 'bg-purple-500'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'page_created': return <Plus className="w-4 h-4" />;
      case 'page_updated': return <Edit className="w-4 h-4" />;
      case 'page_published': return <Eye className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'page_created': return 'bg-green-100 text-green-600';
      case 'page_updated': return 'bg-blue-100 text-blue-600';
      case 'page_published': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'une heure';
    if (diffInHours < 24) return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-1 text-sm text-gray-500">
            Aperçu de l&apos;activité de votre site web FPS
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            href="/admin/pages/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle page
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Voir le site
          </Link>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.color} p-3 rounded-md`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-500 truncate">{stat.title}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    {stat.change && (
                      <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {stat.change}%
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {stat.href && (
                <div className="mt-4">
                  <Link
                    href={stat.href}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Voir tout →
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activité récente */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Activité récente</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {analytics?.recentActivities.length ? (
                analytics.recentActivities.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 flex items-center">
                    <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">
                        par {activity.user} • {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center">
                  <Activity className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune activité récente</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Commencez par créer ou modifier une page.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions rapides et pages populaires */}
        <div className="space-y-6">
          {/* Actions rapides */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Actions rapides</h3>
            </div>
            <div className="p-6 space-y-3">
              <Link
                href="/admin/pages/new"
                className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium">Nouvelle page</span>
              </Link>
              <Link
                href="/admin/site"
                className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-sm font-medium">Paramètres du site</span>
              </Link>
              <Link
                href="/admin/media"
                className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-sm font-medium">Gérer les médias</span>
              </Link>
            </div>
          </div>

          {/* Pages populaires */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Pages populaires</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {analytics?.popularPages.length ? (
                analytics.popularPages.map((page, index) => (
                  <div key={index} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {page.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{page.slug}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {page.views} vues
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center">
                  <TrendingUp className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Aucune donnée de popularité</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 