// types/meandering.d.ts
import { Document } from 'mongoose';

export interface IMeandering extends Document {
  [key: string]: any;
  title: string;
  postDate: Date;
  updateDate?: Date;
  status: 'draft' | 'published';
  body: string;
  category?: string[];
  image?: string;
}