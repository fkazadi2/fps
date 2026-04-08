import mongoose, { Schema, Model } from 'mongoose';

/**
 * Interface pour une section de la homepage
 * Permet de gérer de manière flexible toutes les sections éditables
 */
export interface IHomepageSection {
    _id: mongoose.Types.ObjectId;

    // Type de section (pour identifier quelle partie de la homepage)
    sectionType: 'hero_slider' | 'stats' | 'mission' | 'features' | 'csu_progress' | 'partners' | 'testimonials' | 'cta' | 'map';

    // Clé unique pour identifier cette section spécifique
    key: string;  // Ex: 'homepage_hero', 'homepage_stats'

    // Titre de la section (pour l'admin)
    title: string;

    // Contenu JSON flexible - structure dépend du sectionType
    content: Record<string, any>;

    // Visibilité de la section
    active: boolean;

    // Ordre d'affichage (pour réorganiser si besoin)
    displayOrder: number;

    // Métadonnées
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

type HomepageSectionModel = Model<IHomepageSection>;

const HomepageSectionSchema = new Schema<IHomepageSection, HomepageSectionModel>(
    {
        sectionType: {
            type: String,
            required: [true, 'Le type de section est requis'],
            enum: {
                values: ['hero_slider', 'stats', 'mission', 'features', 'csu_progress', 'partners', 'testimonials', 'cta', 'map'],
                message: 'Type de section invalide: {VALUE}'
            },
            index: true
        },
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
        content: {
            type: Schema.Types.Mixed,
            required: [true, 'Le contenu est requis'],
            default: {}
        },
        active: {
            type: Boolean,
            default: true,
            index: true
        },
        displayOrder: {
            type: Number,
            default: 0,
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

// Index composé pour recherche rapide
HomepageSectionSchema.index({ active: 1, displayOrder: 1 });

// Éviter la redéfinition du modèle en développement
export default (mongoose.models.HomepageSection as HomepageSectionModel) ||
    mongoose.model<IHomepageSection, HomepageSectionModel>('HomepageSection', HomepageSectionSchema);

/**
 * Types de contenu par section (pour référence)
 * 
 * hero_slider: {
 *   slides: Array<{
 *     title: string,
 *     description: string,
 *     image: string,
 *     buttonText?: string,
 *     buttonLink?: string,
 *     secondaryButtonText?: string,
 *     secondaryButtonLink?: string
 *   }>,
 *   autoplay: boolean,
 *   duration: number
 * }
 * 
 * stats: {
 *   title: string,
 *   subtitle: string,
 *   values: Array<{
 *     label: string,
 *     value: string,
 *     icon: string,
 *     color: string
 *   }>
 * }
 * 
 * mission: {
 *   title: string,
 *   subtitle: string,
 *   vision: string,
 *   legalFramework: string,
 *   strategicAxes: Array<{
 *     title: string,
 *     description: string,
 *     icon: string
 *   }>
 * }
 * 
 * partners: {
 *   title: string,
 *   subtitle: string,
 *   description: string,
 *   logos: Array<{
 *     name: string,
 *     image: string,
 *     url?: string
 *   }>
 * }
 * 
 * testimonials: {
 *   title: string,
 *   subtitle: string,
 *   autoplay: boolean,
 *   items: Array<{
 *     name: string,
 *     role: string,
 *     content: string,
 *     image?: string
 *   }>
 * }
 * 
 * cta: {
 *   title: string,
 *   description: string,
 *   buttons: Array<{
 *     text: string,
 *     link: string
 *   }>
 * }
 */
