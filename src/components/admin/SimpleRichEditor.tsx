import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Link as LinkIcon,
  Image as ImageIcon,
  Type as Heading
} from 'lucide-react';

interface SimpleRichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SimpleRichEditor: React.FC<SimpleRichEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Entrez votre texte ici...",
  className = ""
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(!value);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || '';
    }
  }, []);

  useEffect(() => {
    setIsPlaceholderVisible(!value);
  }, [value]);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
      setIsPlaceholderVisible(!content.replace(/<[^>]*>/g, '').trim());
    }
  };

  // Fonction qui exécute les commandes de formatage
  const formatText = (command: string) => {
    document.execCommand(command, false);
    if (editorRef.current) {
      editorRef.current.focus();
      handleEditorChange();
    }
  };

  // Fonction qui exécute les commandes avec une valeur
  const formatTextWithValue = (command: string, value: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      handleEditorChange();
    }
  };

  const handleLinkInsert = () => {
    const url = prompt('Entrez l\'URL du lien:');
    if (url) {
      formatTextWithValue('createLink', url);
    }
  };

  const handleImageInsert = () => {
    const url = prompt('Entrez l\'URL de l\'image:');
    if (url) {
      formatTextWithValue('insertImage', url);
    }
  };

  const handleHeading = (level: string) => {
    formatTextWithValue('formatBlock', level);
  };

  return (
    <div className={`border rounded-md relative ${className}`}>
      <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-gray-50">
        <button type="button" onClick={() => formatText('bold')} className="p-1 hover:bg-gray-200 rounded" title="Gras">
          <Bold size={18} />
        </button>
        <button type="button" onClick={() => formatText('italic')} className="p-1 hover:bg-gray-200 rounded" title="Italique">
          <Italic size={18} />
        </button>
        <span className="mx-1 text-gray-300">|</span>
        <button type="button" onClick={() => formatText('insertUnorderedList')} className="p-1 hover:bg-gray-200 rounded" title="Liste à puces">
          <List size={18} />
        </button>
        <button type="button" onClick={() => formatText('insertOrderedList')} className="p-1 hover:bg-gray-200 rounded" title="Liste numérotée">
          <ListOrdered size={18} />
        </button>
        <span className="mx-1 text-gray-300">|</span>
        <button type="button" onClick={() => formatText('justifyLeft')} className="p-1 hover:bg-gray-200 rounded" title="Aligner à gauche">
          <AlignLeft size={18} />
        </button>
        <button type="button" onClick={() => formatText('justifyCenter')} className="p-1 hover:bg-gray-200 rounded" title="Centrer">
          <AlignCenter size={18} />
        </button>
        <button type="button" onClick={() => formatText('justifyRight')} className="p-1 hover:bg-gray-200 rounded" title="Aligner à droite">
          <AlignRight size={18} />
        </button>
        <span className="mx-1 text-gray-300">|</span>
        <button type="button" onClick={handleLinkInsert} className="p-1 hover:bg-gray-200 rounded" title="Insérer un lien">
          <LinkIcon size={18} />
        </button>
        <button type="button" onClick={handleImageInsert} className="p-1 hover:bg-gray-200 rounded" title="Insérer une image">
          <ImageIcon size={18} />
        </button>
        <span className="mx-1 text-gray-300">|</span>
        <div className="relative group inline-block">
          <button type="button" className="p-1 hover:bg-gray-200 rounded flex items-center" title="Titres">
            <Heading size={18} />
          </button>
          <div className="absolute z-10 hidden group-hover:block bg-white border rounded shadow-lg p-2 mt-1">
            <button onClick={() => handleHeading('h1')} className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Titre 1</button>
            <button onClick={() => handleHeading('h2')} className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Titre 2</button>
            <button onClick={() => handleHeading('h3')} className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Titre 3</button>
            <button onClick={() => handleHeading('p')} className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Paragraphe</button>
          </div>
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="p-3 min-h-40 outline-none"
        onInput={handleEditorChange}
        onBlur={handleEditorChange}
        role="textbox"
        aria-multiline="true"
      />
      {isPlaceholderVisible && (
        <div 
          className="absolute pointer-events-none text-gray-400 p-3 top-[2.75rem]"
          aria-hidden="true"
        >
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default SimpleRichEditor; 