// types/meandering.d.ts
import { Document } from 'mongoose';

export interface IMeandering extends Document {
  title: string;
  postDate: Date;
  updateDate?: Date;
  status: 'draft' | 'published';
  body: string;
  category?: string[];
  image?: string;
}