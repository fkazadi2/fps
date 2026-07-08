"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Edit,
  Trash2,
  PlusCircle,
  Eye,
  AlertCircle
} from "lucide-react";
import { useArticles } from "@/lib/hooks/useArticles";
import {
  AdminHeader,
  AdminSearchFilter,
  AdminTable,
  AdminPagination
} from "@/components/admin/shared/AdminUI";

export default function PostsAdminPage() {
  const { articles, isLoading, error, deleteArticle } = useArticles();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Liste plus dense

  // Filtrer les actualités
  const filteredPosts = (articles || []).filter(post => {
    const titleMatch = post.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchedCategory = categoryFilter === "all" || post.category === categoryFilter;
    return titleMatch && matchedCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await deleteArticle.mutateAsync(id);
      } catch (err) {
        console.error("Erreur suppression:", err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  const getStatusBadge = (published: boolean) => {
    return published
      ? <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Publié</span>
      : <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Brouillon</span>;
  };

  const getCategoryBadge = (category: string) => {
    const label = category.charAt(0).toUpperCase() + category.slice(1);
    let classes = "bg-gray-100 text-gray-800";
    if (category === "evenement") classes = "bg-purple-100 text-purple-800";
    if (category === "communique") classes = "bg-blue-100 text-blue-800";

    return <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${classes}`}>{label}</span>;
  };

  const columns = [
    { header: "Article" }, // Image + Titre
    { header: "Catégorie" },
    { header: "Statut" },
    { header: "Date" },
    { header: "Actions", className: "text-right" }
  ];

  return (
    <div>
      <AdminHeader
        title="Gestion des actualités"
        action={{
          label: "Nouvelle actualité",
          icon: PlusCircle,
          href: "/admin/posts/new"
        }}
      />

      <AdminSearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Rechercher par titre..."
      >
        <div className="flex-shrink-0 mt-3 md:mt-0">
          <select
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Toutes les catégories</option>
            <option value="communique">Communiqués</option>
            <option value="evenement">Événements</option>
            <option value="autre">Autres</option>
          </select>
        </div>
      </AdminSearchFilter>

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
            isEmpty={!isLoading && filteredUsers.length === 0}
            emptyMessage="Aucune actualité trouvée"
          >
            {currentItems.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {post.image ? (
                      <div className="flex-shrink-0 h-10 w-16 relative rounded overflow-hidden mr-4 border border-gray-200">
                        <Image src={post.image} alt="" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 h-10 w-16 bg-gray-100 rounded mr-4 flex items-center justify-center text-xs text-gray-400">
                        No SANS
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-1 max-w-xs" title={post.title}>
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">
                        {post.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getCategoryBadge(post.category)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(post.published)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : <span className="text-gray-400">-</span>
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      href={`/actualites/${post.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      title="Voir sur le site"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/posts/edit/${post._id}`}
                      className="p-1.5 rounded-full text-blue-600 hover:text-blue-900 hover:bg-blue-50 transition-colors"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
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
            onPageChange={paginate}
          />
        </>
      )}
    </div>
  );
}