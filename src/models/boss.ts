
import mongoose, { Schema, Document } from 'mongoose';

interface IBoss extends Document {
  username: string;
  password: string;
  name: string;
  avatar: string;
}

const bossSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
});

const Boss = mongoose.model<IBoss>('Boss', bossSchema);

export default Boss;
