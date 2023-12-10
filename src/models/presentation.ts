// models/presentation.ts
import mongoose, { Schema } from 'mongoose';
import { IPresentation } from '../types/presentation';

const presentationSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: String,
  presentationUrl: String,
  topics: [String],
  engagements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Speaking' }],
});

export const Presentation = mongoose.models.Presentation || mongoose.model<IPresentation>('Presentation', presentationSchema);