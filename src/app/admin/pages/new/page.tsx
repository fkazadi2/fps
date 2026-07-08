"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Save,
  ArrowLeft,
  AlertCircle,
  EyeIcon,
  ExternalLink,
  X,
  Layers,
  Type,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useCreatePage } from "@/lib/hooks/usePages";

// Nos nouveaux composants
import AdvancedRichEditor from "@/components/admin/AdvancedRichEditor";
import BlockEditor, { BlockData } from "@/components/admin/BlockEditor";

// Schéma de validation pour le formulaire
const pageSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  slug: z.string().min(1, "L'URL est requise").refine(value => /^[a-z0-9\-\/]+$/.test(value), {
    message: "L'URL ne peut contenir que des lettres minuscules, chiffres, tirets et slashes"
  }),
  content: z.string().min(10, "Le contenu est requis (minimum 10 caractères)"),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional()
  }).optional(),
  published: z.boolean(),
  layout: z.enum(["standard", "full-width", "sidebar", "landing", "blocks"]).default("standard"),
  blocks: z.array(z.any()).optional()
});

type FormData = z.infer<typeof pageSchema>;

type EditorMode = 'content' | 'blocks';

export default function NewPageAdmin() {
  const router = useRouter();
  const createPage = useCreatePage();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [editorMode, setEditorMode] = useState<EditorMode>('content');
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<BlockData | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    getValues
  } = useForm<FormData>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      seo: {
        title: "",
        description: ""
      },
      published: false,
      layout: "standard",
      blocks: []
    }
  });

  // Pour la prévisualisation
  const watchedValues = watch();

  // Générer automatiquement un slug à partir du titre
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s\/\-]/g, '') // Enlever les caractères spéciaux sauf / et -
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/--+/g, '-') // Remplacer les tirets multiples par un seul
      .replace(/^-+|-+$/g, ''); // Enlever les tirets au début et à la fin
  };

  // Mettre à jour le layout automatiquement selon le mode d'édition
  React.useEffect(() => {
    if (editorMode === 'blocks') {
      setValue('layout', 'blocks');
    } else if (watchedValues.layout === 'blocks') {
      setValue('layout', 'standard');
    }
  }, [editorMode, setValue, watchedValues.layout]);

  const handleBlocksChange = (newBlocks: BlockData[]) => {
    setBlocks(newBlocks);
    setValue('blocks', newBlocks as any);
  };

  const onSubmit = async (data: FormData) => {
    setMessage(null);

    try {
      // Ajouter les blocs aux données si on est en mode blocs
      if (editorMode === 'blocks') {
        data.blocks = blocks;
        data.layout = 'blocks';
      }

      // Utiliser le hook useCreatePage
      await createPage.mutateAsync(data);

      setMessage({
        type: "success",
        text: "Page créée avec succès"
      });

      // Redirection après un court délai
      setTimeout(() => {
        router.push("/admin/pages");
      }, 1500);
    } catch (error: any) {
      console.error("Erreur:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.error || "Erreur lors de la création de la page"
      });
    }
  };

  // Générer une prévisualisation
  const generatePreview = async () => {
    // À adapter pour utiliser l'API preview
    alert("La prévisualisation sera disponible prochainement");
  };

  // Mode prévisualisation du contenu
  const renderPreview = () => {
    return (
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Prévisualisation</h2>
          <button
            onClick={() => setPreviewMode(false)}
            className="text-gray-500 hover:text-gray-700 p-1 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-4">{watchedValues.title}</h1>
          {editorMode === 'content' ? (
            <div dangerouslySetInnerHTML={{ __html: watchedValues.content }} />
          ) : (
            <div className="space-y-6">
              <p className="text-gray-600">Mode blocs - {blocks.length} bloc(s) configuré(s)</p>
              {blocks.map((block, index) => (
                <div key={block.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-500">Bloc {index + 1}:</span>
                    <span className="text-sm text-gray-700 capitalize">{block.type}</span>
                  </div>
                  {block.data.title && (
                    <h3 className="font-semibold">{String(block.data.title)}</h3>
                  )}
                  {block.data.content && (
                    <div dangerouslySetInnerHTML={{ __html: String(block.data.content) }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link
                href="/admin/pages"
                className="mr-4 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Nouvelle page</h1>
            </div>

            <div className="flex items-center space-x-3">
              {/* Sélecteur de mode d'édition */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setEditorMode('content')}
                  className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${editorMode === 'content'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Type className="w-4 h-4 mr-2" />
                  Contenu
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode('blocks')}
                  className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${editorMode === 'blocks'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Blocs
                </button>
              </div>

              {/* Bouton Prévisualisation */}
              <button
                type="button"
                onClick={generatePreview}
                className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                disabled={previewLoading}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Prévisualiser
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                {previewMode ? "Éditer" : "Aperçu"}
              </button>

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Création...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Créer la page
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="px-6 py-4">
            <div className={`p-4 rounded-md ${message.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              <div className="flex">
                <AlertCircle className={`h-5 w-5 ${message.type === "success" ? "text-green-400" : "text-red-400"}`} />
                <div className="ml-3">
                  <p className={`text-sm font-medium ${message.type === "success" ? "text-green-800" : "text-red-800"}`}>
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {previewMode ? (
          <div className="p-6">
            {renderPreview()}
          </div>
        ) : (
          <div className="flex h-[calc(100vh-140px)]">
            {/* Panneau de configuration */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Configuration de la page</h3>

                  {/* Titre */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre de la page
                    </label>
                    <input
                      {...register("title")}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Entrez le titre de la page"
                      onChange={(e) => {
                        register("title").onChange(e);
                        setValue("slug", generateSlug(e.target.value));
                      }}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                  </div>

                  {/* Slug */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL (slug)
                    </label>
                    <input
                      {...register("slug")}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="url-de-la-page"
                    />
                    {errors.slug && (
                      <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                    )}
                  </div>

                  {/* Statut */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={watchedValues.published ? "published" : "draft"}
                      onChange={(e) => setValue("published", e.target.value === "published")}
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                    </select>
                  </div>

                  {/* Layout */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mise en page
                    </label>
                    <select
                      {...register("layout")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={editorMode === 'blocks'}
                    >
                      <option value="standard">Standard</option>
                      <option value="full-width">Pleine largeur</option>
                      <option value="sidebar">Avec sidebar</option>
                      <option value="landing">Page de destination</option>
                      {editorMode === 'blocks' && <option value="blocks">Mode blocs</option>}
                    </select>
                  </div>
                </div>

                {/* Configuration SEO */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">SEO</h4>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre SEO (optionnel)
                    </label>
                    <input
                      {...register("seo.title")}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Titre pour les moteurs de recherche"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description SEO (optionnel)
                    </label>
                    <textarea
                      {...register("seo.description")}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Description pour les moteurs de recherche"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Zone d'édition principale */}
            <div className="flex-1 bg-white overflow-hidden">
              {editorMode === 'content' ? (
                <div className="h-full p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu de la page
                    </label>
                  </div>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <AdvancedRichEditor
                        value={field.value}
                        onChange={field.onChange}
                        height={600}
                        placeholder="Commencez à écrire le contenu de votre page..."
                      />
                    )}
                  />
                  {errors.content && (
                    <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
                  )}
                </div>
              ) : (
                <BlockEditor
                  blocks={blocks}
                  onChange={handleBlocksChange}
                  onBlockSelect={setSelectedBlock}
                  selectedBlockId={selectedBlock?.id || null}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}