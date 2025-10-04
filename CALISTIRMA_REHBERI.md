# 🚀 NotesApp - Çalıştırma Rehberi

## ✅ Sorun Çözüldü!

Tailwind CSS v4 ile v3 uyumsuzluğu düzeltildi. Artık uygulama sorunsuz çalışıyor!

---

## 🔧 Yapılan Düzeltmeler

1. ✅ Tailwind CSS v4 → v3.4.17 (stabil versiyon)
2. ✅ PostCSS yapılandırması güncellendi
3. ✅ Tüm paketler uyumlu hale getirildi

---

## 🎯 Uygulamayı Çalıştırma

### ⚡ Hızlı Başlangıç (Önerilen)

Uygulamanın çalışması için **3 şey** aynı anda aktif olmalı:

#### 1️⃣ MongoDB'yi Başlatın
```bash
# Windows'ta MongoDB servisi çalışıyor olmalı
# Veya MongoDB Compass'ı açın
```

#### 2️⃣ Backend'i Başlatın (Terminal 1)
```bash
# Ana dizinde
npm run dev
```
✅ Backend çalışacak: `http://localhost:5000`

#### 3️⃣ Frontend'i Başlatın (Terminal 2)
```bash
# Ana dizinde
cd client
npm run dev
```
✅ Frontend çalışacak: `http://localhost:3000`

---

## 🌐 Tarayıcıda Açın

Tarayıcınızda şu adresi açın:
```
http://localhost:3000
```

---

## 📊 Sistem Mimarisi

```
┌─────────────────────────────────────────┐
│         Kullanıcı (Tarayıcı)            │
│         http://localhost:3000           │
└──────────────────┬──────────────────────┘
                   │
                   │ React UI
                   │
        ┌──────────▼──────────┐
        │     Frontend        │
        │  React + TypeScript │
        │    Port: 3000       │
        └──────────┬──────────┘
                   │
                   │ HTTP Requests (axios)
                   │ /api/notes
                   │
        ┌──────────▼──────────┐
        │      Backend        │
        │  Express + MongoDB  │
        │    Port: 5000       │
        └──────────┬──────────┘
                   │
                   │ Mongoose
                   │
        ┌──────────▼──────────┐
        │      MongoDB        │
        │    Port: 27017      │
        │   (Veritabanı)      │
        └─────────────────────┘
```

---

## 🎨 Kullanım

1. **Yeni Not Ekle** - Sağ üst köşedeki butona tıklayın
2. **Not Düzenle** - Notun üzerine gelin ve "Düzenle" butonuna tıklayın
3. **Not Sabitle** - Pin ikonuna tıklayın
4. **Not Arşivle** - Archive ikonuna tıklayın
5. **Not Ara** - Üst kısımdaki arama kutusunu kullanın
6. **Not Sil** - Çöp kutusu ikonuna tıklayın

---

## ❌ Sorun Giderme

### Frontend Açılmıyor?
1. Backend'in çalıştığından emin olun
2. MongoDB'nin çalıştığından emin olun
3. Port 3000 ve 5000'in başka uygulamalar tarafından kullanılmadığından emin olun

### "Cannot connect to server" Hatası?
- Backend'in çalışıp çalışmadığını kontrol edin
- `http://localhost:5000/api/health` adresini açın (API çalışıyor mu?)

### Notlar Görünmüyor?
- MongoDB'nin çalıştığından emin olun
- Backend terminal'inde hata mesajı var mı kontrol edin
- Tarayıcı konsolunu kontrol edin (F12)

### Port Zaten Kullanımda Hatası?
```bash
# Windows'ta portu kapat
netstat -ano | findstr :3000
taskkill /PID <PID_NUMARASI> /F

# Veya farklı port kullanın
# client/vite.config.ts dosyasında port numarasını değiştirin
```

---

## 🛠️ Development Komutları

### Backend
```bash
npm run dev      # Development mode
npm run build    # Production build
npm start        # Production mode
```

### Frontend
```bash
cd client
npm run dev      # Development mode
npm run build    # Production build
npm run preview  # Production preview
```

---

## 📝 Önemli Notlar

1. ✅ **Backend ve Frontend aynı anda çalışmalı**
2. ✅ **MongoDB çalışıyor olmalı**
3. ✅ **Port 3000 ve 5000 açık olmalı**
4. ⚠️ Backend'i önce başlatın, sonra frontend'i
5. 💡 Değişiklikler otomatik yüklenir (hot reload)

---

## 🎯 Test Senaryosu

1. Her iki sunucuyu başlatın
2. `http://localhost:3000` adresini açın
3. "Yeni Not" butonuna tıklayın
4. Bir not ekleyin
5. Not kartının göründüğünü kontrol edin
6. Notu düzenleyin, sabitleyin, arşivleyin
7. Arama özelliğini test edin

---

## 🎉 Başarılı Kurulum!

Her şey hazır! Artık not uygulamanızı kullanabilirsiniz.

**Sorularınız için**: README.md ve PROJE_YAPISI.md dosyalarına bakın.

---

## 🔗 Faydalı Bağlantılar

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health
- API Docs: API_TEST.md dosyasına bakın
