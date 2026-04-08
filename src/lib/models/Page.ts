import mongoose, { Schema, Model } from 'mongoose';

export interface IPage {
    _id: mongoose.Types.ObjectId;
    slug: string;
    title: string;
    content: Record<string, any>;
    metaTitle?: string;
    metaDescription?: string;
    published: boolean;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

type PageModel = Model<IPage>;

const PageSchema = new Schema<IPage, PageModel>(
    {
        slug: {
            type: String,
            required: [true, 'Le slug est requis'],
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        title: {
            type: String,
            required: [true, 'Le titre est requis'],
            trim: true
        },
        content: {
            type: Schema.Types.Mixed,
            required: [true, 'Le contenu est requis']
        },
        metaTitle: {
            type: String,
            trim: true,
            maxlength: [60, 'Le meta title ne doit pas dépasser 60 caractères']
        },
        metaDescription: {
            type: String,
            trim: true,
            maxlength: [160, 'La meta description ne doit pas dépasser 160 caractères']
        },
        published: {
            type: Boolean,
            default: false,
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

// Index composé pour recherche efficace
PageSchema.index({ published: 1, createdAt: -1 });

// Éviter la redéfinition du modèle en développement
export default (mongoose.models.Page as PageModel) ||
    mongoose.model<IPage, PageModel>('Page', PageSchema);
