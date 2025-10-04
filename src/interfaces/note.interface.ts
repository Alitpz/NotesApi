/**
 * Note Interface
 * Not nesnesi için tip tanımlamaları
 */

import { Document } from 'mongoose';

/**
 * Not için temel veri yapısı
 */
export interface INote {
  title: string;
  content: string;
  tags?: string[];
  isArchived: boolean;
  isPinned: boolean;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Mongoose document ile birleştirilmiş Note interface
 */
export interface INoteDocument extends INote, Document {
  _id: string;
}

/**
 * Not oluşturma için gerekli alanlar
 */
export interface ICreateNoteInput {
  title: string;
  content: string;
  tags?: string[];
  color?: string;
}

/**
 * Not güncelleme için gerekli alanlar
 */
export interface IUpdateNoteInput {
  title?: string;
  content?: string;
  tags?: string[];
  isArchived?: boolean;
  isPinned?: boolean;
  color?: string;
}

