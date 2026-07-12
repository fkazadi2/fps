import mongoose, { Schema, Model } from 'mongoose';

export interface IArticleImage {
    src: string;
    alt?: string;
}

export interface IArticle {
    _id: mongoose.Types.ObjectId;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    images?: IArticleImage[]; // Galerie de photos
    category: string;
    tags?: string[];
    author?: string;          // Auteur / source (ex: "Direction Communication")
    date?: string;            // Date formatée affichable (ex: "28 avril 2025")
    published: boolean;
    publishedAt?: Date;

    // Champs spécifiques pour les événements (category='evenement')
    eventStartDate?: Date;  // Date de début de l'événement
    eventEndDate?: Date;    // Date de fin (pour événements multi-jours)
    eventTime?: string;     // Heure de l'événement (ex: "09:00 - 17:00")
    eventLocation?: string; // Lieu de l'événement (ex: "Hôtel Pullman, Kinshasa")

    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

type ArticleModel = Model<IArticle>;

const ArticleSchema = new Schema<IArticle, ArticleModel>(
    {
        title: {
            type: String,
            required: [true, 'Le titre est requis'],
            trim: true
        },
        slug: {
            type: String,
            required: [true, 'Le slug est requis'],
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        excerpt: {
            type: String,
            required: [true, "L'extrait est requis"],
            trim: true,
            maxlength: [800, "L'extrait ne doit pas dépasser 800 caractères"]
        },
        content: {
            type: String,
            required: [true, 'Le contenu est requis']
        },
        image: {
            type: String,
            required: [true, "L'image est requise"]
        },
        images: {
            type: [{
                src: { type: String, required: true },
                alt: { type: String }
            }],
            default: []
        },
        author: {
            type: String,
            trim: true
        },
        date: {
            type: String,
            trim: true
        },
        category: {
            type: String,
            required: [true, 'La catégorie est requise'],
            trim: true,
            index: true
        },
        tags: {
            type: [String],
            default: []
        },
        published: {
            type: Boolean,
            default: false,
            index: true
        },
        publishedAt: {
            type: Date
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        // Champs événements (optionnels)
        eventStartDate: {
            type: Date,
            required: false
        },
        eventEndDate: {
            type: Date,
            required: false
        },
        eventTime: {
            type: String,
            required: false,
            trim: true
        },
        eventLocation: {
            type: String,
            required: false,
            trim: true
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

// Indexes pour recherche et filtrage
ArticleSchema.index({ published: 1, publishedAt: -1 });
ArticleSchema.index({ category: 1, published: 1 });
ArticleSchema.index({ tags: 1 });

// Mettre à jour publishedAt lors de la publication
ArticleSchema.pre('save', function (next) {
    if (this.isModified('published') && this.published && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});

// Éviter la redéfinition du modèle en développement
export default (mongoose.models.Article as ArticleModel) ||
    mongoose.model<IArticle, ArticleModel>('Article', ArticleSchema);
