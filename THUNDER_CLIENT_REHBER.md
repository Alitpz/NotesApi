# Thunder Client Kullanım Rehberi

## 🚀 Kurulum

1. VS Code'u açın
2. Sol tarafta Extensions ikonuna tıklayın (Ctrl+Shift+X)
3. "Thunder Client" arayın
4. Install butonuna tıklayın
5. Sol tarafta yıldırım ⚡ ikonu çıkacak

---

## 📝 İlk İsteğinizi Yapın

### 1. Thunder Client'i Açın
- Sol tarafta ⚡ (yıldırım) ikonuna tıklayın

### 2. New Request Butonuna Tıklayın
- "New Request" yazısına tıklayın

### 3. GET İsteği Yapın (Notları Listele)

**Ayarlar:**
```
Method: GET (dropdown'dan seçin)
URL: http://localhost:5000/api/notes
```

**Send butonuna tıklayın!**

**Sonuç:**
```json
{
  "success": true,
  "data": [],
  "message": "Notlar başarıyla getirildi"
}
```

---

### 4. POST İsteği Yapın (Yeni Not Oluştur)

**Ayarlar:**
```
Method: POST (dropdown'dan seçin)
URL: http://localhost:5000/api/notes
```

**Body Sekmesine Tıklayın:**
- "JSON" seçeneğini seçin
- Aşağıdaki JSON'u yapıştırın:

```json
{
  "title": "İlk Notum",
  "content": "Backend öğreniyorum!",
  "tags": ["öğrenme", "backend"],
  "color": "#ffeb3b"
}
```

**Send butonuna tıklayın!**

**Sonuç:**
```json
{
  "success": true,
  "data": {
    "_id": "67005a1b2c3d4e5f6a7b8c9d",
    "title": "İlk Notum",
    "content": "Backend öğreniyorum!",
    "tags": ["öğrenme", "backend"],
    "color": "#ffeb3b",
    "isArchived": false,
    "isPinned": false,
    "createdAt": "2025-10-04T19:45:00.000Z",
    "updatedAt": "2025-10-04T19:45:00.000Z"
  },
  "message": "Not başarıyla oluşturuldu"
}
```

🎉 **Tebrikler! İlk notunuzu oluşturdunuz!**

---

### 5. Tekrar GET İsteği Yapın

Şimdi tekrar notları listeleyin:
```
Method: GET
URL: http://localhost:5000/api/notes
```

Bu sefer oluşturduğunuz not listede görünecek! 📋

---

### 6. Tek Bir Notu Getirin

Yukarıdaki yanıtta gelen `_id` değerini kopyalayın (örn: "67005a1b2c3d4e5f6a7b8c9d")

```
Method: GET
URL: http://localhost:5000/api/notes/67005a1b2c3d4e5f6a7b8c9d
```

Sadece o not dönecek! 📄

---

### 7. Notu Güncelleyin

```
Method: PUT
URL: http://localhost:5000/api/notes/67005a1b2c3d4e5f6a7b8c9d
Body (JSON):
```

```json
{
  "title": "Güncellenmiş Not",
  "content": "Backend çok eğlenceli!",
  "tags": ["güncelleme", "öğrenme"]
}
```

Not güncellendi! ✏️

---

### 8. Notu Sabitleyin

```
Method: PATCH
URL: http://localhost:5000/api/notes/67005a1b2c3d4e5f6a7b8c9d/pin
Body (JSON):
```

```json
{
  "isPinned": true
}
```

Not sabitlendi! 📌

---

### 9. Notu Silin

```
Method: DELETE
URL: http://localhost:5000/api/notes/67005a1b2c3d4e5f6a7b8c9d
```

Not silindi! 🗑️

---

## 🎯 Pratik Senaryo

1. **3 not oluşturun** (POST)
2. **Tüm notları listeleyin** (GET)
3. **Birini sabitleyin** (PATCH /pin)
4. **Tekrar listeleyin** - Sabitli not en üstte olacak
5. **Birini güncelleyin** (PUT)
6. **Arama yapın** (GET /search?q=...)
7. **Birini silin** (DELETE)

---

## 💡 İpuçları

- Her istek sonrası Status Code'a bakın:
  - 200 = Başarılı (OK)
  - 201 = Oluşturuldu (Created)
  - 400 = Hatalı istek (Bad Request)
  - 404 = Bulunamadı (Not Found)
  - 500 = Sunucu hatası (Server Error)

- Response Time'a bakın (ne kadar hızlı yanıt verdi)
- Hata aldığınızda mesajı okuyun - ne yanlış gittiğini söyler

---

## 🔥 Hızlı Testler

### Health Check
```
GET http://localhost:5000/api/health
```

### Arama
```
GET http://localhost:5000/api/notes/search?q=backend
```

### Etikete Göre Filtrele
```
GET http://localhost:5000/api/notes/tag/öğrenme
```

### Not Arşivle
```
PATCH http://localhost:5000/api/notes/{id}/archive
Body: { "isArchived": true }
```

---

## ❌ Hata Testleri (Bunları da deneyin!)

### Geçersiz ID
```
GET http://localhost:5000/api/notes/123
→ 400 Bad Request: "Geçersiz ID formatı"
```

### Eksik Veri
```
POST http://localhost:5000/api/notes
Body: { "title": "Sadece başlık" }
→ 400 Bad Request: "Not içeriği zorunludur"
```

### Olmayan Not
```
GET http://localhost:5000/api/notes/507f1f77bcf86cd799439011
→ 404 Not Found: "Not bulunamadı"
```

Bu hatalar da çalışıyor demektir! ✅
