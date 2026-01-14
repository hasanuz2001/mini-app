# GitHub'ga yuklash bo'yicha qo'llanma

## 📋 Tayyorlangan fayllar

Backend GitHub'ga yuklashga tayyor. Quyidagi fayllar yaratilgan:

### Asosiy fayllar
- ✅ `backend.py` - FastAPI backend kodi (optimallashtirilgan)
- ✅ `requirements.txt` - Python dependencies
- ✅ `README.md` - To'liq dokumentatsiya
- ✅ `.gitignore` - Git ignore qilish sozlamalari

### Deployment fayllari
- ✅ `Procfile` - Heroku deployment uchun
- ✅ `runtime.txt` - Python versiyasi
- ✅ `Dockerfile` - Docker deployment uchun
- ✅ `.dockerignore` - Docker ignore fayllari

### Konfiguratsiya
- ✅ `env.example` - Environment variables namunasi
- ✅ `.github/workflows/python-app.yml` - CI/CD workflow

## 🚀 GitHub'ga yuklash qadamlari

### 1. GitHub'da yangi repository yaratish

1. GitHub'ga kiring: https://github.com
2. "New repository" tugmasini bosing
3. Repository nomini kiriting (masalan: `ai-survey-backend`)
4. Description: "AI Resistance Survey Backend API"
5. Public yoki Private tanlang
6. **README, .gitignore va license qo'shmaslik** (biz allaqachon yaratdik)
7. "Create repository" tugmasini bosing

### 2. Lokal repository'ni GitHub'ga ulash

Terminal'da quyidagi buyruqlarni bajaring:

```bash
# mini-app papkasiga kirish
cd /Users/hasanhaydarov/hello_app/diploma_app/mini-app

# Git repository'ni tekshirish
git status

# Agar git init qilinmagan bo'lsa
git init

# Barcha fayllarni qo'shish
git add .

# Birinchi commit
git commit -m "Initial commit: AI Resistance Survey Backend API

- FastAPI backend with 3 endpoints
- CSV data storage
- Full documentation
- Docker and Heroku support
- CI/CD workflow"

# GitHub repository URL'ini qo'shish
# Agar remote allaqachon mavjud bo'lsa, uni yangilash:
git remote set-url origin https://github.com/hasanuz2001/mini-app.git
# yoki yangi remote qo'shish:
git remote add origin https://github.com/hasanuz2001/mini-app.git

# Branch nomini main qilish
git branch -M main

# GitHub'ga yuklash
git push -u origin main
```

### 3. GitHub'da tekshirish

1. GitHub repository sahifasiga kiring
2. Barcha fayllar yuklanganini tekshiring
3. README.md to'g'ri ko'rsatilishini tekshiring

## 🔧 GitHub'da sozlash

### Secrets qo'shish (agar kerak bo'lsa)

1. Repository → Settings → Secrets and variables → Actions
2. "New repository secret" tugmasini bosing
3. Kerakli secret'larni qo'shing (masalan: API keys)

### GitHub Pages (agar frontend ham bo'lsa)

1. Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `main` yoki `gh-pages`
4. Folder: `/root`

## 🚢 Deployment platformalari

### Heroku

```bash
# Heroku CLI o'rnatilgan bo'lishi kerak
heroku login
heroku create your-app-name
git push heroku main
```

### Railway

1. Railway'ga kiring: https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Repository'ni tanlang
4. Auto-deploy yoqiladi

### Render

1. Render'ga kiring: https://render.com
2. "New Web Service"
3. GitHub repository'ni ulash
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn backend:app --host 0.0.0.0 --port $PORT`

## ✅ Tekshirish ro'yxati

Yuklashdan oldin tekshiring:

- [ ] `requirements.txt` to'g'ri
- [ ] `README.md` to'liq va aniq
- [ ] `.gitignore` CSV va venv fayllarini ignore qiladi
- [ ] `backend.py` kod toza va optimallashtirilgan
- [ ] Barcha fayllar commit qilingan
- [ ] GitHub repository yaratilgan
- [ ] Remote origin to'g'ri ulangan

## 📝 Keyingi qadamlar

1. ✅ Backend GitHub'ga yuklandi
2. ⏭️ Frontend'ni ham GitHub'ga yuklash (agar kerak bo'lsa)
3. ⏭️ Backend'ni production'ga deploy qilish
4. ⏭️ Frontend'ni backend API'ga ulash
5. ⏭️ Testing va monitoring

## 🆘 Muammo bo'lsa

- Git xatolari: `git status` bilan tekshiring
- Push xatolari: Remote URL'ni tekshiring
- Dependencies xatolari: `requirements.txt` ni tekshiring
