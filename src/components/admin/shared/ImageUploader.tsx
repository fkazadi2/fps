"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

export default function ImageUploader({
    value,
    onChange,
    label = "Image",
    className = ""
}: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation basique
        if (!file.type.startsWith('image/')) {
            setError("Le fichier doit être une image (JPG, PNG, WEBP)");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
            setError("L'image est trop volumineuse (max 5MB)");
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/admin/media/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de l'upload");
            }

            onChange(data.url);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleRemove = () => {
        onChange('');
    };

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

            <div className="flex items-start gap-4">
                {/* Preview Zone */}
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center">
                    {value ? (
                        <>
                            <Image
                                src={value}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-gray-600 hover:text-red-600 hover:bg-white transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </>
                    ) : (
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}

                    {uploading && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex-1">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id={`image-upload-${label}`}
                    />

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor={`image-upload-${label}`}
                            className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer w-fit ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            {value ? "Changer l'image" : "Télécharger une image"}
                        </label>

                        {/* Fallback URL Input (Masqué par défaut derrière un details) */}
                        <details className="group">
                            <summary className="text-xs text-gray-400 cursor-pointer hover:text-blue-600 mt-2 list-none select-none flex items-center gap-1 transition-colors">
                                <LinkIcon className="w-3 h-3" />
                                <span>Utiliser un lien externe</span>
                            </summary>
                            <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                <input
                                    type="text"
                                    value={value || ''}
                                    onChange={(e) => onChange(e.target.value)}
                                    placeholder="https://exemple.com/image.jpg"
                                    className="text-xs border border-gray-300 rounded-md px-3 py-2 w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400"
                                    disabled={uploading}
                                />
                            </div>
                        </details>
                    </div>

                    {error && (
                        <p className="text-xs text-red-600 mt-2">{error}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG, GIF ou WEBP (Max 5MB)
                    </p>
                </div>
            </div>
        </div>
    );
}
