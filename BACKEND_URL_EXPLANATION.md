# 🔗 Backend URL Sozlash Qo'llanmasi

## ❌ Nima NOTO'G'RI?

### 1. GitHub Repository URL ❌
```
https://github.com/hasanuz2001/mini-app-results
```
**Nima:** Bu faqat kod repository, API emas!
- Backend server emas
- API endpoint'lar yo'q
- Ma'lumotlar saqlash imkoniyati yo'q

### 2. GitHub Pages URL ❌
```
https://hasanuz2001.github.io/mini-app-results/
```
**Nima:** Bu faqat static fayllar (HTML, CSS, JS), backend emas!
- Backend server emas
- API endpoint'lar yo'q
- Faqat frontend (dashboard)

## ✅ Nima TO'G'RI?

### Backend API URL bo'lishi kerak:

Backend deploy qilingan platformaning URL'i:

#### Railway (Tavsiya)
```
https://your-app-name.railway.app
```

#### Render
```
https://your-app-name.onrender.com
```

#### Heroku
```
https://your-app-name.herokuapp.com
```

#### Boshqa platformalar
- Fly.io: `https://your-app.fly.dev`
- DigitalOcean: `https://your-app.ondigitalocean.app`
- Vercel: `https://your-app.vercel.app` (serverless functions)

## 📊 Ma'lumotlar oqimi

```
Survey (mini-app)
    ↓
POST /submit → Backend API URL (masalan: https://your-app.railway.app)
    ↓
Backend server (Python FastAPI)
    ↓
Ma'lumotlar saqlash (CSV yoki Gist)
    ↓
Dashboard (mini-app-results)
    ↓
GET /stats → Backend API URL (xuddi shu URL)
    ↓
Ma'lumotlarni ko'rsatish
```

## 🔧 Qanday sozlash?

### 1. Backend'ni deploy qiling

**Railway:**
1. https://railway.app ga kiring
2. "New Project" → "Deploy from GitHub repo"
3. Repository: `hasanuz2001/mini-app-results`
4. Root directory: `backend`
5. Start command: `cd backend && uvicorn backend:app --host 0.0.0.0 --port $PORT`
6. Backend URL olinadi: `https://your-app.railway.app`

### 2. Config.js'da sozlang

```javascript
const CONFIG = {
    GITHUB_TOKEN: 'your-token',
    GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c',
    API_BASE: "https://your-app.railway.app"  // ← Backend API URL
};
```

## 🎯 GitHub Gist API ishlatish

Agar GitHub Gist API ishlatmoqchi bo'lsangiz (backend server kerak emas):

### Variant 1: Frontend'dan to'g'ridan-to'g'ri Gist API

`app.js`'ni o'zgartirish kerak - backend'ga yubormasdan, to'g'ridan-to'g'ri Gist API'ga yuborish.

### Variant 2: Backend server (tavsiya)

Backend server deploy qiling va u Gist API bilan ishlasin:
- `backend_gist.py` ishlatish
- Backend deploy qilish
- Backend URL'ni config.js'da sozlash

## 📝 Xulosa

1. ❌ GitHub repository URL emas
2. ❌ GitHub Pages URL emas
3. ✅ Backend API URL (Railway, Render, Heroku, va boshqalar)

**Backend'ni deploy qiling va olingan URL'ni config.js'da sozlang!**
