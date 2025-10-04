/**
 * Note Types
 * Backend ile uyumlu tip tanımlamaları
 */

export interface INote {
  _id: string;
  title: string;
  content: string;
  tags?: string[];
  isArchived: boolean;
  isPinned: boolean;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateNoteInput {
  title: string;
  content: string;
  tags?: string[];
  color?: string;
}

export interface IUpdateNoteInput {
  title?: string;
  content?: string;
  tags?: string[];
  isArchived?: boolean;
  isPinned?: boolean;
  color?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

