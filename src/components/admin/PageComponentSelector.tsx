import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Image, 
  MessageSquare, 
  BarChart3, 
  Star, 
  PlusCircle, 
  X,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Types pour les composants de page
export type ComponentType = 'text' | 'gallery' | 'cta' | 'stats' | 'testimonials';

export interface PageComponent {
  id: string;
  type: ComponentType;
  data: Record<string, any>;
}

interface PageComponentSelectorProps {
  components: PageComponent[];
  onChange: (components: PageComponent[]) => void;
}

// Configuration des différents types de composants disponibles
const componentTypes = [
  { 
    id: 'text', 
    label: 'Section de texte', 
    icon: <MessageSquare size={16} />,
    defaultData: { 
      title: 'Nouvelle section',
      content: '<p>Contenu de la section...</p>',
      columns: 1
    } 
  },
  { 
    id: 'gallery', 
    label: 'Galerie d\'images', 
    icon: <Image size={16} />,
    defaultData: { 
      title: 'Galerie d\'images',
      images: []
    } 
  },
  { 
    id: 'cta', 
    label: 'Appel à l\'action', 
    icon: <PlusCircle size={16} />,
    defaultData: { 
      title: 'Appel à l\'action',
      text: 'Description de l\'appel à l\'action...',
      buttonText: 'En savoir plus',
      buttonUrl: '#'
    } 
  },
  { 
    id: 'stats', 
    label: 'Statistiques', 
    icon: <BarChart3 size={16} />,
    defaultData: { 
      title: 'Nos chiffres clés',
      stats: [
        { label: 'Bénéficiaires', value: '1000+' },
        { label: 'Provinces', value: '26' },
        { label: 'Programmes', value: '12' }
      ]
    } 
  },
  { 
    id: 'testimonials', 
    label: 'Témoignages', 
    icon: <Star size={16} />,
    defaultData: { 
      title: 'Témoignages',
      testimonials: [
        { name: 'Nom du témoin', role: 'Fonction', content: 'Contenu du témoignage...' }
      ]
    } 
  }
];

