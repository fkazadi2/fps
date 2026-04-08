"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Upload, AlertCircle, CheckCircle2 } from "lucide-react";

// Schéma de validation pour le formulaire
const siteConfigSchema = z.object({
  siteName: z.string().min(1, "Le nom du site est requis"),
  siteDescription: z.string().min(1, "La description du site est requise"),
  contactEmail: z.string().email("Email invalide").optional().or(z.literal("")),
  contactPhone: z.string().optional().or(z.literal("")),
  contactAddress: z.string().optional().or(z.literal("")),
  socialLinks: z.object({
    facebook: z.string().optional().or(z.literal("")),
    twitter: z.string().optional().or(z.literal("")),
    instagram: z.string().optional().or(z.literal("")),
    linkedin: z.string().optional().or(z.literal("")),
    youtube: z.string().optional().or(z.literal(""))
  })
});

type FormData = z.infer<typeof siteConfigSchema>;

export default function SitePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconPublicId, setFaviconPublicId] = useState<string | null>(null);
  const [logoPublicId, setLogoPublicId] = useState<string | null>(null);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const { 
    control, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(siteConfigSchema),
    defaultValues: {
      siteName: "",
      siteDescription: "",
      contactEmail: "",
      contactPhone: "",
      contactAddress: "",
      socialLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: ""
      }
    }
  });

  // Charger les données initiales
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/admin/site-config");
        
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        
        const data = await response.json();
        
        // Mettre à jour les valeurs du formulaire
        reset({
          siteName: data.siteName,
          siteDescription: data.siteDescription,
          contactEmail: data.contactEmail || "",
          contactPhone: data.contactPhone || "",
          contactAddress: data.contactAddress || "",
          socialLinks: {
            facebook: data.socialLinks?.facebook || "",
            twitter: data.socialLinks?.twitter || "",
            instagram: data.socialLinks?.instagram || "", 
            linkedin: data.socialLinks?.linkedin || "",
            youtube: data.socialLinks?.youtube || ""
          }
        });
        
        // Mettre à jour les aperçus d'images
        setFaviconPreview(data.faviconUrl);
        setLogoPreview(data.logoUrl);
      } catch (error) {
        console.error("Erreur:", error);
        setMessage({
          type: "error",
          text: "Erreur lors du chargement des données"
        });
      }
    };
    
    fetchConfig();
  }, [reset]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde");
      }
      
      setMessage({
        type: "success",
        text: "Configuration enregistrée avec succès"
      });
    } catch (error) {
      console.error("Erreur:", error);
      setMessage({
        type: "error",
        text: "Erreur lors de l'enregistrement"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "favicon" | "logo"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Valider le type de fichier
    const validTypes = type === "favicon" 
      ? ["image/x-icon", "image/png", "image/jpeg", "image/svg+xml"] 
      : ["image/png", "image/jpeg", "image/jpg"];
      
    if (!validTypes.includes(file.type)) {
      setMessage({
        type: "error",
        text: `Format d'image non supporté. Utilisez ${
          type === "favicon" ? ".ico, .png, .jpg ou .svg" : ".png, .jpg ou .jpeg"
        }`
      });
      return;
    }

    // Créer un aperçu
    const reader = new FileReader();
    reader.onload = () => {
      if (type === "favicon") {
        setFaviconPreview(reader.result as string);
        setFaviconFile(file);
      } else {
        setLogoPreview(reader.result as string);
        setLogoFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (type: "favicon" | "logo") => {
    const file = type === "favicon" ? faviconFile : logoFile;
    if (!file) return;

    try {
      type === "favicon" ? setUploadingFavicon(true) : setUploadingLogo(true);
      setMessage(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      
      // Ajouter l'ID public précédent pour la suppression de l'ancienne image
      if (type === "favicon" && faviconPublicId) {
        formData.append("previousPublicId", faviconPublicId);
      } else if (type === "logo" && logoPublicId) {
        formData.append("previousPublicId", logoPublicId);
      }

      const response = await fetch("/api/admin/site-config", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur lors du téléchargement du ${type === "favicon" ? "favicon" : "logo"}`);
      }

      const data = await response.json();
      
      // Mettre à jour l'ID public pour les prochains téléchargements
      if (type === "favicon") {
        setFaviconPublicId(data.publicId);
        setFaviconFile(null);
      } else {
        setLogoPublicId(data.publicId);
        setLogoFile(null);
      }

      setMessage({
        type: "success",
        text: data.message
      });
    } catch (error) {
      console.error("Erreur:", error);
      setMessage({
        type: "error",
        text: `Erreur lors du téléchargement du ${type === "favicon" ? "favicon" : "logo"}`
      });
    } finally {
      type === "favicon" ? setUploadingFavicon(false) : setUploadingLogo(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Paramètres du site</h1>

      {message && (
        <div className={`p-4 mb-6 rounded-md ${
          message.type === "success" ? "bg-green-50" : "bg-red-50"
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {message.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${
                message.type === "success" ? "text-green-800" : "text-red-800"
              }`}>
                {message.text}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Favicon et logo
        </h2>
        <p className="text-gray-600 mb-6">
          Téléchargez le favicon (icône d&apos;onglet) et le logo de votre site web.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Favicon Upload */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Favicon</h3>
            <p className="text-sm text-gray-500 mb-4">
              Format recommandé: ICO, PNG, SVG (256x256px)
            </p>
            
            <div className="flex items-center mb-4">
              <div className="mr-4 bg-gray-100 p-4 rounded-md">
                {faviconPreview ? (
                  <div className="relative h-10 w-10">
                    <Image
                      src={faviconPreview}
                      alt="Favicon Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-md">
                    <span className="text-gray-400 text-xs">Aucun</span>
                  </div>
                )}
              </div>
              
              <div>
                <div className="relative">
                  <input
                    type="file"
                    id="favicon"
                    className="sr-only"
                    accept=".ico,.png,.jpg,.jpeg,.svg"
                    onChange={(e) => handleImageChange(e, "favicon")}
                  />
                  <label
                    htmlFor="favicon"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choisir un fichier
                  </label>
                </div>
                {faviconFile && (
                  <p className="mt-2 text-sm text-gray-500">
                    {faviconFile.name} ({Math.round(faviconFile.size / 1024)} KB)
                  </p>
                )}
              </div>
            </div>
            
            {faviconFile && (
              <button
                type="button"
                onClick={() => uploadImage("favicon")}
                disabled={uploadingFavicon}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:opacity-50"
              >
                {uploadingFavicon ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2 border-white"></div>
                    Téléchargement...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Télécharger le favicon
                  </>
                )}
              </button>
            )}
          </div>

          {/* Logo Upload */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Logo</h3>
            <p className="text-sm text-gray-500 mb-4">
              Format recommandé: PNG, JPG (512x512px)
            </p>
            
            <div className="flex items-center mb-4">
              <div className="mr-4 bg-gray-100 p-4 rounded-md">
                {logoPreview ? (
                  <div className="relative h-16 w-16">
                    <Image
                      src={logoPreview}
                      alt="Logo Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 flex items-center justify-center bg-gray-200 rounded-md">
                    <span className="text-gray-400 text-xs">Aucun</span>
                  </div>
                )}
              </div>
              
              <div>
                <div className="relative">
                  <input
                    type="file"
                    id="logo"
                    className="sr-only"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => handleImageChange(e, "logo")}
                  />
                  <label
                    htmlFor="logo"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choisir un fichier
                  </label>
                </div>
                {logoFile && (
                  <p className="mt-2 text-sm text-gray-500">
                    {logoFile.name} ({Math.round(logoFile.size / 1024)} KB)
                  </p>
                )}
              </div>
            </div>
            
            {logoFile && (
              <button
                type="button"
                onClick={() => uploadImage("logo")}
                disabled={uploadingLogo}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:opacity-50"
              >
                {uploadingLogo ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2 border-white"></div>
                    Téléchargement...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Télécharger le logo
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Informations du site
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Nom du site */}
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
              Nom du site
            </label>
            <Controller
              name="siteName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="siteName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              )}
            />
            {errors.siteName && (
              <p className="mt-1 text-sm text-red-600">{errors.siteName.message}</p>
            )}
          </div>
          
          {/* Description du site */}
          <div>
            <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
              Description du site
            </label>
            <Controller
              name="siteDescription"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="siteDescription"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              )}
            />
            {errors.siteDescription && (
              <p className="mt-1 text-sm text-red-600">{errors.siteDescription.message}</p>
            )}
          </div>
          
          {/* Informations de contact */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">Informations de contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                  Email de contact
                </label>
                <Controller
                  name="contactEmail"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      id="contactEmail"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                  )}
                />
                {errors.contactEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <Controller
                  name="contactPhone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="contactPhone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                  )}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="contactAddress" className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <Controller
                name="contactAddress"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="contactAddress"
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                )}
              />
            </div>
          </div>
          
          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">Réseaux sociaux</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                  Facebook
                </label>
                <Controller
                  name="socialLinks.facebook"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="facebook"
                      placeholder="https://facebook.com/..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                  )}
                />
              </div>
              
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                  Twitter
                </label>
                <Controller
                  name="socialLinks.twitter"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="twitter"
                      placeholder="https://twitter.com/..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                  )}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <Controller
                  name="socialLinks.instagram"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="instagram"
                      placeholder="https://instagram.com/..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                  )}
                />
              </div>
              
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <Controller
                  name="socialLinks.linkedin"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="linkedin"
                      placeholder="https://linkedin.com/..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                  )}
                />
              </div>
              
              <div>
                <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">
                  YouTube
                </label>
                <Controller
                  name="socialLinks.youtube"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="youtube"
                      placeholder="https://youtube.com/..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:opacity-50 ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2 border-white"></div>
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Enregistrer les modifications
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 