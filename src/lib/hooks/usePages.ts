import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
interface Page {
    id: string;
    slug: string;
    title: string;
    content: any;
    metaTitle?: string;
    metaDescription?: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// ============================================================================
// GET: Toutes les pages
// ============================================================================
export function usePages(published?: boolean) {
    return useQuery({
        queryKey: ['pages', { published }],
        queryFn: async () => {
            const url = published !== undefined
                ? `/api/pages?published=${published}`
                : '/api/pages';

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Erreur lors de la récupération des pages');
            }
            const data = await res.json();
            return data.pages as Page[];
        },
    });
}

// ============================================================================
// GET: Une page par slug
// ============================================================================
export function usePage(slug: string | null) {
    return useQuery({
        queryKey: ['pages', slug],
        queryFn: async () => {
            if (!slug) throw new Error('Slug requis');

            const res = await fetch(`/api/pages/${slug}`);
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error('Page non trouvée');
                }
                throw new Error('Erreur lors de la récupération de la page');
            }
            const data = await res.json();
            return data.page as Page;
        },
        enabled: !!slug, // Ne fetch que si slug existe
    });
}

// ============================================================================
// POST: Créer une page
// ============================================================================
export function useCreatePage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newPage: Partial<Page>) => {
            const res = await fetch('/api/pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPage),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Erreur lors de la création de la page');
            }

            return res.json();
        },
        onSuccess: () => {
            // Invalider le cache des pages pour refetch
            queryClient.invalidateQueries({ queryKey: ['pages'] });
        },
    });
}

// ============================================================================
// PUT: Mettre à jour une page
// ============================================================================
export function useUpdatePage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<Page> }) => {
            const res = await fetch(`/api/pages/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Erreur lors de la mise à jour de la page');
            }

            return res.json();
        },
        onSuccess: (_data, variables) => {
            // Invalider le cache
            queryClient.invalidateQueries({ queryKey: ['pages'] });
            queryClient.invalidateQueries({ queryKey: ['pages', variables.id] });
        },
    });
}

// ============================================================================
// DELETE: Supprimer une page
// ============================================================================
export function useDeletePage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (slug: string) => {
            const res = await fetch(`/api/pages/${slug}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Erreur lors de la suppression de la page');
            }

            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pages'] });
        },
    });
}

// ============================================================================
// Hook combiné pour la gestion complète des pages
// ============================================================================
export function usePagesManager() {
    const { data: pages, isLoading, error, refetch } = usePages();
    const createPage = useCreatePage();
    const updatePage = useUpdatePage();
    const deletePage = useDeletePage();

    return {
        pages,
        isLoading,
        error,
        refetch,
        createPage: createPage.mutate,
        createPageAsync: createPage.mutateAsync,
        isCreating: createPage.isPending,
        updatePage: updatePage.mutate,
        updatePageAsync: updatePage.mutateAsync,
        isUpdating: updatePage.isPending,
        deletePage: deletePage.mutate,
        deletePageAsync: deletePage.mutateAsync,
        isDeleting: deletePage.isPending,
    };
}
