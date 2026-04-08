"use client";

import React, { useState, createContext, useContext, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications doit être utilisé dans un NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove après la durée spécifiée
    const duration = newNotification.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBackgroundColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTitleColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  const getMessageColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-700';
      case 'error':
        return 'text-red-700';
      case 'warning':
        return 'text-yellow-700';
      case 'info':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      
      {/* Container des notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-4 max-w-sm w-full">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`
              ${getBackgroundColor(notification.type)}
              border rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-in-out
              animate-in slide-in-from-right-full
            `}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              
              <div className="ml-3 flex-1">
                <p className={`text-sm font-medium ${getTitleColor(notification.type)}`}>
                  {notification.title}
                </p>
                {notification.message && (
                  <p className={`mt-1 text-sm ${getMessageColor(notification.type)}`}>
                    {notification.message}
                  </p>
                )}
                
                {notification.action && (
                  <div className="mt-3">
                    <button
                      onClick={notification.action.onClick}
                      className={`
                        text-sm font-medium underline hover:no-underline
                        ${getTitleColor(notification.type)}
                      `}
                    >
                      {notification.action.label}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Hook utilitaire pour les notifications courantes
export const useNotificationHelpers = () => {
  const { addNotification } = useNotifications();

  return {
    notifySuccess: (title: string, message?: string, action?: Notification['action']) => {
      addNotification({ type: 'success', title, message, action });
    },
    
    notifyError: (title: string, message?: string, action?: Notification['action']) => {
      addNotification({ type: 'error', title, message, action, duration: 8000 });
    },
    
    notifyWarning: (title: string, message?: string, action?: Notification['action']) => {
      addNotification({ type: 'warning', title, message, action, duration: 6000 });
    },
    
    notifyInfo: (title: string, message?: string, action?: Notification['action']) => {
      addNotification({ type: 'info', title, message, action });
    },

    notifyPageSaved: (pageTitle: string, isNew = false) => {
      addNotification({
        type: 'success',
        title: isNew ? 'Page créée avec succès' : 'Page mise à jour',
        message: `"${pageTitle}" a été ${isNew ? 'créée' : 'mise à jour'} avec succès`,
        action: {
          label: 'Voir la page',
          onClick: () => {
            // Dans une vraie app, naviguer vers la page
            console.log('Navigation vers la page');
          }
        }
      });
    },

    notifyPreviewGenerated: (previewUrl: string) => {
      addNotification({
        type: 'info',
        title: 'Prévisualisation générée',
        message: 'Une nouvelle fenêtre s\'ouvre avec la prévisualisation',
        action: {
          label: 'Ouvrir à nouveau',
          onClick: () => window.open(previewUrl, '_blank')
        }
      });
    },

    notifyMediaUploaded: (fileCount: number) => {
      addNotification({
        type: 'success',
        title: `${fileCount} fichier${fileCount > 1 ? 's' : ''} téléchargé${fileCount > 1 ? 's' : ''}`,
        message: 'Les fichiers ont été ajoutés à votre médiathèque'
      });
    },

    notifyRevisionSaved: () => {
      addNotification({
        type: 'info',
        title: 'Révision sauvegardée',
        message: 'Une copie de la version précédente a été conservée',
        duration: 3000
      });
    }
  };
}; 