# NotesApp Frontend

React + TypeScript + Vite ile geliştirilmiş modern not uygulaması frontend'i.

## 🚀 Teknolojiler

- **React 18** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query (React Query)** - Server state yönetimi
- **Axios** - HTTP client
- **Lucide React** - Modern ikonlar

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev

# Production build
npm run build

# Production önizleme
npm run preview
```

## 🎯 Özellikler

- ✅ Not ekleme, düzenleme, silme
- ✅ Notları sabitleme
- ✅ Notları arşivleme
- ✅ Notlarda arama
- ✅ Renk seçimi
- ✅ Etiket ekleme
- ✅ Responsive tasarım
- ✅ Modern ve kullanıcı dostu arayüz

## 🌐 Backend Bağlantısı

Frontend, `http://localhost:5000` adresinde çalışan backend API'ye Vite proxy üzerinden bağlanır.

Backend'i çalıştırmayı unutmayın:

```bash
cd ..
npm run dev
```

## 📁 Proje Yapısı

```
client/
├── src/
│   ├── components/     # React bileşenleri
│   │   ├── NoteCard.tsx
│   │   └── NoteForm.tsx
│   ├── hooks/          # Custom hooks
│   │   └── useNotes.ts
│   ├── services/       # API servisleri
│   │   └── api.ts
│   ├── types/          # TypeScript tipleri
│   │   └── note.types.ts
│   ├── App.tsx         # Ana component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/
├── index.html
└── package.json
```

## 🎨 UI/UX Özellikleri

- Gradient arka plan
- Hover efektleri
- Smooth transitions
- Responsive grid layout
- Modal formlar
- Loading states
- Empty states
- İstatistik kartları

## 🔗 API Endpoint'leri

Tüm API istekleri `/api` prefix'i ile backend'e yönlendirilir:

- `GET /api/notes` - Tüm notları getir
- `POST /api/notes` - Yeni not oluştur
- `PUT /api/notes/:id` - Not güncelle
- `DELETE /api/notes/:id` - Not sil
- `PATCH /api/notes/:id/pin` - Notu sabitle
- `PATCH /api/notes/:id/archive` - Notu arşivle

## 🚦 Başlatma

1. Backend sunucusunu başlatın (port 5000)
2. Frontend development server'ı başlatın:
   ```bash
   npm run dev
   ```
3. Tarayıcıda `http://localhost:3000` adresine gidin

## 📝 Notlar

- Backend'in `http://localhost:5000` adresinde çalışıyor olması gerekir
- MongoDB bağlantısının aktif olması gerekir
- Modern bir tarayıcı kullanın (Chrome, Firefox, Safari, Edge)

## 🎓 Öğrenme Amaçlı

Bu proje, modern frontend geliştirme pratiklerini öğrenmek için oluşturulmuştur:

- React Hooks
- TypeScript
- State Management (React Query)
- API Integration
- Modern CSS (Tailwind)
- Component Architecture