FROM python:3.11-slim

WORKDIR /app

# Dependencies o'rnatish
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kodlarni ko'chirish
COPY . .

# Port ochish
EXPOSE 8000

# Server ishga tushirish
CMD ["uvicorn", "backend:app", "--host", "0.0.0.0", "--port", "8000"]
