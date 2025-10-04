/**
 * App Component
 * Ana uygulama bileşeni
 */

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNotes } from './hooks/useNotes';
import { NoteCard } from './components/NoteCard';
import { NoteForm } from './components/NoteForm';
import { INote } from './types/note.types';
import { Plus, Search, Archive, ArchiveRestore, StickyNote, Loader2 } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function NotesApp() {
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<INote | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const {
    notes,
    isLoading,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
    isCreating,
    isUpdating,
  } = useNotes(showArchived);

  const handleCreateNote = (data: any) => {
    createNote(data, {
      onSuccess: () => {
        setShowForm(false);
      },
    });
  };

  const handleUpdateNote = (data: any) => {
    updateNote(data, {
      onSuccess: () => {
        setShowForm(false);
        setEditingNote(null);
      },
    });
  };

  const handleEdit = (note: INote) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      deleteNote(id);
    }
  };

  // Filtreleme
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <StickyNote size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">NotesApp</h1>
                <p className="text-sm text-gray-500">Düşüncelerinizi organize edin</p>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus size={20} />
              Yeni Not
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Notlarda ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                showArchived
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showArchived ? <ArchiveRestore size={20} /> : <Archive size={20} />}
              {showArchived ? 'Aktif Notları Göster' : 'Arşivlenmiş Notları Göster'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* İstatistikler */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-sm">Toplam Not</p>
            <p className="text-3xl font-bold text-gray-800">{notes.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-sm">Sabitlenmiş</p>
            <p className="text-3xl font-bold text-blue-600">
              {notes.filter((n) => n.isPinned).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-sm">Arşivlenmiş</p>
            <p className="text-3xl font-bold text-yellow-600">
              {notes.filter((n) => n.isArchived).length}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="animate-spin text-blue-500 mb-4" />
            <p className="text-gray-500">Notlar yükleniyor...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-gray-100 rounded-full p-8 mb-4">
              <StickyNote size={64} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm
                ? 'Sonuç bulunamadı'
                : showArchived
                ? 'Henüz arşivlenmiş not yok'
                : 'Henüz not eklenmemiş'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? 'Farklı bir arama terimi deneyin'
                : 'Yeni bir not ekleyerek başlayın!'}
            </p>
            {!searchTerm && !showArchived && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                <Plus size={20} />
                İlk Notunuzu Ekleyin
              </button>
            )}
          </div>
        )}

        {/* Notes Grid */}
        {!isLoading && filteredNotes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onTogglePin={(id, isPinned) => togglePin({ id, isPinned })}
                onToggleArchive={(id, isArchived) => toggleArchive({ id, isArchived })}
              />
            ))}
          </div>
        )}
      </main>

      {/* Note Form Modal */}
      {showForm && (
        <NoteForm
          onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
          onCancel={handleCancel}
          editingNote={editingNote}
          isLoading={isCreating || isUpdating}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotesApp />
    </QueryClientProvider>
  );
}

export default App;