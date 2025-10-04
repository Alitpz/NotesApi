# NotesApi - Proje Yapısı ve Mimari

Bu dokümantasyon, projenin yapısını, kullanılan teknolojileri ve mimari kararları detaylı şekilde açıklar.

## 📁 Proje Klasör Yapısı

```
NotesApi/
├── src/                          # Ana kaynak kod klasörü
│   ├── config/                   # Yapılandırma dosyaları
│   │   ├── database.ts          # MongoDB bağlantı yapılandırması
│   │   └── env.ts               # Environment değişkenleri yönetimi
│   │
│   ├── controllers/              # Controller katmanı (HTTP istekleri)
│   │   └── note.controller.ts   # Not controller'ı
│   │
│   ├── interfaces/               # TypeScript interface tanımlamaları
│   │   └── note.interface.ts    # Not interface'leri
│   │
│   ├── middlewares/              # Express middleware'ler
│   │   ├── errorHandler.ts      # Global hata yakalayıcı
│   │   └── validateRequest.ts   # İstek doğrulama middleware'leri
│   │
│   ├── models/                   # Mongoose modelleri (Veritabanı şemaları)
│   │   └── note.model.ts        # Not modeli
│   │
│   ├── routes/                   # API endpoint tanımlamaları
│   │   ├── index.ts             # Ana route dosyası
│   │   └── note.routes.ts       # Not route'ları
│   │
│   ├── services/                 # İş mantığı (Business Logic)
│   │   └── note.service.ts      # Not servisi
│   │
│   ├── utils/                    # Yardımcı fonksiyonlar
│   │   ├── apiResponse.ts       # API yanıt formatları
│   │   └── asyncHandler.ts      # Async hata yakalayıcı
│   │
│   ├── app.ts                    # Express uygulaması yapılandırması
│   └── server.ts                 # Sunucu giriş noktası
│
├── dist/                         # Derlenmiş JavaScript dosyaları (build sonrası)
├── node_modules/                 # NPM paketleri
├── .env                          # Environment değişkenleri (GIT'e eklenmez)
├── .env.example                  # Environment değişkenleri şablonu
├── .gitignore                    # Git tarafından göz ardı edilecek dosyalar
├── package.json                  # Proje bağımlılıkları ve scriptler
├── tsconfig.json                 # TypeScript yapılandırması
├── README.md                     # Proje açıklaması
└── PROJE_YAPISI.md              # Bu dosya
```

## 🏗️ Mimari Yapı (Layered Architecture)

Proje, **Katmanlı Mimari (Layered Architecture)** prensiplerine göre tasarlanmıştır. Her katman belirli bir sorumluluğa sahiptir:

### 1. **Routes Katmanı** (Yönlendirme)
- **Sorumluluk**: HTTP endpoint'lerini tanımlar
- **Dosyalar**: `src/routes/`
- **Görevler**:
  - URL yollarını belirler (GET /api/notes, POST /api/notes)
  - Middleware'leri bağlar (validation, authentication)
  - İstekleri ilgili controller'a yönlendirir

### 2. **Controllers Katmanı** (Kontrolcüler)
- **Sorumluluk**: HTTP isteklerini işler ve yanıtları döndürür
- **Dosyalar**: `src/controllers/`
- **Görevler**:
  - HTTP request'ten veri alır
  - Service katmanını çağırır
  - HTTP response döndürür
  - Hata yönetimini yapar

### 3. **Services Katmanı** (İş Mantığı)
- **Sorumluluk**: İş mantığını (business logic) barındırır
- **Dosyalar**: `src/services/`
- **Görevler**:
  - İş kurallarını uygular
  - Veritabanı işlemlerini yönetir
  - Veri dönüşümleri yapar
  - Karmaşık operasyonları gerçekleştirir

### 4. **Models Katmanı** (Veri Modelleri)
- **Sorumluluk**: Veritabanı şemalarını tanımlar
- **Dosyalar**: `src/models/`
- **Görevler**:
  - MongoDB şemalarını oluşturur
  - Veri validasyonlarını belirler
  - Index'leri tanımlar
  - Veritabanı ile direkt iletişim kurar

### 5. **Middlewares Katmanı** (Ara Katman)
- **Sorumluluk**: İstekleri işlemeden önce/sonra kontroller yapar
- **Dosyalar**: `src/middlewares/`
- **Görevler**:
  - Veri doğrulama (validation)
  - Hata yakalama (error handling)
  - Authentication/Authorization (ileride eklenecek)
  - Logging

### 6. **Utilities/Helpers**
- **Sorumluluk**: Yeniden kullanılabilir yardımcı fonksiyonlar
- **Dosyalar**: `src/utils/`
- **Görevler**:
  - Ortak fonksiyonlar
  - Formatters
  - Helpers

