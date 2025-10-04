# NotesApi - API Test Rehberi

## 🌐 Tarayıcıda Test

### 1. Ana Sayfa
```
http://localhost:5000
```
API bilgilerini gösterir.

### 2. Health Check
```
http://localhost:5000/api/health
```
API'nin çalışıp çalışmadığını kontrol eder.

### 3. Tüm Notları Listele
```
http://localhost:5000/api/notes
```
Şu anda boş liste dönecek (henüz not eklenmedi).

---

## 🧪 Postman / Thunder Client ile Test

### 1. Yeni Not Oluştur
**POST** `http://localhost:5000/api/notes`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "İlk Backend Notum",
  "content": "Backend geliştirmeyi öğreniyorum! Bu çok heyecan verici!",
  "tags": ["öğrenme", "backend", "typescript"],
  "color": "#ffeb3b"
}
```

**Beklenen Yanıt (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "İlk Backend Notum",
    "content": "Backend geliştirmeyi öğreniyorum! Bu çok heyecan verici!",
    "tags": ["öğrenme", "backend", "typescript"],
    "color": "#ffeb3b",
    "isArchived": false,
    "isPinned": false,
    "createdAt": "2025-10-04T19:38:33.000Z",
    "updatedAt": "2025-10-04T19:38:33.000Z"
  },
  "message": "Not başarıyla oluşturuldu"
}
```

---

### 2. Tüm Notları Listele
**GET** `http://localhost:5000/api/notes`

**Beklenen Yanıt (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "İlk Backend Notum",
      "content": "Backend geliştirmeyi öğreniyorum!",
      "tags": ["öğrenme", "backend"],
      "isArchived": false,
      "isPinned": false,
      "createdAt": "2025-10-04T19:38:33.000Z"
    }
  ],
  "message": "Notlar başarıyla getirildi"
}
```

---

### 3. Tek Bir Notu Getir
**GET** `http://localhost:5000/api/notes/{id}`

Örnek: `http://localhost:5000/api/notes/507f1f77bcf86cd799439011`

---

### 4. Not Güncelle
**PUT** `http://localhost:5000/api/notes/{id}`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "Güncellenmiş Başlık",
  "content": "Bu not güncellendi!",
  "tags": ["güncelleme", "test"]
}
```

---

### 5. Notu Sabitler
**PATCH** `http://localhost:5000/api/notes/{id}/pin`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "isPinned": true
}
```

---

### 6. Notu Arşivle
**PATCH** `http://localhost:5000/api/notes/{id}/archive`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "isArchived": true
}
```

---

### 7. Not Sil
**DELETE** `http://localhost:5000/api/notes/{id}`

**Beklenen Yanıt (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011"
  },
  "message": "Not başarıyla silindi"
}
```

---

### 8. Notlarda Ara
**GET** `http://localhost:5000/api/notes/search?q=backend`

**Beklenen Yanıt (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "İlk Backend Notum",
      "content": "Backend geliştirmeyi öğreniyorum!"
    }
  ],
  "message": "\"backend\" için 1 sonuç bulundu"
}
```

---

### 9. Etikete Göre Filtrele
**GET** `http://localhost:5000/api/notes/tag/öğrenme`

---

## 🔥 Hızlı Test Senaryosu

1. **Yeni not oluştur** (POST /api/notes)
2. **Tüm notları listele** (GET /api/notes) - Oluşturduğun notu göreceksin
3. **Notu sabitle** (PATCH /api/notes/{id}/pin)
4. **Tekrar listele** - Sabitlenmiş not en üstte olacak
5. **Notu güncelle** (PUT /api/notes/{id})
6. **Notlarda ara** (GET /api/notes/search?q=...)
7. **Notu sil** (DELETE /api/notes/{id})

---

## ⚠️ Hata Durumları

### Geçersiz ID
**GET** `http://localhost:5000/api/notes/123`

**Yanıt (400 Bad Request):**
```json
{
  "success": false,
  "message": "Geçersiz ID formatı"
}
```

### Not Bulunamadı
**GET** `http://localhost:5000/api/notes/507f1f77bcf86cd799439099`

**Yanıt (404 Not Found):**
```json
{
  "success": false,
  "message": "Not bulunamadı"
}
```

### Eksik Veri
**POST** `http://localhost:5000/api/notes`
```json
{
  "title": "Sadece başlık"
}
```

**Yanıt (400 Bad Request):**
```json
{
  "success": false,
  "message": "Not içeriği zorunludur ve boş olamaz"
}
```

---

## 📝 Notlar

- Tüm endpoint'ler `/api` prefix'i ile başlar
- Tüm POST/PUT/PATCH istekleri `Content-Type: application/json` header'ı gerektirir
- ID'ler MongoDB ObjectId formatında olmalıdır (24 karakterlik hex string)
- Başarılı yanıtlar `success: true`, hatalı yanıtlar `success: false` içerir
