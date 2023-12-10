// models/community.ts
import mongoose, { Schema } from 'mongoose';
import { ICommunityEvent } from '../types/community';

const communityEventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
  eventUrl: String,
  organization: String,
});

export const CommunityEvent = mongoose.models.CommunityEvent || mongoose.model<ICommunityEvent>('CommunityEvent', communityEventSchema);