import mongoose from 'mongoose';

const presentationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  presentationUrl: String,
  topics: [String],
  engagements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Speaking' }],
});

export const Presentation = mongoose.models.Presentation || mongoose.model('Presentation', presentationSchema);