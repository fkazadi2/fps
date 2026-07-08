"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Edit,
  Trash2,
  PlusCircle,
  Eye,
  FileText,
  AlertCircle
} from "lucide-react";
import { usePagesManager } from "@/lib/hooks/usePages";
import {
  AdminHeader,
  AdminSearchFilter,
  AdminTable,
  AdminPagination
} from "@/components/admin/shared/AdminUI";

export default function PagesAdminPage() {
  const { pages, isLoading, error, deletePageAsync } = usePagesManager();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrer les pages
  const filteredPages = (pages || []).filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const currentItems = filteredPages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (slug: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette page ? Cette action est irréversible.")) {
      try {
        await deletePageAsync(slug);
      } catch (err) {
        console.error("Erreur suppression:", err);
        alert("Erreur lors de la suppression de la page");
      }
    }
  };

  const getStatusBadge = (published: boolean) => {
    return published
      ? <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Publié</span>
      : <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Brouillon</span>;
  };

  const columns = [
    { header: "Titre" },
    { header: "Slug (URL)" },
    { header: "Statut" },
    { header: "Dernière modif" },
    { header: "Actions", className: "text-right" }
  ];

  return (
    <div>
      <AdminHeader
        title="Gestion des pages"
        action={{
          label: "Nouvelle page",
          icon: PlusCircle,
          href: "/admin/pages/new"
        }}
      />

      <AdminSearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Rechercher une page..."
      />

      {error ? (
        <div className="p-8 text-center text-red-600 bg-white rounded-lg shadow">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          Erreur : {error.message}
        </div>
      ) : (
        <>
          <AdminTable
            columns={columns}
            isLoading={isLoading}
            isEmpty={!isLoading && filteredPages.length === 0}
            emptyMessage="Aucune page trouvée. Commencez par en créer une !"
          >
            {currentItems.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mr-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{page.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                  {page.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(page.published)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {page.updatedAt
                    ? new Date(page.updatedAt).toLocaleDateString()
                    : "-"
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      href={page.slug}
                      target="_blank"
                      className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      title="Voir la page"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/pages/edit/${page.id}`}
                      className="p-1.5 rounded-full text-blue-600 hover:text-blue-900 hover:bg-blue-50 transition-colors"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(page.slug)}
                      className="p-1.5 rounded-full text-red-600 hover:text-red-900 hover:bg-red-50 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </AdminTable>

          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}