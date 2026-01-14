# AI Resistance Survey - Backend API

Uran qazib olish sohasida Sun'iy Intellekt joriy etilishiga bo'lgan qarshilikni o'rganish uchun so'rovnoma backend API.

## 🔗 Repository Linklar

- **Survey Mini App**: [https://github.com/hasanuz2001/mini-app](https://github.com/hasanuz2001/mini-app)
- **Survey Results Dashboard**: [https://github.com/hasanuz2001/mini-app-results](https://github.com/hasanuz2001/mini-app-results)

## 🚀 O'rnatish

### Talablar
- Python 3.8 yoki yuqori versiya
- pip (Python package manager)

### Qadamlar

1. **Repository'ni klonlash:**
```bash
git clone https://github.com/hasanuz2001/mini-app.git
cd mini-app
```

2. **Virtual environment yaratish (tavsiya etiladi):**
```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# yoki
venv\Scripts\activate  # Windows
```

3. **Dependencies o'rnatish:**
```bash
pip install -r requirements.txt
```

## 🏃 Ishga tushirish

### Development mode (auto-reload bilan):
```bash
python3 -m uvicorn backend:app --reload --host 0.0.0.0 --port 8000
```

### Production mode:
```bash
python3 -m uvicorn backend:app --host 0.0.0.0 --port 8000
```

Server `http://localhost:8000` manzilida ishga tushadi.

## 📡 API Endpoints

### 1. POST `/submit`
So'rovnoma javoblarini yuborish.

**Request Body:**
```json
{
  "user_id": "user_123",
  "answers": {
    "1": "John Doe",
    "2": "6–10 yil",
    "3": "Ha, albatta oshiradi"
  }
}
```

**Response:**
```json
{
  "status": "ok"
}
```

### 2. GET `/stats`
Barcha javoblarning statistikasini olish.

**Response:**
```json
{
  "total": 10,
  "question_stats": {
    "1": {
      "John Doe": 5,
      "Jane Smith": 3
    },
    "2": {
      "6–10 yil": 8
    }
  },
  "user_count": 10
}
```

### 3. GET `/responses`
Barcha javoblarni olish.

**Response:**
```json
{
  "total": 140,
  "responses": [
    {
      "timestamp": "2024-01-15T10:30:00",
      "user_id": "user_123",
      "question_id": "1",
      "answer": "John Doe"
    }
  ]
}
```

## 📁 Ma'lumotlar saqlash

Javoblar `responses.csv` fayliga saqlanadi. CSV fayl quyidagi formatda:

```csv
timestamp,user_id,question_id,answer
2024-01-15T10:30:00,user_123,1,"John Doe"
```

## 🔧 Konfiguratsiya

Backend konfiguratsiyasini o'zgartirish uchun `backend.py` faylida quyidagi o'zgaruvchilarni tahrirlash mumkin:

- `FILE_NAME`: CSV fayl nomi (default: `responses.csv`)
- CORS sozlamalari: `allow_origins` ro'yxatini o'zgartirish

## 🌐 Deployment

### Heroku
1. Heroku CLI o'rnatilgan bo'lishi kerak
2. `Procfile` yaratish:
```
web: uvicorn backend:app --host 0.0.0.0 --port $PORT
```
3. Deploy qilish:
```bash
heroku create your-app-name
git push heroku main
```

### Railway
1. Railway account yaratish
2. GitHub repository'ni ulash
3. Auto-deploy yoqiladi

### Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "backend:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📝 API Dokumentatsiya

Server ishga tushgandan so'ng, avtomatik API dokumentatsiyasiga quyidagi manzillardan kirish mumkin:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🔒 Xavfsizlik

**Eslatma:** Hozirgi versiyada CORS barcha manbalarga ochiq (`allow_origins=["*"]`). Production'da faqat kerakli domain'larni qo'shing:

```python
allow_origins=[
    "https://your-frontend-domain.com",
    "https://telegram-web-app-domain.com"
]
```

## 🧪 Testing

```bash
# Test ishga tushirish (testlar hali yozilmagan)
pytest
```

## 📦 Docker bilan ishga tushirish

```bash
# Docker image yaratish
docker build -t ai-survey-backend .

# Container ishga tushirish
docker run -p 8000:8000 ai-survey-backend
```

## 🔗 GitHub Repositorylar

- **Survey Mini App**: [https://github.com/hasanuz2001/mini-app](https://github.com/hasanuz2001/mini-app)
- **Survey Results Dashboard**: [https://github.com/hasanuz2001/mini-app-results](https://github.com/hasanuz2001/mini-app-results)

## 🚢 GitHub'ga yangilash

Agar o'zgarishlar bo'lsa:

```bash
git add .
git commit -m "Update: Backend improvements"
git push origin main
```

## 📄 License

Bu loyiha diploma ishi uchun yaratilgan.

## 👤 Muallif

Diploma ishi - AI Resistance Survey

## 📞 Yordam

Muammo bo'lsa, issue oching yoki pull request yuboring.
