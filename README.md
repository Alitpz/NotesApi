# NotesApi - Full Stack Not Uygulaması 📝

Modern bir full-stack not uygulaması. Backend ve Frontend geliştirme pratiklerini öğrenmek için oluşturulmuştur.

## 🎯 Proje Amacı

Backend ve Frontend geliştirmeyi öğrenmek ve bu süreçte kendimizi geliştirmek. Proje boyunca, modern web geliştirme pratiklerini ve teknolojilerini öğreneceğiz.

## 🛠️ Kullanılan Teknolojiler

### Backend
- **TypeScript** - Tip güvenliği
- **Node.js** - Runtime ortamı
- **Express.js** - Web framework
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB ODM

### Frontend
- **React 18** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **TanStack Query** - State management
- **Axios** - HTTP client
- **Lucide React** - İkonlar

## Adım Adım Öğrenme Süreci

1. Proje kurulumu ve yapılandırması.
2. Temel backend yapılarının oluşturulması.
3. API endpoint'lerinin geliştirilmesi.
4. Veritabanı bağlantısının kurulması ve yönetimi.
5. Uygulama testlerinin yapılması.

## Temiz Kod ve Sürdürülebilir Proje Yapısı

Bu projede, temiz kod yazımına ve sürdürülebilir bir proje yapısına önem verilecektir. İyi bir yazılım mimarisi kurarak, kodun okunabilirliğini ve bakımını kolaylaştırmayı hedefliyoruz. Bu kapsamda:

- **Modüler Yapı**: Kodun modüler bir yapıda olması sağlanacak, böylece her bir modül kendi başına çalışabilir ve test edilebilir olacaktır.
- **Kod Standartları**: Belirli kod standartlarına uyulacak ve bu standartlar proje boyunca sürdürülecektir.
- **Dokümantasyon**: Kodun anlaşılabilirliğini artırmak için yeterli dokümantasyon sağlanacaktır.
- **Testler**: Kodun güvenilirliğini sağlamak için birim testleri ve entegrasyon testleri yazılacaktır.

Bu prensipler, projenin uzun vadede sürdürülebilir ve geliştirilebilir olmasını sağlayacaktır.

## 🚀 Kurulum ve Çalıştırma

### Ön Gereksinimler
- Node.js (v20+)
- MongoDB (yerel veya Atlas)
- npm veya yarn

### Backend Kurulumu

1. Ana dizinde backend bağımlılıklarını yükleyin:
   ```bash
   npm install
   ```

2. MongoDB bağlantı bilgilerinizi ayarlayın (`.env` dosyası oluşturun):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/notesapi
   NODE_ENV=development
   ```

3. Backend sunucusunu başlatın:
   ```bash
   npm run dev
   ```
   
   Backend şu adreste çalışacak: `http://localhost:5000`

### Frontend Kurulumu

1. Client dizinine gidin:
   ```bash
   cd client
   ```

2. Frontend bağımlılıklarını yükleyin:
   ```bash
   npm install
   ```

3. Frontend development server'ı başlatın:
   ```bash
   npm run dev
   ```
   
   Frontend şu adreste çalışacak: `http://localhost:3000`

### Hızlı Başlangıç

