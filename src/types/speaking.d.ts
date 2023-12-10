// types/speaking.d.ts
import { Document, Types } from 'mongoose';

export interface ISpeaking extends Document {
  title: string;
  date: Date;
  websiteUrl?: string;
  videoUrl?: string;
  presentation?: Types.ObjectId;
}