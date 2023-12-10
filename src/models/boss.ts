import mongoose, { Schema } from 'mongoose';
import { IBoss } from '../types/boss';

const bossSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
});

const Boss = mongoose.model<IBoss>('Boss', bossSchema);

export default Boss;