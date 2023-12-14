// types/speaking.d.ts
import { Document, Types } from 'mongoose';

export interface ISpeaking extends Document {
  author: Types.ObjectId;
  title: string;
  date: Date;
  websiteUrl?: string;
  videoUrl?: string;
  createdAt?: Date;
}