Terminal 1 - Backend:
```bash
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

## 🎨 Özellikler

- ✅ Not ekleme, düzenleme, silme
- ✅ Notları sabitleme
- ✅ Notları arşivleme
- ✅ Gerçek zamanlı arama
- ✅ Renk seçimi
- ✅ Etiket sistemi
- ✅ Responsive tasarım
- ✅ Modern ve kullanıcı dostu arayüz
- ✅ REST API
- ✅ Type-safe kod (TypeScript)

## 📁 Proje Yapısı

```
NotesApi/
├── src/                    # Backend kaynak kodu
│   ├── config/            # Yapılandırma dosyaları
│   ├── controllers/       # Controller katmanı
│   ├── models/            # MongoDB modelleri
│   ├── routes/            # API route'ları
│   ├── services/          # İş mantığı
│   ├── middlewares/       # Middleware'ler
│   ├── interfaces/        # TypeScript interfaces
│   └── utils/             # Yardımcı fonksiyonlar
│
├── client/                # Frontend kaynak kodu
│   ├── src/
│   │   ├── components/   # React bileşenleri
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API servisleri
│   │   ├── types/        # TypeScript tipleri
│   │   └── App.tsx       # Ana component
│   └── package.json
│
├── package.json
└── README.md
```

## 📚 Dokümantasyon

- [Proje Yapısı](PROJE_YAPISI.md) - Detaylı mimari açıklaması
- [API Test Rehberi](API_TEST.md) - API endpoint testleri
- [Thunder Client Rehberi](THUNDER_CLIENT_REHBER.md) - API test aracı kullanımı
- [Çalıştırma Rehberi](CALISTIRMA_REHBERI.md) - Adım adım kurulum ve sorun giderme
- [Frontend README](client/README.md) - Frontend detayları

## 🖥️ Ekran Görüntüsü

Modern, kullanıcı dostu arayüz ile:
- Gradient arka plan tasarımı
- Hover efektleriyle interaktif not kartları
- Gerçek zamanlı arama ve filtreleme
- Responsive tasarım (mobil, tablet, desktop)
- 7 farklı renk seçeneği
- Etiket sistemi

## 🚦 API Endpoint'leri

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/health` | API sağlık kontrolü |
| GET | `/api/notes` | Tüm notları listele |
| GET | `/api/notes/:id` | Tek not getir |
| GET | `/api/notes/search?q=` | Notlarda ara |
| GET | `/api/notes/tag/:tag` | Etikete göre filtrele |
| POST | `/api/notes` | Yeni not oluştur |
| PUT | `/api/notes/:id` | Not güncelle |
| PATCH | `/api/notes/:id/pin` | Notu sabitle/çöz |
| PATCH | `/api/notes/:id/archive` | Notu arşivle/çıkar |
| DELETE | `/api/notes/:id` | Notu sil |

## 🎓 Öğrenilen Konular

Bu proje ile şu teknolojiler ve kavramlar öğrenildi:

**Backend:**
- REST API tasarımı ve CRUD işlemleri
- Express.js middleware yapısı
- MongoDB & Mongoose ODM
- Katmanlı mimari (Layered Architecture)
- Error handling ve validation
- TypeScript ile tip güvenliği

**Frontend:**
- React Hooks (useState, useEffect, custom hooks)
- TanStack Query (React Query) ile state management
- Axios ile API entegrasyonu
- Tailwind CSS ile modern UI
- TypeScript interfaces ve tip tanımlamaları
- Component-based architecture
- Form handling ve validation
- Responsive design

**Full Stack:**
- Frontend-Backend entegrasyonu
- RESTful API iletişimi
- Vite proxy yapılandırması
- Environment variables yönetimi
- Git versiyon kontrolü

## 🔧 Sorun Giderme

### Port Zaten Kullanımda
```bash
# Windows'ta portu kontrol et
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Portu kapat
taskkill /PID <PID_NUMARASI> /F
```

### MongoDB Bağlantı Hatası
- MongoDB servisinin çalıştığından emin olun
- MongoDB Compass ile bağlantıyı test edin
- `.env` dosyasındaki `MONGODB_URI` değerini kontrol edin

### Frontend Beyaz Ekran
```bash
# Cache'i temizle ve yeniden başlat
cd client
Remove-Item -Recurse -Force node_modules\.vite
npm run dev
```

Detaylı sorun giderme için: [CALISTIRMA_REHBERI.md](CALISTIRMA_REHBERI.md)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje öğrenme amaçlı oluşturulmuştur.

## 👨‍💻 Geliştirici

Projeyi geliştirirken kullanılan teknolojiler ve best practice'ler modern web geliştirme standartlarına uygun olarak seçilmiştir.

---

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!**
