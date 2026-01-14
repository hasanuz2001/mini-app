# 🔗 Backend Integratsiya Qo'llanmasi

## ✅ Qo'shilgan funksiyalar

### 1. Backend'ga javob yuborish
- `submitToBackend()` funksiyasi qo'shildi
- `saveResult()` funksiyasi backend'ga ham yuboradi
- LocalStorage'ga backup saqlash davom etadi

### 2. Telegram Web App integratsiya
- Telegram user ID avtomatik olinadi
- Agar Telegram'da emas bo'lsa, random ID yaratiladi
- User ID localStorage'da saqlanadi

### 3. Status ko'rsatish
- Finish sahifasida backend'ga yuborilganligi ko'rsatiladi
- Muvaffaqiyatli yoki xatolik holatlari ko'rsatiladi

## 🔧 Sozlash

### 1. Backend URL'ni sozlash

**config.js** faylida:

```javascript
API_BASE: "https://your-backend-url.com"
```

Yoki **app.js** faylida to'g'ridan-to'g'ri:

```javascript
const API_BASE = "https://your-backend-url.com";
```

### 2. Backend deploy qilish

Backend'ni deploy qilish uchun `DEPLOYMENT.md` faylini o'qing.

Mashhur platformalar:
- **Railway**: https://railway.app
- **Render**: https://render.com
- **Heroku**: https://heroku.com

### 3. CORS sozlamalari

Backend'da (`backend.py`) CORS sozlamalarini yangilang:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://hasanuz2001.github.io",  # GitHub Pages
        "https://web.telegram.org",        # Telegram Web App
        "https://telegram.org",            # Telegram
        # Boshqa frontend domain'larni qo'shing
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🧪 Test qilish

### 1. Lokal test

1. Backend'ni ishga tushiring:
```bash
cd mini-app
python3 -m uvicorn backend:app --reload --host 0.0.0.0 --port 8000
```

2. Frontend'ni oching (localhost yoki GitHub Pages)
3. Survey'ni to'ldiring
4. Browser console'ni tekshiring:
   - `Backend'ga javob yuborilmoqda...` xabari ko'rinishi kerak
   - `Javoblar backend'ga muvaffaqiyatli yuborildi` xabari ko'rinishi kerak

### 2. Production test

1. Backend deploy qiling
2. Backend URL'ni `config.js`'da sozlang
3. Frontend'ni deploy qiling
4. Telegram'da test qiling

## 📊 Ma'lumotlar oqimi

```
Telegram Mini App
    ↓
User javob beradi
    ↓
saveResult() chaqiriladi
    ↓
LocalStorage'ga saqlash (backup)
    ↓
submitToBackend() chaqiriladi
    ↓
POST /submit → Backend API
    ↓
Backend CSV faylga saqlaydi
    ↓
Dashboard GET /stats va GET /responses
    ↓
Natijalar ko'rsatiladi
```

## 🔍 Debug

### Browser Console'da tekshirish

```javascript
// Backend URL tekshirish
console.log('API_BASE:', API_BASE);

// User ID tekshirish
console.log('User ID:', getUserId());

// Javoblar tekshirish
console.log('Answers:', answers);
```

### Backend loglarini tekshirish

Backend'da quyidagi loglar ko'rinishi kerak:
- `POST /submit` request keladi
- `{"status": "ok"}` response qaytadi

### Network tab'da tekshirish

1. Browser DevTools → Network tab
2. Survey'ni to'ldiring
3. `submit` request'ni toping
4. Status code: `200 OK` bo'lishi kerak
5. Response: `{"status": "ok", "message": "..."}`

## ⚠️ Muammolar va yechimlar

### 1. CORS xatosi

**Xatolik**: `Access-Control-Allow-Origin`

**Yechim**: Backend'da CORS sozlamalarini tekshiring

### 2. Backend topilmayapti

**Xatolik**: `Failed to fetch` yoki `Network error`

**Yechim**: 
- Backend URL'ni tekshiring
- Backend ishlayaptimi tekshiring
- Internet aloqasini tekshiring

### 3. User ID olinmayapti

**Xatolik**: User ID `undefined`

**Yechim**: 
- Telegram Web App SDK yuklanganligini tekshiring
- `getUserId()` funksiyasini tekshiring

## 📝 Keyingi qadamlar

1. ✅ Backend integratsiya qo'shildi
2. ⏭️ Backend'ni production'ga deploy qilish
3. ⏭️ Frontend'da backend URL'ni sozlash
4. ⏭️ CORS sozlamalarini yangilash
5. ⏭️ Testing va monitoring

## 🔗 Foydali linklar

- [Telegram Web App Documentation](https://core.telegram.org/bots/webapps)
- [FastAPI CORS Documentation](https://fastapi.tiangolo.com/tutorial/cors/)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
