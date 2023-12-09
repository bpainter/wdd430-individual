import mongoose from 'mongoose';

const meanderingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  updateDate: Date,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  body: { type: String, required: true },
  category: [String],
  image: String,
});

export const Meandering = mongoose.models.Meandering || mongoose.model('Meandering', meanderingSchema);