const PageComponentSelector: React.FC<PageComponentSelectorProps> = ({ components, onChange }) => {
  const [showSelector, setShowSelector] = useState(false);
  const [editingComponentId, setEditingComponentId] = useState<string | null>(null);

  // Ajouter un nouveau composant
  const handleAddComponent = (type: ComponentType) => {
    const componentType = componentTypes.find(ct => ct.id === type);
    if (!componentType) return;

    const newComponent: PageComponent = {
      id: uuidv4(),
      type,
      data: { ...componentType.defaultData }
    };

    onChange([...components, newComponent]);
    setShowSelector(false);
    setEditingComponentId(newComponent.id);
  };

  // Supprimer un composant
  const handleRemoveComponent = (id: string) => {
    onChange(components.filter(c => c.id !== id));
    if (editingComponentId === id) {
      setEditingComponentId(null);
    }
  };

  // Déplacer un composant vers le haut
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const newComponents = [...components];
    const temp = newComponents[index];
    newComponents[index] = newComponents[index - 1];
    newComponents[index - 1] = temp;
    onChange(newComponents);
  };

  // Déplacer un composant vers le bas
  const handleMoveDown = (index: number) => {
    if (index >= components.length - 1) return;
    const newComponents = [...components];
    const temp = newComponents[index];
    newComponents[index] = newComponents[index + 1];
    newComponents[index + 1] = temp;
    onChange(newComponents);
  };

  // Mettre à jour les données d'un composant
  const handleComponentDataChange = (id: string, data: Record<string, any>) => {
    onChange(components.map(c => c.id === id ? { ...c, data } : c));
  };

  return (
    <div className="space-y-4">
      {/* Liste des composants ajoutés */}
      {components.length > 0 && (
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-medium text-gray-700">Composants ajoutés</h4>
          <div className="space-y-2">
            {components.map((component, index) => {
              const componentType = componentTypes.find(ct => ct.id === component.type);
              return (
                <div 
                  key={component.id} 
                  className={`border rounded-md p-3 ${editingComponentId === component.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
                        {componentType?.icon}
                      </span>
                      <span className="font-medium text-sm">{componentType?.label}</span>
                      {component.data.title && (
                        <span className="text-sm text-gray-500">: {component.data.title}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button 
                        type="button"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className={`p-1 rounded-full ${index === 0 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="Déplacer vers le haut"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === components.length - 1}
                        className={`p-1 rounded-full ${index === components.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="Déplacer vers le bas"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => setEditingComponentId(editingComponentId === component.id ? null : component.id)}
                        className="p-1 rounded-full text-blue-500 hover:bg-blue-50"
                        title="Modifier"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleRemoveComponent(component.id)}
                        className="p-1 rounded-full text-red-500 hover:bg-red-50"
                        title="Supprimer"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Interface d'édition du composant */}
                  {editingComponentId === component.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-sm font-medium mb-2">Paramètres du composant</div>
                      <div className="space-y-3">
                        {component.type === 'text' && (
                          <>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Titre
                              </label>
                              <input
                                type="text"
                                className="block w-full rounded-md shadow-sm sm:text-sm p-2 border border-gray-300"
                                value={component.data.title || ''}
                                onChange={(e) => handleComponentDataChange(component.id, {
                                  ...component.data,
                                  title: e.target.value
                                })}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Nombre de colonnes
                              </label>
                              <select
                                className="block w-full rounded-md shadow-sm sm:text-sm p-2 border border-gray-300"
                                value={component.data.columns || 1}
                                onChange={(e) => handleComponentDataChange(component.id, {
                                  ...component.data,
                                  columns: parseInt(e.target.value)
                                })}
                              >
                                <option value={1}>1 colonne</option>
                                <option value={2}>2 colonnes</option>
                                <option value={3}>3 colonnes</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Contenu
                              </label>
                              <textarea
                                rows={4}
                                className="block w-full rounded-md shadow-sm sm:text-sm p-2 border border-gray-300"
                                value={component.data.content || ''}
                                onChange={(e) => handleComponentDataChange(component.id, {
                                  ...component.data,
                                  content: e.target.value
                                })}
                              ></textarea>
                              <p className="mt-1 text-xs text-gray-500">
                                HTML simple supporté
                              </p>
                            </div>
                          </>
                        )}
                        
                        {component.type === 'cta' && (
                          <>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Titre
                              </label>
                              <input
                                type="text"
                                className="block w-full rounded-md shadow-sm sm:text-sm p-2 border border-gray-300"
                                value={component.data.title || ''}
                                onChange={(e) => handleComponentDataChange(component.id, {
                                  ...component.data,
                                  title: e.target.value
                                })}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Texte
                              </label>
                              <textarea
                                rows={2}
                                className="block w-full rounded-md shadow-sm sm:text-sm p-2 border border-gray-300"
                                value={component.data.text || ''}
                                onChange={(e) => handleComponentDataChange(component.id, {
                                  ...component.data,
                                  text: e.target.value
                                })}
                              ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Texte du bouton
                                </label>
                                <input
                                  type="text"
                                  className="block w-full rounded-md shadow-sm sm:text-sm p-2 border border-gray-300"
                                  value={component.data.buttonText || ''}
                                  onChange={(e) => handleComponentDataChange(component.id, {
                                    ...component.data,
                                    buttonText: e.target.value
                                  })}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  URL du bouton
                                </label>
                                <input
                                  type="text"
                                  className="block w-full rounded-md shadow-sm sm:text-sm p-2 border border-gray-300"
                                  value={component.data.buttonUrl || ''}
                                  onChange={(e) => handleComponentDataChange(component.id, {
                                    ...component.data,
                                    buttonUrl: e.target.value
                                  })}
                                />
                              </div>
                            </div>
                          </>
                        )}
                        
                        {/* Autres types de composants à implémenter */}
                        {(component.type === 'gallery' || component.type === 'stats' || component.type === 'testimonials') && (
                          <div className="p-3 bg-yellow-50 text-yellow-700 rounded-md">
                            Les options d'édition pour ce type de composant seront disponibles prochainement.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Bouton pour ajouter un composant */}
      {showSelector ? (
        <div className="border rounded-md p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-medium text-gray-900">Ajouter un composant</h4>
            <button
              type="button"
              onClick={() => setShowSelector(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {componentTypes.map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleAddComponent(type.id as ComponentType)}
                className="flex flex-col items-center justify-center p-3 border rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full mb-2">
                  {type.icon}
                </div>
                <span className="text-xs font-medium text-gray-700">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowSelector(true)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Ajouter un composant
        </button>
      )}
    </div>
  );
};

export default PageComponentSelector; 