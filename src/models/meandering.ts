// models/meandering.ts
import mongoose, { Schema } from 'mongoose';
import { IMeandering } from '../types/meandering';

const meanderingSchema: Schema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Boss', required: true },
  title: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  updateDate: Date,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  body: { type: String, required: true },
  category: [String],
  image: String,
});

export const Meandering = mongoose.models.Meandering || mongoose.model<IMeandering>('Meandering', meanderingSchema);