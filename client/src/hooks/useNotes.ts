/**
 * useNotes Hook
 * Notlar için React Query hooks
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { noteApi } from '../services/api';
import { ICreateNoteInput, IUpdateNoteInput } from '../types/note.types';

export const useNotes = (includeArchived: boolean = false) => {
  const queryClient = useQueryClient();

  // Tüm notları getir
  const { data: notes = [], isLoading, error, refetch } = useQuery({
    queryKey: ['notes', includeArchived],
    queryFn: () => noteApi.getAllNotes(includeArchived),
  });

  // Yeni not oluştur
  const createNoteMutation = useMutation({
    mutationFn: (noteData: ICreateNoteInput) => noteApi.createNote(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  // Not güncelle
  const updateNoteMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateNoteInput }) =>
      noteApi.updateNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  // Not sil
  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => noteApi.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  // Notu arşivle/arşivden çıkar
  const toggleArchiveMutation = useMutation({
    mutationFn: ({ id, isArchived }: { id: string; isArchived: boolean }) =>
      noteApi.toggleArchiveNote(id, isArchived),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  // Notu sabitle/sabitlikten çıkar
  const togglePinMutation = useMutation({
    mutationFn: ({ id, isPinned }: { id: string; isPinned: boolean }) =>
      noteApi.togglePinNote(id, isPinned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return {
    notes,
    isLoading,
    error,
    refetch,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    toggleArchive: toggleArchiveMutation.mutate,
    togglePin: togglePinMutation.mutate,
    isCreating: createNoteMutation.isPending,
    isUpdating: updateNoteMutation.isPending,
    isDeleting: deleteNoteMutation.isPending,
  };
};

