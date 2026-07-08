import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import {
  CSS
} from '@dnd-kit/utilities';
import { 
  Type, 
  Image, 
  Grid3X3, 
  BarChart3, 
  Star, 
  MessageSquare,
  ArrowRight,
  Plus,
  Settings,
  Trash2,
  GripVertical,
  Copy,
  Eye
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export interface BlockData {
  id: string;
  type: BlockType;
  data: Record<string, unknown>;
  settings?: {
    className?: string;
    background?: string;
    padding?: string;
    margin?: string;
  };
}

export type BlockType = 'hero' | 'content' | 'gallery' | 'stats' | 'cta' | 'testimonials' | 'divider';

interface BlockTemplate {
  type: BlockType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultData: Record<string, unknown>;
  category: 'content' | 'media' | 'layout' | 'interactive';
}

interface BlockEditorProps {
  blocks: BlockData[];
  onChange: (blocks: BlockData[]) => void;
  onBlockSelect?: (block: BlockData | null) => void;
  selectedBlockId?: string | null;
}

const blockTemplates: BlockTemplate[] = [
  {
    type: 'hero',
    name: 'Section Hero',
    description: 'Grande section d\'en-tête avec titre et boutons',
    icon: Image,
    category: 'layout',
    defaultData: {
      title: 'Titre principal',
      subtitle: 'Sous-titre descriptif',
      backgroundImage: '',
      buttons: [
        { text: 'Action principale', url: '#', style: 'primary' },
        { text: 'Action secondaire', url: '#', style: 'secondary' }
      ]
    }
  },
  {
    type: 'content',
    name: 'Contenu texte',
    description: 'Section de texte riche avec formatage',
    icon: Type,
    category: 'content',
    defaultData: {
      title: 'Titre de section',
      content: '<p>Votre contenu va ici...</p>',
      layout: 'single-column'
    }
  },
  {
    type: 'gallery',
    name: 'Galerie d\'images',
    description: 'Grille d\'images avec lightbox',
    icon: Grid3X3,
    category: 'media',
    defaultData: {
      title: 'Galerie',
      images: [],
      columns: 3,
      showCaptions: true
    }
  },
  {
    type: 'stats',
    name: 'Statistiques',
    description: 'Affichage de chiffres clés',
    icon: BarChart3,
    category: 'interactive',
    defaultData: {
      title: 'Nos chiffres',
      stats: [
        { label: 'Bénéficiaires', value: '1000+', icon: 'users' },
        { label: 'Provinces', value: '26', icon: 'map' },
        { label: 'Programmes', value: '12', icon: 'briefcase' }
      ]
    }
  },
  {
    type: 'cta',
    name: 'Appel à l\'action',
    description: 'Section d\'appel à l\'action avec bouton',
    icon: ArrowRight,
    category: 'interactive',
    defaultData: {
      title: 'Prêt à commencer ?',
      description: 'Rejoignez-nous dans notre mission pour améliorer la santé publique.',
      buttonText: 'Contactez-nous',
      buttonUrl: '/contact',
      backgroundColor: '#0066CC'
    }
  },
  {
    type: 'testimonials',
    name: 'Témoignages',
    description: 'Carrousel de témoignages clients',
    icon: Star,
    category: 'content',
    defaultData: {
      title: 'Ce qu\'ils disent de nous',
      testimonials: [
        {
          quote: 'Le FPS a transformé l\'accès aux soins dans notre région.',
          author: 'Dr. Marie Kabila',
          role: 'Directrice médicale',
          avatar: ''
        }
      ]
    }
  }
];

// Composant pour un bloc sortable
interface SortableBlockProps {
  block: BlockData;
  isSelected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

function SortableBlock({ block, isSelected, onSelect, onDuplicate, onDelete, onEdit }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const template = blockTemplates.find(t => t.type === block.type);
  const IconComponent = template?.icon || MessageSquare;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative border rounded-lg p-4 bg-white cursor-pointer transition-all
        ${isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'}
        ${isDragging ? 'z-50' : ''}
      `}
      onClick={onSelect}
    >
      {/* Handle de déplacement */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-2 p-1 rounded cursor-grab hover:bg-gray-100 text-gray-400 hover:text-gray-600"
        title="Glisser pour réorganiser"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Contenu du bloc */}
      <div className="ml-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <IconComponent className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">{template?.name}</span>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              title="Modifier"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              title="Dupliquer"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 rounded hover:bg-red-100 text-red-500 hover:text-red-700"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Aperçu du contenu */}
        <div className="text-sm text-gray-600">
          {template?.description}
          {!!block.data.title && (
            <div className="mt-1 font-medium text-gray-800">
              &quot;{String(block.data.title)}&quot;
            </div>
          )}
        </div>
      </div>

      {/* Indicateur de sélection */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
      )}
    </div>
  );
}

// Composant principal
export default function BlockEditor({ blocks, onChange, onBlockSelect, selectedBlockId }: BlockEditorProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [showPalette, setShowPalette] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over?.id);

      const newBlocks = arrayMove(blocks, oldIndex, newIndex);
      onChange(newBlocks);
    }

    setActiveId(null);
  };

  const addBlock = (template: BlockTemplate) => {
    const newBlock: BlockData = {
      id: uuidv4(),
      type: template.type,
      data: { ...template.defaultData }
    };

    onChange([...blocks, newBlock]);
    setShowPalette(false);
    
    // Sélectionner automatiquement le nouveau bloc
    if (onBlockSelect) {
      onBlockSelect(newBlock);
    }
  };

  const duplicateBlock = (blockId: string) => {
    const blockIndex = blocks.findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;

    const originalBlock = blocks[blockIndex];
    const duplicatedBlock: BlockData = {
      ...originalBlock,
      id: uuidv4(),
      data: { ...originalBlock.data }
    };

    const newBlocks = [...blocks];
    newBlocks.splice(blockIndex + 1, 0, duplicatedBlock);
    onChange(newBlocks);
  };

  const deleteBlock = (blockId: string) => {
    const newBlocks = blocks.filter(b => b.id !== blockId);
    onChange(newBlocks);
    
    // Désélectionner si c'était le bloc sélectionné
    if (selectedBlockId === blockId && onBlockSelect) {
      onBlockSelect(null);
    }
  };

  const selectBlock = (block: BlockData) => {
    if (onBlockSelect) {
      onBlockSelect(selectedBlockId === block.id ? null : block);
    }
  };

  const groupedTemplates = blockTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, BlockTemplate[]>);

  return (
    <div className="flex h-full">
      {/* Palette de blocs */}
      <div className={`transition-all duration-300 bg-gray-50 border-r border-gray-200 ${showPalette ? 'w-80' : 'w-12'}`}>
        <div className="p-2">
          <button
            onClick={() => setShowPalette(!showPalette)}
            className="w-full p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            title={showPalette ? 'Masquer la palette' : 'Afficher la palette'}
          >
            {showPalette ? 'Masquer' : <Plus className="w-5 h-5 mx-auto" />}
          </button>
        </div>

        {showPalette && (
          <div className="p-4 space-y-6 max-h-full overflow-y-auto">
            <h3 className="font-semibold text-gray-900">Ajouter un bloc</h3>
            
            {Object.entries(groupedTemplates).map(([category, templates]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 capitalize">
                  {category === 'content' ? 'Contenu' :
                   category === 'media' ? 'Média' :
                   category === 'layout' ? 'Mise en page' :
                   category === 'interactive' ? 'Interactif' : category}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {templates.map((template) => (
                    <button
                      key={template.type}
                      onClick={() => addBlock(template)}
                      className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <template.icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                        <span className="font-medium text-sm text-gray-900">{template.name}</span>
                      </div>
                      <p className="text-xs text-gray-600">{template.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Zone d'édition */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Éditeur de blocs ({blocks.length} bloc{blocks.length > 1 ? 's' : ''})
            </h2>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Eye className="w-4 h-4" />
              <span>Aperçu</span>
            </button>
          </div>

          {blocks.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <Type className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun bloc</h3>
              <p className="mt-1 text-sm text-gray-500">
                Commencez par ajouter un bloc depuis la palette de gauche.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowPalette(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un bloc
                </button>
              </div>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {blocks.map((block) => (
                    <div key={block.id} className="group">
                      <SortableBlock
                        block={block}
                        isSelected={selectedBlockId === block.id}
                        onSelect={() => selectBlock(block)}
                        onDuplicate={() => duplicateBlock(block.id)}
                        onDelete={() => deleteBlock(block.id)}
                        onEdit={() => selectBlock(block)}
                      />
                    </div>
                  ))}
                </div>
              </SortableContext>

              <DragOverlay>
                {activeId ? (
                  <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-lg opacity-90">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Déplacement en cours...</span>
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
} 