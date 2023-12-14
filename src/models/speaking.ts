// models/speaking.ts
import mongoose, { Schema } from 'mongoose';
import { ISpeaking } from '../types/speaking';

const speakingSchema: Schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Boss', required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  websiteUrl: String,
  videoUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export const Speaking = mongoose.models.Speaking || mongoose.model<ISpeaking>('Speaking', speakingSchema);