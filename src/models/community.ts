import mongoose from 'mongoose';

const communityEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
  eventUrl: String,
  organization: String,
});

export const CommunityEvent = mongoose.models.CommunityEvent || mongoose.model('CommunityEvent', communityEventSchema);