import { Document } from 'mongoose';

export interface IBoss extends Document {
  username: string;
  password: string;
  name: string;
  avatar: string;
}