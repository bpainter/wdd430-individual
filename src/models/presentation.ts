// models/presentation.ts
import mongoose, { Schema } from 'mongoose';
import { IPresentation } from '../types/presentation';

const presentationSchema: Schema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Boss', required: true },
  speaking: { type: mongoose.Schema.Types.ObjectId, ref: 'Speaking', required: true },
  title: { type: String, required: true },
  description: String,
  presentationUrl: String,
  topics: [String],
  createdAt: { type: Date, default: Date.now },
});

export const Presentation = mongoose.models.Presentation || mongoose.model<IPresentation>('Presentation', presentationSchema);