/**
 * NoteForm Component
 * Not ekleme/düzenleme formu
 */

import { useState, useEffect } from 'react';
import { INote, ICreateNoteInput, IUpdateNoteInput } from '../types/note.types';
import { X, Save, Plus } from 'lucide-react';

interface NoteFormProps {
  onSubmit: (data: ICreateNoteInput | { id: string; data: IUpdateNoteInput }) => void;
  onCancel: () => void;
  editingNote?: INote | null;
  isLoading?: boolean;
}

const COLORS = [
  { name: 'Beyaz', value: '#ffffff' },
  { name: 'Sarı', value: '#fef3c7' },
  { name: 'Yeşil', value: '#d1fae5' },
  { name: 'Mavi', value: '#dbeafe' },
  { name: 'Mor', value: '#e9d5ff' },
  { name: 'Pembe', value: '#fce7f3' },
  { name: 'Turuncu', value: '#fed7aa' },
];

export const NoteForm = ({ onSubmit, onCancel, editingNote, isLoading }: NoteFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setTags(editingNote.tags?.join(', ') || '');
      setColor(editingNote.color || '#ffffff');
    }
  }, [editingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    if (editingNote) {
      onSubmit({
        id: editingNote._id,
        data: {
          title,
          content,
          tags: tagsArray,
          color,
        },
      });
    } else {
      onSubmit({
        title,
        content,
        tags: tagsArray,
        color,
      });
    }

    // Formu temizle
    setTitle('');
    setContent('');
    setTags('');
    setColor('#ffffff');
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setTags('');
    setColor('#ffffff');
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingNote ? 'Notu Düzenle' : 'Yeni Not Ekle'}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Başlık */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Başlık *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Not başlığı girin..."
              required
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/100 karakter</p>
          </div>

          {/* İçerik */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              İçerik *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Not içeriğini girin..."
              rows={8}
              required
              maxLength={5000}
            />
            <p className="text-xs text-gray-500 mt-1">{content.length}/5000 karakter</p>
          </div>

          {/* Etiketler */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Etiketler (virgül ile ayırın)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="örnek: yazılım, öğrenme, backend"
            />
          </div>

          {/* Renk Seçimi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Not Rengi
            </label>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                    color === c.value ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingNote ? (
                <>
                  <Save size={20} />
                  {isLoading ? 'Güncelleniyor...' : 'Güncelle'}
                </>
              ) : (
                <>
                  <Plus size={20} />
                  {isLoading ? 'Ekleniyor...' : 'Ekle'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
