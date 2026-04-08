import { BookOpen, Download, Calendar, FileText, BarChart3, ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import Link from "next/link";

// Données des documents en "local" pour ne pas dépendre de MongoDB
const DOCUMENTS_DATA = [
  {
    id: "doc-2023-annuel",
    title: "Rapport Annuel 2023 - Activités et Réalisations",
    category: "Rapport Annuel",
    date: "15 Janvier 2024",
    description: "Rapport complet des activités et réalisations du FPS pour l'année 2023, incluant les statistiques de performance et les projets réalisés.",
    fileUrl: "/uploads/documents/Rapport annuel FPS 2023.pdf",
    fileSize: "2.5 MB",
    format: "PDF",
    downloads: 1250,
  },
  {
    id: "doc-gratuite-accouchements",
    title: "Rapport sur la Gratuité des Accouchements",
    category: "Rapport Technique",
    date: "10 Mars 2024",
    description: "Analyse de l'impact du programme de gratuité des accouchements sur la santé maternelle et néonatale en RDC.",
    fileUrl: "/uploads/documents/Rapport - Gratuité des accouchements.pdf",
    fileSize: "1.8 MB",
    format: "PDF",
    downloads: 890,
  }
];

export default function RapportsDocumentationsPage() {
  const documents = DOCUMENTS_DATA;

  // Grouper par catégorie pour les filtres
  const categoriesMap = documents.reduce((acc: any, doc: any) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(categoriesMap).map(name => ({
    nom: name,
    count: categoriesMap[name],
    color: "purple"
  }));

  const totalDownloads = documents.reduce((acc: number, doc: any) => acc + (doc.downloads || 0), 0);
  
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Rapports & Documentations"
          description="Accéder aux ressources officielles, rapports d'activité et documents techniques du Fonds de Promotion de la Santé"
          icon={FileText}
          variant="emerald"
          breadcrumbs={[
            { name: "Publications", href: "/publications" },
            { name: "Rapports & Doc", href: "/publications/rapports-documentations" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={FileText}
          label="Documentation Officielle et Rapports Institutionnels"
          variant="green"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{documents.length}</div>
                <div className="text-sm text-gray-600">Documents disponibles</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
                <div className="text-sm text-gray-600">Catégories</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{totalDownloads > 0 ? `${(totalDownloads / 1000).toFixed(1)}K` : "2.1K"}</div>
                <div className="text-sm text-gray-600">Téléchargements</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">Archives</div>
                <div className="text-sm text-gray-600">Disponibles</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {documents.map((doc: any) => (
              <div key={doc.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 mr-3">{doc.title}</h3>
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                          {doc.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{doc.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{doc.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>{doc.format}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          <span>{doc.downloads} téléchargements</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Download className="h-4 w-4 mr-2" />
                          <span>{doc.fileSize}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className="space-y-2">
                        <a
                          href={doc.fileUrl}
                          download
                          className="w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center font-medium"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </a>
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center font-medium"
                        >
                          Aperçu
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section archives simple */}
        <div className="bg-red-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Besoin d'autres documents ?</h2>
            <p className="text-gray-600 mb-8">Contactez notre département technique pour toute demande spécifique.</p>
            <div className="flex justify-center space-x-6 text-sm">
              <span className="flex items-center">📧 publications@fps.cd</span>
              <span className="flex items-center">📞 +243 819 115 812</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}