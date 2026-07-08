"use client";

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditor {
  dom: {
    addStyle: (css: string) => void;
  };
  execCommand: (command: string, ui?: boolean, value?: string) => void;
  insertContent: (content: string) => void;
  ui: {
    registry: {
      addButton: (name: string, config: object) => void;
    };
  };
}

interface BlobInfo {
  blob: () => Blob;
  filename: () => string;
}

interface AdvancedRichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  height?: number;
  toolbar?: string;
  plugins?: string;
}

export default function AdvancedRichEditor({
  value,
  onChange,
  placeholder = "Commencez à taper votre contenu...",
  className = "",
  height = 400,
  toolbar,
  plugins
}: AdvancedRichEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const defaultPlugins = [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
    'template', 'codesample', 'hr', 'pagebreak', 'nonbreaking', 'toc',
    'imagetools', 'textpattern', 'noneditable', 'quickbars', 'accordion'
  ];

  const defaultToolbar = [
    'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | removeformat',
    'alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | link image media table',
    'blockquote codesample hr | fullscreen preview code | help'
  ].join(' | ');

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  const handleInit = () => {
    // Personnalisation après l'initialisation de l'éditeur
    if (editorRef.current) {
      // Ajouter des styles personnalisés si nécessaire
      const editor = editorRef.current;

      // Configurer les styles pour correspondre au site FPS
      editor.dom.addStyle(`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #374151;
        }
        h1, h2, h3, h4, h5, h6 {
          color: var(--primary, #0066CC);
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .fps-highlight {
          background-color: #FEF3C7;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
        }
        .fps-callout {
          background-color: #EFF6FF;
          border-left: 4px solid var(--primary, #0066CC);
          padding: 1rem;
          margin: 1rem 0;
        }
      `);
    }
  };

  const editorConfig = {
    height,
    menubar: 'edit view insert format tools table help',
    plugins: plugins || defaultPlugins,
    toolbar: toolbar || defaultToolbar,
    toolbar_mode: 'sliding',
    content_style: `
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        font-size: 14px; 
        line-height: 1.6;
        max-width: 100%;
        margin: 1rem;
        overflow-x: hidden;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
      blockquote {
        border-left: 4px solid #ccc;
        margin-left: 0;
        padding-left: 1rem;
        font-style: italic;
        color: #666;
      }
      code {
        background-color: #f4f4f4;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
      }
      pre {
        background-color: #f4f4f4;
        padding: 1rem;
        border-radius: 6px;
        overflow-x: auto;
      }
    `,
    placeholder,
    language: 'fr_FR',
    directionality: 'ltr',
    browser_spellcheck: true,
    contextmenu: 'link image table',

    // Configuration des images
    image_advtab: true,
    image_caption: true,
    image_title: true,
    automatic_uploads: true,
    file_picker_types: 'image',
    images_upload_url: '/api/admin/media/upload',
    images_upload_handler: (blobInfo: BlobInfo, success: (url: string) => void, failure: (message: string) => void) => {
      // Gérer l'upload d'images
      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(result => {
          if (result.url) {
            success(result.url);
          } else {
            failure('Erreur lors de l\'upload de l\'image');
          }
        })
        .catch(() => {
          failure('Erreur lors de l\'upload de l\'image');
        });
    },

    // Configuration des liens
    link_default_target: '_blank',
    link_assume_external_targets: true,
    link_context_toolbar: true,

    // Configuration des templates
    templates: [
      {
        title: 'Encadré informatif',
        description: 'Un encadré pour mettre en évidence des informations importantes',
        content: '<div class="fps-callout"><h4>Information importante</h4><p>Votre contenu ici...</p></div>'
      },
      {
        title: 'Citation mise en évidence',
        description: 'Une citation avec style FPS',
        content: '<blockquote class="fps-highlight"><p>"Votre citation ici..."</p><cite>— Auteur</cite></blockquote>'
      },
      {
        title: 'Tableau de données',
        description: 'Un tableau prêt à remplir',
        content: `
          <table>
            <thead>
              <tr><th>Colonne 1</th><th>Colonne 2</th><th>Colonne 3</th></tr>
            </thead>
            <tbody>
              <tr><td>Donnée 1</td><td>Donnée 2</td><td>Donnée 3</td></tr>
              <tr><td>Donnée 4</td><td>Donnée 5</td><td>Donnée 6</td></tr>
            </tbody>
          </table>
        `
      }
    ],

    // Configuration de la vérification orthographique
    spellchecker_languages: 'Français=fr',
    spellchecker_rpc_url: 'https://spellchecker.tinymce.com/1/spellcheck',

    // Configuration de la prévisualisation
    preview_styles: 'font-family font-size font-weight font-style text-decoration text-align h1 h2 h3 h4 h5 h6 p div',

    // Configuration de l'aide
    help_tabs: ['shortcuts', 'keyboardnav', 'plugins', 'versions'],

    // Fonctionnalités avancées
    paste_data_images: true,
    paste_as_text: false,
    paste_webkit_styles: 'color font-size',
    smart_paste: true,

    // Configuration du contenu
    entity_encoding: 'raw',
    extended_valid_elements: 'span[class|style],div[class|style],section[class|style],article[class|style]',

    // Formats personnalisés
    formats: {
      'fps-highlight': { inline: 'span', classes: 'fps-highlight' },
      'fps-callout': { block: 'div', classes: 'fps-callout', wrapper: true }
    },

    // Callbacks
    setup: (editor: TinyMCEEditor) => {
      // Ajouter des boutons personnalisés
      editor.ui.registry.addButton('fpsHighlight', {
        text: 'Surligner',
        tooltip: 'Surligner le texte sélectionné',
        onAction: () => {
          editor.execCommand('mceToggleFormat', false, 'fps-highlight');
        }
      });

      editor.ui.registry.addButton('fpsCallout', {
        text: 'Encadré',
        tooltip: 'Insérer un encadré informatif',
        onAction: () => {
          editor.insertContent('<div class="fps-callout"><h4>Information</h4><p>Votre contenu ici...</p></div>');
        }
      });
    }
  };

  return (
    <div className={`advanced-rich-editor ${className}`}>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key"} // Clé API pour enlever le warning en prod
        onInit={(evt, editor) => {
          editorRef.current = editor as TinyMCEEditor;
          handleInit();
        }}
        initialValue={value}
        init={editorConfig}
        onEditorChange={handleEditorChange}
      />

      {/* Styles personnalisés pour l'éditeur */}
      <style jsx global>{`
        .tox-tinymce {
          border: 1px solid #d1d5db !important;
          border-radius: 0.375rem !important;
        }
        
        .tox-toolbar__group {
          border: none !important;
        }
        
        .tox .tox-toolbar {
          background-color: #f9fafb !important;
          border-bottom: 1px solid #e5e7eb !important;
        }
        
        .tox .tox-edit-area {
          padding: 0.5rem !important;
        }
        
        .tox .tox-statusbar {
          background-color: #f9fafb !important;
          border-top: 1px solid #e5e7eb !important;
        }

        /* Styles pour les éléments personnalisés FPS */
        .fps-highlight {
          background-color: #FEF3C7 !important;
          padding: 0.25rem 0.5rem !important;
          border-radius: 0.25rem !important;
        }
        
        .fps-callout {
          background-color: #EFF6FF !important;
          border-left: 4px solid var(--primary, #0066CC) !important;
          padding: 1rem !important;
          margin: 1rem 0 !important;
          border-radius: 0 0.375rem 0.375rem 0 !important;
        }
        
        .fps-callout h4 {
          margin-top: 0 !important;
          color: var(--primary, #0066CC) !important;
        }
      `}</style>
    </div>
  );
}