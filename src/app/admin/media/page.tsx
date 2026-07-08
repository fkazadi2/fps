"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Upload, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Download,
  Trash2,
  Eye,
  Copy,
  FolderPlus,
  Image as ImageIcon,
  File,
  Calendar,
  User,
  HardDrive
} from "lucide-react";

interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  folder?: string;
  alt?: string;
  caption?: string;
}

interface MediaFolder {
  id: string;
  name: string;
  createdAt: string;
  filesCount: number;
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [folders, setFolders] = useState<MediaFolder[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Charger les médias depuis localStorage
  useEffect(() => {
    const loadMedia = () => {
      try {
        const storedMedia = localStorage.getItem('fps_cms_media');
        const storedFolders = localStorage.getItem('fps_cms_media_folders');
        
        const files: MediaFile[] = storedMedia ? JSON.parse(storedMedia) : [];
        const foldersData: MediaFolder[] = storedFolders ? JSON.parse(storedFolders) : [
          {
            id: 'images',
            name: 'Images',
            createdAt: new Date().toISOString(),
            filesCount: 0
          },
          {
            id: 'documents',
            name: 'Documents',
            createdAt: new Date().toISOString(),
            filesCount: 0
          }
        ];
        
        setMediaFiles(files);
        setFolders(foldersData);
      } catch (error) {
        console.error('Erreur lors du chargement des médias:', error);
      }
    };

    loadMedia();
  }, []);

  // Gestion de l'upload de fichiers
  const handleFileUpload = useCallback(async (files: FileList) => {
    setUploading(true);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/admin/media/upload', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          const newFile: MediaFile = {
            ...result.media,
            folder: selectedFolder !== 'all' ? selectedFolder : 'images',
            alt: '',
            caption: ''
          };
          
          return newFile;
        } else {
          throw new Error(result.error);
        }
      });
      
      const uploadedFiles = await Promise.all(uploadPromises);
      const updatedFiles = [...mediaFiles, ...uploadedFiles];
      
      setMediaFiles(updatedFiles);
      localStorage.setItem('fps_cms_media', JSON.stringify(updatedFiles));
      
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      alert('Erreur lors de l\'upload des fichiers');
    } finally {
      setUploading(false);
    }
  }, [mediaFiles, selectedFolder]);

  // Filtrer les fichiers
  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || file.folder === selectedFolder;
    
    return matchesSearch && matchesFolder;
  });

  // Gestion du drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  // Sélection des fichiers
  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const selectAllFiles = () => {
    setSelectedFiles(
      selectedFiles.length === filteredFiles.length 
        ? [] 
        : filteredFiles.map(f => f.id)
    );
  };

  // Supprimer des fichiers
  const deleteSelectedFiles = () => {
    if (window.confirm(`Supprimer ${selectedFiles.length} fichier(s) ?`)) {
      const updatedFiles = mediaFiles.filter(f => !selectedFiles.includes(f.id));
      setMediaFiles(updatedFiles);
      localStorage.setItem('fps_cms_media', JSON.stringify(updatedFiles));
      setSelectedFiles([]);
    }
  };

  // Créer un dossier
  const createFolder = () => {
    if (!newFolderName.trim()) return;
    
    const newFolder: MediaFolder = {
      id: newFolderName.toLowerCase().replace(/\s+/g, '-'),
      name: newFolderName,
      createdAt: new Date().toISOString(),
      filesCount: 0
    };
    
    const updatedFolders = [...folders, newFolder];
    setFolders(updatedFolders);
    localStorage.setItem('fps_cms_media_folders', JSON.stringify(updatedFolders));
    
    setNewFolderName("");
    setShowNewFolderDialog(false);
  };

  // Copier l'URL
  const copyFileUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copiée dans le presse-papiers');
  };

  // Formater la taille de fichier
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Obtenir l'icône du type de fichier
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5" />;
    }
    return <File className="w-5 h-5" />;
  };

  const totalSize = mediaFiles.reduce((acc, file) => acc + file.size, 0);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Médiathèque</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos images et documents
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button
            onClick={() => setShowNewFolderDialog(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            Nouveau dossier
          </button>
          
          <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Téléchargement...' : 'Télécharger'}
            <input
              type="file"
              multiple
              accept="image/*,application/pdf,.doc,.docx"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <File className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total fichiers</p>
              <p className="text-lg font-semibold text-gray-900">{mediaFiles.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <ImageIcon className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Images</p>
              <p className="text-lg font-semibold text-gray-900">
                {mediaFiles.filter(f => f.type.startsWith('image/')).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <HardDrive className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Espace utilisé</p>
              <p className="text-lg font-semibold text-gray-900">{formatFileSize(totalSize)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <FolderPlus className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Dossiers</p>
              <p className="text-lg font-semibold text-gray-900">{folders.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre d'outils */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            {/* Recherche */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Rechercher un fichier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtre par dossier */}
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les dossiers</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>{folder.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sélection multiple */}
            {selectedFiles.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {selectedFiles.length} sélectionné(s)
                </span>
                <button
                  onClick={deleteSelectedFiles}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Supprimer
                </button>
              </div>
            )}

            {/* Modes d'affichage */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Zone d'upload par drag & drop */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Glissez-déposez vos fichiers ici</h3>
        <p className="mt-1 text-sm text-gray-500">
          ou cliquez sur "Télécharger" pour parcourir vos fichiers
        </p>
      </div>

      {/* Liste des fichiers */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun fichier trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Aucun fichier ne correspond à votre recherche" : "Téléchargez vos premiers fichiers"}
            </p>
          </div>
        ) : (
          <>
            {/* En-tête avec sélection */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                  onChange={selectAllFiles}
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Sélectionner tout ({filteredFiles.length})
                </label>
              </div>
            </div>

            {/* Affichage en grille */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
                {filteredFiles.map((file) => (
                  <div key={file.id} className="group relative">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={file.url}
                          alt={file.alt || file.originalName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => copyFileUrl(file.url)}
                          className="p-2 bg-white rounded-full hover:bg-gray-100"
                          title="Copier l'URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white rounded-full hover:bg-gray-100"
                          title="Voir en grand"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    
                    {/* Checkbox */}
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => toggleFileSelection(file.id)}
                      />
                    </div>
                    
                    {/* Infos */}
                    <div className="mt-2">
                      <p className="text-xs font-medium text-gray-900 truncate" title={file.originalName}>
                        {file.originalName}
                      </p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Affichage en liste */
              <div className="divide-y divide-gray-200">
                {filteredFiles.map((file) => (
                  <div key={file.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => toggleFileSelection(file.id)}
                        />
                        
                        <div className="flex-shrink-0">
                          {file.type.startsWith('image/') ? (
                            <img
                              src={file.url}
                              alt={file.alt || file.originalName}
                              className="h-12 w-12 object-cover rounded"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                              {getFileIcon(file.type)}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.originalName}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span>{formatFileSize(file.size)}</span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(file.uploadedAt).toLocaleDateString('fr-FR')}
                            </span>
                            <span>{file.type}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyFileUrl(file.url)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Copier l'URL"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                          title="Télécharger"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                          title="Voir"
                        >
                          <Eye className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Dialog de création de dossier */}
      {showNewFolderDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Créer un nouveau dossier</h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Nom du dossier"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && createFolder()}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowNewFolderDialog(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={createFolder}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                disabled={!newFolderName.trim()}
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 