/**
 * API Service
 * Backend API ile iletişim
 */

import axios from 'axios';
import { INote, ICreateNoteInput, IUpdateNoteInput, ApiResponse } from '../types/note.types';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const noteApi = {
  /**
   * Tüm notları getirir
   */
  getAllNotes: async (includeArchived: boolean = false): Promise<INote[]> => {
    const response = await apiClient.get<ApiResponse<INote[]>>(
      `/notes?includeArchived=${includeArchived}`
    );
    return response.data.data;
  },

  /**
   * ID'ye göre not getirir
   */
  getNoteById: async (id: string): Promise<INote> => {
    const response = await apiClient.get<ApiResponse<INote>>(`/notes/${id}`);
    return response.data.data;
  },

  /**
   * Yeni not oluşturur
   */
  createNote: async (noteData: ICreateNoteInput): Promise<INote> => {
    const response = await apiClient.post<ApiResponse<INote>>('/notes', noteData);
    return response.data.data;
  },

  /**
   * Notu günceller
   */
  updateNote: async (id: string, updateData: IUpdateNoteInput): Promise<INote> => {
    const response = await apiClient.put<ApiResponse<INote>>(`/notes/${id}`, updateData);
    return response.data.data;
  },

  /**
   * Notu siler
   */
  deleteNote: async (id: string): Promise<void> => {
    await apiClient.delete(`/notes/${id}`);
  },

  /**
   * Notu arşivler/arşivden çıkarır
   */
  toggleArchiveNote: async (id: string, isArchived: boolean): Promise<INote> => {
    const response = await apiClient.patch<ApiResponse<INote>>(`/notes/${id}/archive`, {
      isArchived,
    });
    return response.data.data;
  },

  /**
   * Notu sabitler/sabitlikten çıkarır
   */
  togglePinNote: async (id: string, isPinned: boolean): Promise<INote> => {
    const response = await apiClient.patch<ApiResponse<INote>>(`/notes/${id}/pin`, {
      isPinned,
    });
    return response.data.data;
  },

  /**
   * Notlarda arama yapar
   */
  searchNotes: async (searchTerm: string): Promise<INote[]> => {
    const response = await apiClient.get<ApiResponse<INote[]>>(
      `/notes/search?q=${encodeURIComponent(searchTerm)}`
    );
    return response.data.data;
  },

  /**
   * Etikete göre notları getirir
   */
  getNotesByTag: async (tag: string): Promise<INote[]> => {
    const response = await apiClient.get<ApiResponse<INote[]>>(`/notes/tag/${tag}`);
    return response.data.data;
  },
};
