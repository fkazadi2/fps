"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Save,
    ArrowLeft,
    AlertCircle,
    Loader2,
    ImageIcon,
    Trash2
} from "lucide-react";
import Link from "next/link";
import { useArticle, useUpdateArticle } from "@/lib/hooks/useArticles";
import AdvancedRichEditor from "@/components/admin/AdvancedRichEditor";

// Schéma de validation
const articleSchema = z.object({
    title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
    slug: z.string().optional(),
    excerpt: z.string().min(20, "L'extrait doit contenir au moins 20 caractères").max(800, "Max 800 caractères"),
    content: z.string().min(50, "Le contenu est trop court"),
    category: z.enum(["communique", "evenement", "autre"], {
        errorMap: () => ({ message: "Veuillez sélectionner une catégorie valide" })
    }),
    image: z.string().min(1, "L'image est requise (URL)"),
    published: z.boolean()
});

type ArticleFormData = z.infer<typeof articleSchema>;

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const { data: article, isLoading: isLoadingArticle, error: loadError } = useArticle(id);
    const updateArticle = useUpdateArticle();

    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            category: "communique",
            published: false,
            content: ""
        }
    });

    // Charger les données dans le formulaire
    useEffect(() => {
        if (article) {
            reset({
                title: article.title,
                slug: article.slug,
                excerpt: article.excerpt,
                content: String(article.content || ""),
                category: article.category as any,
                image: article.image,
                published: article.published
            });
        }
    }, [article, reset]);

    // Gestion erreur chargement
    useEffect(() => {
        if (loadError) {
            setMessage({ type: "error", text: "Impossible de charger l'article" });
        }
    }, [loadError]);

    const onSubmit = async (data: ArticleFormData) => {
        setMessage(null);
        try {
            await updateArticle.mutateAsync({ id, data });
            setMessage({ type: "success", text: "Article mis à jour avec succès !" });

            // On reste sur la page ou on redirige ? Redirigeons.
            setTimeout(() => {
                router.push("/admin/posts");
            }, 1000);
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "Erreur lors de la modification" });
        }
    };

    if (isLoadingArticle) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-500">Chargement de l'article...</p>
                </div>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="p-8 text-center bg-gray-50 min-h-screen">
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Erreur</h2>
                    <p className="text-gray-600 mb-6">Impossible de charger l'article demandé.</p>
                    <Link href="/admin/posts" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Retourner à la liste
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-5xl mx-auto pt-6 px-6">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/admin/posts" className="mr-4 p-2 bg-white rounded-full text-gray-500 hover:text-gray-700 shadow-sm">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Modifier l'actualité</h1>
                            <p className="text-sm text-gray-500 mt-1">ID: {id}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 shadow-sm transition-all"
                    >
                        {isSubmitting ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Save className="h-5 w-5 mr-2" />}
                        Enregistrer
                    </button>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                        <AlertCircle className="h-5 w-5 mr-2" />
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'article</label>
                                <input
                                    {...register("title")}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Titre..."
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                                <input
                                    {...register("slug")}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
                                <div className="prose-admin">
                                    <Controller
                                        name="content"
                                        control={control}
                                        render={({ field }) => (
                                            <AdvancedRichEditor
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Rédigez votre article ici..."
                                                height={400}
                                            />
                                        )}
                                    />
                                </div>
                                {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Extrait (Résumé)</label>
                            <textarea
                                {...register("excerpt")}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                placeholder="Un bref résumé..."
                            />
                            {errors.excerpt && <p className="mt-1 text-sm text-red-500">{errors.excerpt.message}</p>}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Publication</h3>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            value="false"
                                            checked={!watch("published")}
                                            onChange={() => setValue("published", false)}
                                            name="status_radio"
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Brouillon</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            value="true"
                                            checked={watch("published")}
                                            onChange={() => setValue("published", true)}
                                            name="status_radio"
                                            className="text-green-600 focus:ring-green-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Publié</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                                <select
                                    {...register("category")}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="communique">Communiqué</option>
                                    <option value="evenement">Événement</option>
                                    <option value="autre">Autre</option>
                                </select>
                                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-1">
                                    Créé le : {article?.createdAt ? new Date(article.createdAt).toLocaleString() : '-'}
                                </p>
                                {article?.publishedAt && (
                                    <p className="text-xs text-gray-500">
                                        Publié le : {new Date(article.publishedAt).toLocaleString()}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <ImageIcon className="h-4 w-4 mr-2 text-gray-500" />
                                Image à la une
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">URL de l'image</label>
                                <input
                                    {...register("image")}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-2"
                                    placeholder="https://..."
                                />
                                {errors.image && <p className="text-xs text-red-500 mb-2">{errors.image.message}</p>}

                                {watch("image") && (
                                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200 mt-2">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={watch("image")}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
