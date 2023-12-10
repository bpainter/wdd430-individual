// models/speaking.ts
import mongoose, { Schema } from 'mongoose';
import { ISpeaking } from '../types/speaking';

const speakingSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  websiteUrl: String,
  videoUrl: String,
  presentation: { type: mongoose.Schema.Types.ObjectId, ref: 'Presentation' },
});

export const Speaking = mongoose.models.Speaking || mongoose.model<ISpeaking>('Speaking', speakingSchema);