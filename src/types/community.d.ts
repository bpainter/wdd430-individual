// types/community.d.ts
import { Document } from 'mongoose';

export interface ICommunityEvent extends Document {
  title: string;
  date: Date;
  description?: string;
  eventUrl?: string;
  organization?: string;
}