## 🔄 İstek Akışı (Request Flow)

Bir API isteği şu sırayla işlenir:

```
1. Client (İstemci)
        ↓
2. Routes (Endpoint tanımı)
        ↓
3. Middlewares (Validation, Authentication)
        ↓
4. Controller (HTTP Request/Response işleme)
        ↓
5. Service (İş mantığı)
        ↓
6. Model (Veritabanı işlemleri)
        ↓
7. Database (MongoDB)
        ↓
8. Response (Geriye döner)
```

### Örnek: Not Oluşturma İsteği

```
POST /api/notes
Body: { title: "Başlık", content: "İçerik" }

1. routes/note.routes.ts → POST endpoint'i yakalar
2. middlewares/validateRequest.ts → Veriyi doğrular
3. controllers/note.controller.ts → createNote() çalışır
4. services/note.service.ts → createNote() iş mantığını yürütür
5. models/note.model.ts → MongoDB'ye kaydeder
6. Response → Client'a JSON yanıt döner
```

## 🎯 Temiz Kod Prensipleri

### 1. **Separation of Concerns (Sorumlulukların Ayrılması)**
Her dosya ve fonksiyon tek bir sorumluluğa sahiptir:
- Controllers sadece HTTP işlemlerini yapar
- Services sadece iş mantığını içerir
- Models sadece veri yapısını tanımlar

### 2. **DRY (Don't Repeat Yourself)**
Tekrarlanan kod parçaları yardımcı fonksiyonlara çıkarılmıştır:
- `asyncHandler`: Async hataları yakalar
- `sendSuccess/sendError`: Standart yanıt formatı
- `validateObjectId`: ID doğrulama

### 3. **Single Responsibility Principle**
Her sınıf ve fonksiyon tek bir işi yapar:
- `NoteService.createNote()` → Sadece not oluşturur
- `validateCreateNote()` → Sadece not doğrular

### 4. **Dependency Injection**
Bağımlılıklar dışarıdan enjekte edilir, test edilebilirliği artırır.

## 📊 Kullanılan Teknolojiler

### Backend Framework
- **Express.js**: Web sunucusu ve API geliştirme
- **TypeScript**: Tip güvenliği ve daha iyi developer experience

### Veritabanı
- **MongoDB**: NoSQL veritabanı
- **Mongoose**: MongoDB için ODM (Object Document Mapper)

### Yardımcı Kütüphaneler
- **dotenv**: Environment değişkenleri yönetimi
- **cors**: Cross-Origin Resource Sharing
- **ts-node-dev**: TypeScript development server

## 🔐 Güvenlik Katmanları

1. **Input Validation**: Tüm girdiler doğrulanır
2. **Error Handling**: Hatalar güvenli şekilde yakalanır
3. **Type Safety**: TypeScript ile tip güvenliği
4. **Environment Variables**: Hassas veriler .env'de saklanır

## 🧪 Genişletilebilirlik

Proje yapısı kolayca genişletilebilir:

### Yeni Bir Özellik Eklemek:
1. **Interface oluştur**: `interfaces/feature.interface.ts`
2. **Model oluştur**: `models/feature.model.ts`
3. **Service oluştur**: `services/feature.service.ts`
4. **Controller oluştur**: `controllers/feature.controller.ts`
5. **Routes oluştur**: `routes/feature.routes.ts`
6. **Ana route'a ekle**: `routes/index.ts`

### İleride Eklenebilecek Özellikler:
- ✅ Kullanıcı yetkilendirmesi (Authentication/Authorization)
- ✅ Rate limiting (İstek sınırlama)
- ✅ Logging sistemi
- ✅ Unit/Integration testler
- ✅ API dokümantasyonu (Swagger)
- ✅ Önbellekleme (Redis)
- ✅ Dosya yükleme

## 📝 Öğrenme Hedefleri

Bu proje ile öğrenilecek konular:

1. ✅ **REST API** tasarımı ve implementasyonu
2. ✅ **TypeScript** ile backend geliştirme
3. ✅ **MongoDB** ve Mongoose kullanımı
4. ✅ **Express.js** middleware yapısı
5. ✅ **Katmanlı mimari** prensipleri
6. ✅ **Error handling** ve validation
7. ✅ **Temiz kod** yazımı
8. ✅ **Asenkron programlama** (async/await)
9. ✅ **Environment** yönetimi
10. ✅ **API güvenliği** temelleri

## 🚀 Sonraki Adımlar

1. MongoDB'yi kurun ve başlatın
2. `.env` dosyasını yapılandırın
3. `npm run dev` ile uygulamayı başlatın
4. Postman/Thunder Client ile API'yi test edin
5. Yeni özellikler ekleyin ve öğrenmeye devam edin!

