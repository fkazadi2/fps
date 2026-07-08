"use client";

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, GripVertical, ChevronRight, ChevronDown, Layout, FileText, Menu as MenuIcon } from 'lucide-react';

export default function NavigationEditor() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header');

    useEffect(() => {
        fetchNavigation();
    }, []);

    const fetchNavigation = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/navigation');
            if (!res.ok) throw new Error('Erreur lors du chargement de la navigation');
            const json = await res.json();

            if (json.success) {
                setData(json.data);
            } else {
                throw new Error(json.error || 'Erreur inconnue');
            }
        } catch (err) {
            setError('Impossible de charger la configuration des menus');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const saveNavigation = async () => {
        try {
            setSaving(true);
            setError(null);
            setSuccessMsg(null);

            const res = await fetch('/api/navigation', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const json = await res.json();

            if (res.ok && json.success) {
                setSuccessMsg('Menu mis à jour avec succès !');
                setTimeout(() => setSuccessMsg(null), 3000);
            } else {
                throw new Error(json.error || 'Erreur lors de la sauvegarde');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur sauvegarde');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Menus</h1>
                    <p className="text-gray-600 mt-1">Configurez la navigation du site (En-tête et Pied de page)</p>
                </div>

                <button
                    onClick={saveNavigation}
                    disabled={saving}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${saving
                            ? 'bg-blue-400 text-white cursor-wait'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                >
                    {saving ? (
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                        <Save className="h-4 w-4 mr-2" />
                    )}
                    {saving ? 'Enregistrement...' : 'Sauvegarder'}
                </button>
            </div>

            {successMsg && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-sm">
                    <p className="text-sm text-green-700">{successMsg}</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('header')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'header'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Layout className="w-4 h-4" />
                            Menu Principal (Header)
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('footer')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'footer'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Pied de Page (Footer)
                        </div>
                    </button>
                </nav>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                {activeTab === 'header' ? (
                    <HeaderEditor
                        items={data.header || []}
                        onChange={(newHeader) => setData({ ...data, header: newHeader })}
                    />
                ) : (
                    <FooterEditor
                        footerData={data.footer || {}}
                        onChange={(newFooter) => setData({ ...data, footer: newFooter })}
                    />
                )}
            </div>
        </div>
    );
}

// Sous-composant pour éditer le Header
function HeaderEditor({ items, onChange }: { items: any[], onChange: (items: any[]) => void }) {

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange(newItems);
    };

    const addItem = () => {
        onChange([...items, { label: 'Nouveau lien', path: '/' }]);
    };

    const removeItem = (index: number) => {
        if (confirm('Supprimer cet élément ?')) {
            const newItems = [...items];
            newItems.splice(index, 1);
            onChange(newItems);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <h3 className="text-lg font-medium text-gray-900">Liens du Header</h3>
                <button onClick={addItem} className="text-sm flex items-center text-blue-600 hover:text-blue-800">
                    <Plus className="w-4 h-4 mr-1" /> Ajouter un lien
                </button>
            </div>

            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Libellé</label>
                                <input
                                    type="text"
                                    value={item.label}
                                    onChange={(e) => updateItem(index, 'label', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Lien (Path)</label>
                                <input
                                    type="text"
                                    value={item.path}
                                    onChange={(e) => updateItem(index, 'path', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id={`highlight-${index}`}
                                    checked={item.highlight || false}
                                    onChange={(e) => updateItem(index, 'highlight', e.target.checked)}
                                />
                                <label htmlFor={`highlight-${index}`} className="text-sm text-gray-700">Mettre en évidence (Bouton)</label>
                            </div>
                            <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 p-1">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Gestion simplifiée des enfants (niveau 2) */}
                        <div className="mt-3 pl-4 border-l-2 border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-semibold text-gray-500">Sous-menus</span>
                                <button
                                    onClick={() => {
                                        const currentChildren = item.children || [];
                                        updateItem(index, 'children', [...currentChildren, { label: 'Sous-lien', path: '/' }]);
                                    }}
                                    className="text-xs text-blue-600 flex items-center"
                                >
                                    <Plus className="w-3 h-3 mr-1" /> Ajouter
                                </button>
                            </div>

                            {(item.children || []).map((child: any, childIndex: number) => (
                                <div key={childIndex} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={child.label}
                                        placeholder="Label"
                                        className="flex-1 px-2 py-1 border rounded text-sm"
                                        onChange={(e) => {
                                            const newChildren = [...item.children];
                                            newChildren[childIndex] = { ...child, label: e.target.value };
                                            updateItem(index, 'children', newChildren);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={child.path}
                                        placeholder="/path"
                                        className="flex-1 px-2 py-1 border rounded text-sm"
                                        onChange={(e) => {
                                            const newChildren = [...item.children];
                                            newChildren[childIndex] = { ...child, path: e.target.value };
                                            updateItem(index, 'children', newChildren);
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            const newChildren = [...item.children];
                                            newChildren.splice(childIndex, 1);
                                            updateItem(index, 'children', newChildren);
                                        }}
                                        className="text-red-400 hover:text-red-600"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {items.length === 0 && <p className="text-center text-gray-500 italic">Aucun lien dans le menu</p>}
            </div>
        </div>
    );
}

// Sous-composant pour éditer le Footer
function FooterEditor({ footerData, onChange }: { footerData: any, onChange: (data: any) => void }) {
    // Note: Footer structure is { quickLinks: [], contacts: {}, sections: [] }
    // Pour simplifier, on édite juste quickLinks et info contact de base

    return (
        <div className="space-y-6">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
                🚧 L'éditeur complet de Footer est en cours de développement. Seule la structure brute est affichée pour l'instant.
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Configuration JSON (Avancé)</label>
                <textarea
                    value={JSON.stringify(footerData, null, 2)}
                    onChange={(e) => {
                        try {
                            onChange(JSON.parse(e.target.value));
                        } catch (e) {
                            // Invalid JSON, ignore or show error state
                        }
                    }}
                    rows={15}
                    className="w-full font-mono text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    )
}
