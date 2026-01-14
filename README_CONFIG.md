# ⚙️ Config.js Sozlash Qo'llanmasi

## ❗ Muammo

Agar quyidagi xato ko'rsatilsa:
```
❌ Бэкенд URL сўзланмаган! Илтимос, config.js файлида API_BASE ни ўзгартиринг.
```

Bu `config.js` fayli `.gitignore` ichida bo'lgani uchun GitHub'ga yuklanmaydi.

## ✅ Yechim

### 1. Config.js faylini yaratish

`config.js.example` faylini `config.js` nomiga ko'chiring:

```bash
cd mini-app
cp config.js.example config.js
```

### 2. Config.js'ni sozlash

`config.js` faylini ochib, quyidagilarni to'ldiring:

```javascript
const CONFIG = {
    GITHUB_TOKEN: 'your-github-token-here',
    GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c',
    
    // Backend API URL
    API_BASE: "https://your-backend-url.com"  // ← Backend URL'ni qo'ying
};
```

### 3. GitHub Pages uchun

Agar GitHub Pages'da deploy qilmoqchi bo'lsangiz:

1. **Config.js'ni yarating** (yuqoridagidek)
2. **GitHub'ga yuklang** (`.gitignore`dan olib tashlang yoki force qiling)

```bash
git add -f config.js
git commit -m "Add config.js"
git push
```

**⚠️ Eslatma:** Token'lar public repository'da bo'lmasligi kerak!

### 4. Xavfsiz variant (Tavsiya)

Token'larni GitHub'ga yuklamaslik uchun:

1. **Config.js'ni local'da saqlang** (`.gitignore`da qoldiring)
2. **Backend URL'ni environment variable sifatida ishlating**
3. **Yoki backend'ni deploy qiling va URL'ni hardcode qiling**

## 🔧 Alternativ yechim

Agar config.js bo'lmasa, `app.js` default qiymatlar ishlatadi:

- **Localhost**: `http://localhost:8000`
- **Production**: `https://your-backend-url.com` (o'zgartirish kerak)

## 📝 Keyingi qadamlar

1. ✅ `config.js.example` yaratildi
2. ⏭️ `config.js` yarating va sozlang
3. ⏭️ Backend URL'ni qo'ying
4. ⏭️ Test qiling

## 🔗 Foydali linklar

- Backend deploy: `DEPLOYMENT.md`
- Gist setup: `backend/GIST_SETUP.md`
