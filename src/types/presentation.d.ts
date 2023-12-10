// types/presentation.d.ts
import { Document, Types } from 'mongoose';

export interface IPresentation extends Document {
  title: string;
  description?: string;
  presentationUrl?: string;
  topics?: string[];
  engagements?: Types.ObjectId[];
}