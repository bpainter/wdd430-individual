// types/presentation.d.ts
import { Document, Types } from 'mongoose';

export interface IPresentation extends Document {
  [key: string]: any;
  author: Types.ObjectId;
  speaking: Types.ObjectId;
  title: string;
  description?: string;
  presentationUrl?: string;
  topics?: string[];
  createdAt: Date;
}