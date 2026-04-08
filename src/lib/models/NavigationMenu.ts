import mongoose, { Schema, Model } from 'mongoose';

/**
 * Interface pour les éléments de sous-menu
 */
export interface INavigationSubmenuItem {
    name: string;
    href: string;
    order: number;
}

/**
 * Interface pour les éléments de menu principal
 */
export interface INavigationMenuItem {
    name: string;
    href: string;
    order: number;
    submenu: INavigationSubmenuItem[];
}

/**
 * Interface pour le menu de navigation
 * Permet de gérer les menus principal (header) et footer
 */
export interface INavigationMenu {
    _id: mongoose.Types.ObjectId;

    // Identifiant du menu ('main_header', 'footer_primary', etc.)
    key: string;

    // Titre pour l'admin
    title: string;

    // Position/Type du menu
    location: 'header' | 'footer' | 'mobile' | 'sidebar';

    // Items du menu
    items: INavigationMenuItem[];

    // Visibilité
    active: boolean;

    // Métadonnées
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

type NavigationMenuModel = Model<INavigationMenu>;

const NavigationSubmenuItemSchema = new Schema<INavigationSubmenuItem>(
    {
        name: {
            type: String,
            required: [true, 'Le nom est requis'],
            trim: true
        },
        href: {
            type: String,
            required: [true, 'Le lien est requis'],
            trim: true
        },
        order: {
            type: Number,
            default: 0
        }
    },
    { _id: false }
);

const NavigationMenuItemSchema = new Schema<INavigationMenuItem>(
    {
        name: {
            type: String,
            required: [true, 'Le nom est requis'],
            trim: true
        },
        href: {
            type: String,
            required: [true, 'Le lien est requis'],
            trim: true
        },
        order: {
            type: Number,
            default: 0
        },
        submenu: {
            type: [NavigationSubmenuItemSchema],
            default: []
        }
    },
    { _id: false }
);

const NavigationMenuSchema = new Schema<INavigationMenu, NavigationMenuModel>(
    {
        key: {
            type: String,
            required: [true, 'La clé est requise'],
            unique: true,
            trim: true,
            index: true
        },
        title: {
            type: String,
            required: [true, 'Le titre est requis'],
            trim: true
        },
        location: {
            type: String,
            required: [true, 'La position est requise'],
            enum: {
                values: ['header', 'footer', 'mobile', 'sidebar'],
                message: 'Position invalide: {VALUE}'
            },
            index: true
        },
        items: {
            type: [NavigationMenuItemSchema],
            default: []
        },
        active: {
            type: Boolean,
            default: true,
            index: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

// Index pour recherche rapide
NavigationMenuSchema.index({ location: 1, active: 1 });

// Éviter la redéfinition du modèle en développement
export default (mongoose.models.NavigationMenu as NavigationMenuModel) ||
    mongoose.model<INavigationMenu, NavigationMenuModel>('NavigationMenu', NavigationMenuSchema);
