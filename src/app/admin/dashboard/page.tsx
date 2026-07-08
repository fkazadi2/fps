import { Suspense } from 'react';
import Link from 'next/link';
import {
  FileText,
  Users,
  Newspaper,
  ArrowRight,
  Plus,
  Activity,
  Calendar
} from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Page from '@/lib/models/Page';
import Article from '@/lib/models/Article';
import User from '@/lib/models/User';

// Fonction pour récupérer les stats (Server-Side)
async function getDashboardStats() {
  try {
    await connectDB();

    const [pagesCount, articlesCount, usersCount, recentArticles] = await Promise.all([
      Page.countDocuments({ published: true }),
      Article.countDocuments({ published: true }),
      User.countDocuments(),
      Article.find({ published: true })
        .sort({ publishedAt: -1 })
        .limit(3)
        .lean()
    ]);

    return {
      pagesCount,
      articlesCount,
      usersCount,
      recentArticles: JSON.parse(JSON.stringify(recentArticles)) // Serialize ObjectId/Date
    };
  } catch (error) {
    console.warn("⚠️ Mode Resilience Admin : Impossible de récupérer les stats réelles. Utilisation de valeurs par défaut.");
    return {
      pagesCount: 0,
      articlesCount: 0,
      usersCount: 0,
      recentArticles: []
    };
  }
}

// Composant Carte Statistique
function StatCard({ title, value, icon: Icon, color, href }: any) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 ${color}`}>
        <Icon className="w-24 h-24" />
      </div>

      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color.replace('text-', 'bg-').replace('600', '100')} ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-extrabold text-gray-900 mt-1 group-hover:scale-105 transition-transform origin-left">
          {value}
        </p>
      </div>

      <div className="mt-4 flex items-center text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
        Gérer <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

// Composant Quick Action
function QuickAction({ label, href, icon: Icon }: any) {
  return (
    <Link
      href={href}
      className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-100 group"
    >
      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-medium text-gray-700 group-hover:text-blue-700">{label}</span>
      <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
    </Link>
  );
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header Accueil */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Vue d'ensemble
          </h1>
          <p className="text-gray-500 mt-1">
            Bienvenue sur votre espace d'administration
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Pages Publiées"
          value={stats.pagesCount}
          icon={FileText}
          color="text-blue-600"
          href="/admin/pages"
        />
        <StatCard
          title="Articles & News"
          value={stats.articlesCount}
          icon={Newspaper}
          color="text-purple-600"
          href="/admin/posts"
        />
        <StatCard
          title="Utilisateurs"
          value={stats.usersCount}
          icon={Users}
          color="text-green-600"
          href="/admin/users"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Colonne Actions Rapides & Activité */}
        <div className="lg:col-span-2 space-y-8">

          {/* Actions Rapides */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-blue-500" />
              Actions Rapides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <QuickAction label="Nouvelle Page" href="/admin/pages/new" icon={FileText} />
              <QuickAction label="Nouvelle Actualité" href="/admin/posts/new" icon={Newspaper} />
              <QuickAction label="Ajouter un Utilisateur" href="/admin/users" icon={Users} />
              <QuickAction label="Gérer les Médias" href="/admin/media" icon={Activity} />
            </div>
          </section>

          {/* Graphique Placeholder (Si on avait Recharts, on le mettrait ici) */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Trafic & Visites</h2>
            <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-300">
              <div className="text-center text-gray-400">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Données analytiques indisponibles pour le moment</p>
              </div>
            </div>
          </section>
        </div>

        {/* Colonne Latérale - Dernières publications */}
        <div className="space-y-6">
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
              <span>Publications Récentes</span>
              <Link href="/admin/posts" className="text-xs text-blue-600 hover:text-blue-700 font-medium">Tout voir</Link>
            </h2>

            <div className="space-y-4">
              {stats.recentArticles.length > 0 ? (
                stats.recentArticles.map((article: any) => (
                  <div key={article._id} className="group flex items-start p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg overflow-hidden mr-3">
                      {article.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={article.image} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400 text-sm">
                  Aucun article récent
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Link href="/" target="_blank" className="w-full block text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors">
                Voir le site en direct
              </Link>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}