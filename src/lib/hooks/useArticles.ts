import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Article {
    _id: string; // MongoDB ID
    id?: string; // Pour compatibilité si nécessaire
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    image: string; // Correspond à featuredImage dans l'interface parfois
    published: boolean;
    publishedAt?: string;
    createdAt: string;
    tags?: string[];
}

// Input type for creating/updating
export type ArticleInput = Omit<Article, "_id" | "createdAt" | "publishedAt">;

const fetchArticles = async (): Promise<Article[]> => {
    const response = await fetch("/api/articles");
    if (!response.ok) throw new Error("Erreur chargement articles");
    return response.json();
};

const fetchArticle = async (id: string): Promise<Article> => {
    const response = await fetch(`/api/articles/${id}`);
    if (!response.ok) throw new Error("Article non trouvé");
    return response.json();
};

const createArticle = async (data: Partial<ArticleInput>): Promise<Article> => {
    const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Erreur création article");
    }
    return response.json();
};

const updateArticle = async ({ id, data }: { id: string; data: Partial<ArticleInput> }): Promise<Article> => {
    const response = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erreur mise à jour article");
    return response.json();
};

const deleteArticle = async (id: string): Promise<void> => {
    const response = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Erreur suppression article");
};

export function useArticles() {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["articles"],
        queryFn: fetchArticles,
    });

    const createMutation = useMutation({
        mutationFn: createArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
    });

    return {
        articles: query.data,
        isLoading: query.isLoading,
        error: query.error,
        createArticle: createMutation,
        deleteArticle: deleteMutation,
    };
}

export function useArticle(id: string) {
    return useQuery({
        queryKey: ["article", id],
        queryFn: () => fetchArticle(id),
        enabled: !!id,
    });
}

export function useUpdateArticle() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateArticle,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ["article", data._id] });
        },
    });
}
