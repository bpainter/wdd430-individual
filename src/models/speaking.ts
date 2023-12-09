import mongoose from 'mongoose';

const speakingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  websiteUrl: String,
  videoUrl: String,
  presentation: { type: mongoose.Schema.Types.ObjectId, ref: 'Presentation' },
});

export const Speaking = mongoose.models.Speaking || mongoose.model('Speaking', speakingSchema);