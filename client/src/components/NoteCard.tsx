/**
 * NoteCard Component
 * Tek bir notu gösteren card bileşeni
 */

import { INote } from '../types/note.types';
import {
  Pin,
  Archive,
  Trash2,
  Edit,
  ArchiveRestore,
  Calendar,
  Tag,
} from 'lucide-react';

interface NoteCardProps {
  note: INote;
  onEdit: (note: INote) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string, isPinned: boolean) => void;
  onToggleArchive: (id: string, isArchived: boolean) => void;
}

export const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onTogglePin,
  onToggleArchive,
}: NoteCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className="relative rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group"
      style={{ backgroundColor: note.color || '#ffffff' }}
    >
      {/* Pin Badge */}
      {note.isPinned && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg">
          <Pin size={16} fill="white" />
        </div>
      )}

      {/* Başlık */}
      <h3 className="text-xl font-bold mb-3 text-gray-800 break-words">
        {note.title}
      </h3>

      {/* İçerik */}
      <p className="text-gray-700 mb-4 whitespace-pre-wrap break-words line-clamp-4">
        {note.content}
      </p>

      {/* Etiketler */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Tarih */}
      <div className="flex items-center text-xs text-gray-500 mb-4">
        <Calendar size={14} className="mr-1" />
        {formatDate(note.createdAt)}
      </div>

      {/* Aksiyon Butonları */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onEdit(note)}
          className="flex items-center gap-1 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors"
          title="Düzenle"
        >
          <Edit size={16} />
          Düzenle
        </button>

        <button
          onClick={() => onTogglePin(note._id, !note.isPinned)}
          className={`flex items-center gap-1 text-sm px-3 py-2 rounded-lg transition-colors ${
            note.isPinned
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={note.isPinned ? 'Sabitlemeyi Kaldır' : 'Sabitle'}
        >
          <Pin size={16} />
        </button>

        <button
          onClick={() => onToggleArchive(note._id, !note.isArchived)}
          className="flex items-center gap-1 text-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-2 rounded-lg transition-colors"
          title={note.isArchived ? 'Arşivden Çıkar' : 'Arşivle'}
        >
          {note.isArchived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
        </button>

        <button
          onClick={() => onDelete(note._id)}
          className="flex items-center gap-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 px-3 py-2 rounded-lg transition-colors"
          title="Sil"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
