"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Edit,
  Trash2,
  PlusCircle,
  AlertCircle,
  User as UserIcon
} from "lucide-react";
import { useUsers } from "@/lib/hooks/useUsers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AdminHeader,
  AdminSearchFilter,
  AdminTable,
  AdminPagination
} from "@/components/admin/shared/AdminUI";
import ImageUploader from "@/components/admin/shared/ImageUploader";

// Schema de validation
const userSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().optional(), // Optionnel en édition
  isAdmin: z.boolean().default(false),
  image: z.string().optional() // Accepte URL ou chemin relatif
});

type UserFormData = z.infer<typeof userSchema>;

export default function UsersAdminPage() {
  const { users, isLoading, error, createUser, updateUser, deleteUser } = useUsers();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // État pour le mode Édition
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  // Formulaire
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      isAdmin: false,
      image: ""
    }
  });

  // Réinitialiser le formulaire à l'ouverture/fermeture ou changement de mode
  useEffect(() => {
    if (isModalOpen) {
      if (editingUser) {
        setValue("name", editingUser.name);
        setValue("email", editingUser.email);
        setValue("isAdmin", editingUser.isAdmin);
        setValue("image", editingUser.image || "");
        setValue("password", ""); // Reset password field
      } else {
        reset({
          name: "",
          email: "",
          password: "",
          isAdmin: false,
          image: ""
        });
      }
    }
  }, [isModalOpen, editingUser, reset, setValue]);

  const openCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const filteredUsers = (users || []).filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const userRole = user.isAdmin ? "admin" : "editor";
    const matchesRole = roleFilter === "all" || userRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onSubmit = async (data: UserFormData) => {
    try {
      if (editingUser) {
        // Mode Édition
        const updateData: any = { ...data };
        if (!data.password) delete updateData.password; // Ne pas envoyer pass vide

        const userId = editingUser._id || editingUser.id;
        if (!userId) {
          console.error("User ID manquant:", editingUser);
          alert("Erreur: ID utilisateur introuvable");
          return;
        }

        await updateUser.mutateAsync({ id: userId, data: updateData });
      } else {
        // Mode Création (Password requis manuellement si schema le permettait optionnel)
        if (!data.password) {
          alert("Le mot de passe est requis pour la création");
          return;
        }
        await createUser.mutateAsync(data as any);
      }
      setIsModalOpen(false);
      reset();
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser.mutateAsync(userToDelete);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  // Modale (Create / Edit)
  const renderModal = () => {
    if (!isModalOpen) return null;
    const isEdit = !!editingUser;
    const isLoadingAction = createUser.isPending || updateUser.isPending;
    const errorAction = createUser.error || updateUser.error;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {isEdit ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
            </h3>
            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <span className="sr-only">Fermer</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errorAction && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center border border-red-100">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errorAction.message}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                {...register("name")}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
                placeholder="Ex: Jean Dupont"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                {...register("email")}
                type="email"
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
                placeholder="Ex: jean@fps.gouv.cd"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <ImageUploader
              label="Photo de profil"
              value={watch("image")}
              onChange={(url) => setValue("image", url, { shouldValidate: true })}
            />
            {errors.image && <p className="mt-1 text-xs text-red-600">{errors.image.message}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEdit ? "Nouveau mot de passe (laisser vide pour conserver)" : "Mot de passe"}
              </label>
              <input
                {...register("password")}
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
                placeholder={isEdit ? "••••••••" : "Minimum 6 caractères"}
              />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>

            <div className="flex items-center pt-2">
              <input
                {...register("isAdmin")}
                type="checkbox"
                id="isAdmin"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900 cursor-pointer select-none">
                Est Administrateur ? (Accès total)
              </label>
            </div>

            <div className="mt-8 flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isLoadingAction}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center shadow-lg shadow-blue-500/30 transition-all text-sm font-medium"
              >
                {isLoadingAction && <span className="mr-2 animate-spin">⟳</span>}
                {isEdit ? "Enregistrer" : "Créer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const columns = [
    { header: "Utilisateur" },
    { header: "Email" },
    { header: "Rôle" },
    { header: "Date d'ajout" },
    { header: "Actions", className: "text-right" }
  ];

  return (
    <div>
      {renderModal()}

      {/* Modal suppression (code simplifié inline si besoin ou gardé comme avant) */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirmation</h3>
            <p className="text-gray-500 mb-6 text-sm">Voulez-vous vraiment supprimer cet utilisateur ?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Annuler</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg text-sm font-medium shadow-lg shadow-red-500/30">Supprimer</button>
            </div>
          </div>
        </div>
      )}

      <AdminHeader
        title="Gestion des utilisateurs"
        action={{
          label: "Nouvel utilisateur",
          icon: PlusCircle,
          onClick: openCreateModal
        }}
      />

      <AdminSearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Rechercher un utilisateur..."
      />

      {error ? (
        <div className="p-8 text-center text-red-600 bg-white rounded-lg shadow border border-red-100">
          erreur : {error.message}
        </div>
      ) : (
        <>
          <AdminTable
            columns={columns}
            isLoading={isLoading}
            isEmpty={!isLoading && filteredUsers.length === 0}
            emptyMessage="Aucun utilisateur trouvé"
          >
            {currentItems.map((user) => (
              <tr key={user._id || (user as any).id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold overflow-hidden relative border border-gray-200">
                      {user.image ? (
                        <Image src={user.image} alt="" fill className="object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center gap-1 ${user.isAdmin ? "bg-purple-50 text-purple-700 border border-purple-100" : "bg-gray-50 text-gray-700 border border-gray-100"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.isAdmin ? "bg-purple-500" : "bg-gray-400"}`}></span>
                    {user.isAdmin ? "Administrateur" : "Utilisateur"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(user)}
                      className="p-1.5 rounded-lg text-blue-600 hover:text-blue-900 hover:bg-blue-50 transition-colors"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setUserToDelete(user._id || (user as any).id);
                        setShowDeleteConfirm(true);
                      }}
                      className="p-1.5 rounded-lg text-red-600 hover:text-red-900 hover:bg-red-50 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
            }
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