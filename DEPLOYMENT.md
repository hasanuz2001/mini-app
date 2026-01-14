# 🚀 Deployment Qo'llanmasi

## 📋 Repository Linklar

- **Survey Mini App**: [https://github.com/hasanuz2001/mini-app](https://github.com/hasanuz2001/mini-app)
- **Survey Results Dashboard**: [https://github.com/hasanuz2001/mini-app-results](https://github.com/hasanuz2001/mini-app-results)

## 🌐 Backend Deployment

### Variant 1: Railway (Tavsiya etiladi)

1. **Railway'ga kiring**: https://railway.app
2. **"New Project"** → **"Deploy from GitHub repo"**
3. Repository'ni tanlang: `hasanuz2001/mini-app`
4. **Settings** → **Variables**:
   - `CSV_FILE_NAME` = `responses.csv` (ixtiyoriy)
   - `PORT` = `8000` (avtomatik)
5. **Deploy** tugmasini bosing
6. Backend URL olinadi: `https://your-app.railway.app`

### Variant 2: Render

1. **Render'ga kiring**: https://render.com
2. **"New Web Service"**
3. GitHub repository'ni ulash: `hasanuz2001/mini-app`
4. **Settings**:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn backend:app --host 0.0.0.0 --port $PORT`
   - **Environment**: `Python 3`
5. **Create Web Service**
6. Backend URL: `https://your-app.onrender.com`

### Variant 3: Heroku

```bash
# Heroku CLI o'rnatilgan bo'lishi kerak
heroku login
heroku create ai-survey-backend
git remote add heroku https://git.heroku.com/ai-survey-backend.git
git push heroku main
```

### Variant 4: Docker

```bash
# Docker image yaratish
docker build -t ai-survey-backend .

# Container ishga tushirish
docker run -p 8000:8000 ai-survey-backend

# Docker Hub'ga yuklash (ixtiyoriy)
docker tag ai-survey-backend your-username/ai-survey-backend
docker push your-username/ai-survey-backend
```

## 🎨 Frontend Deployment

### Survey Mini App (Telegram Web App)

1. **GitHub Pages**:
   - Repository: `hasanuz2001/mini-app`
   - Settings → Pages → Source: `main` branch
   - URL: `https://hasanuz2001.github.io/mini-app/`

2. **Netlify**:
   - Netlify'ga kiring: https://netlify.com
   - "Add new site" → "Import an existing project"
   - GitHub repository'ni ulash: `hasanuz2001/mini-app`
   - Build command: (bo'sh qoldirish)
   - Publish directory: `/` (root)
   - Deploy

3. **Vercel**:
   - Vercel'ga kiring: https://vercel.com
   - "New Project" → GitHub repository'ni ulash
   - Framework Preset: "Other"
   - Deploy

### Survey Results Dashboard

1. **GitHub Pages**:
   - Repository: `hasanuz2001/mini-app-results`
   - Settings → Pages → Source: `main` branch
   - URL: `https://hasanuz2001.github.io/mini-app-results/`

2. **Netlify/Vercel**: Xuddi yuqoridagidek

## 🔗 Frontend va Backend'ni ulash

### 1. Backend URL'ni olish

Deployment qilgandan so'ng backend URL'ni oling:
- Railway: `https://your-app.railway.app`
- Render: `https://your-app.onrender.com`
- Heroku: `https://your-app.herokuapp.com`

### 2. Frontend'da backend URL'ni sozlash

**mini-app/app.js** faylida:

```javascript
// Backend API URL
const API_BASE = "https://your-backend-url.com";

// Javob yuborish funksiyasini qo'shish
async function submitToBackend(userId, answers) {
  try {
    const response = await fetch(`${API_BASE}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        answers: answers
      })
    });
    
    if (response.ok) {
      console.log('Javoblar backend\'ga yuborildi');
    }
  } catch (error) {
    console.error('Backend xatosi:', error);
  }
}
```

**mini-app-results/dashboard.js** faylida:

```javascript
// Backend API URL
const API_BASE = "https://your-backend-url.com";
```

### 3. CORS sozlamalari

Backend'da (`backend.py`) CORS sozlamalarini yangilang:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://hasanuz2001.github.io",
        "https://your-netlify-app.netlify.app",
        "https://your-vercel-app.vercel.app",
        "https://web.telegram.org"  # Telegram Web App
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## ✅ Deployment tekshirish ro'yxati

### Backend
- [ ] Backend deploy qilindi
- [ ] Backend URL ishlayapti (`/` endpoint javob beradi)
- [ ] API dokumentatsiya ochiladi (`/docs`)
- [ ] CORS sozlamalari to'g'ri
- [ ] Environment variables sozlangan

### Frontend
- [ ] Frontend deploy qilindi
- [ ] Frontend ochiladi va ishlayapti
- [ ] Backend URL frontend'da sozlangan
- [ ] Telegram Web App integratsiyasi ishlayapti

### Integratsiya
- [ ] Frontend backend'ga javob yuboradi
- [ ] Dashboard backend'dan ma'lumot oladi
- [ ] Barcha endpoint'lar ishlayapti

## 🧪 Testing

### Backend test

```bash
# Root endpoint
curl https://your-backend-url.com/

# Stats endpoint
curl https://your-backend-url.com/stats

# Responses endpoint
curl https://your-backend-url.com/responses
```

### Frontend test

1. Survey Mini App'ni oching
2. So'rovnomani to'ldiring
3. Dashboard'ni ochib natijalarni tekshiring

## 📞 Yordam

- **Backend muammolari**: Backend loglarini tekshiring
- **Frontend muammolari**: Browser console'ni tekshiring
- **CORS muammolari**: Backend CORS sozlamalarini tekshiring

## 🔗 Foydali linklar

- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
