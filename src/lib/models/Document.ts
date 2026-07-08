import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  category: string;
  fileUrl: string;
  fileSize: string;
  format: string;
  date: string;
  description?: string;
  downloads?: number;
  featured?: boolean;
}

const DocumentSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  fileUrl: { type: String, required: true, unique: true },
  fileSize: { type: String, required: true },
  format: { type: String, default: 'PDF' },
  date: { type: String, required: true },
  description: { type: String },
  downloads: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, {
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
});

// Création du modèle
const DocumentModel = mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);

export default DocumentModel;
