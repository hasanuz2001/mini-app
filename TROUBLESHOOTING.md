# 🔧 Xatoliklarni Tuzatish Qo'llanmasi

## ❌ "GitHub Gist'ga yuborishda xatolik" xatosi

### 1. Browser Console'ni tekshiring

Browser'da **F12** yoki **Right Click → Inspect → Console** oching va quyidagilarni tekshiring:

```javascript
// Config tekshirish
console.log('CONFIG:', typeof CONFIG !== 'undefined' ? CONFIG : 'Config topilmadi');
console.log('Token:', CONFIG?.GITHUB_TOKEN ? 'Mavjud' : 'Yo\'q');
console.log('Gist ID:', CONFIG?.GIST_ID || 'Yo\'q');
```

### 2. Xatolik turlari va yechimlar

#### Xatolik: 401 Unauthorized
**Sabab:** Token noto'g'ri yoki muddati tugagan

**Yechim:**
1. GitHub → Settings → Developer settings → Personal access tokens
2. Yangi token yarating yoki mavjud token'ni tekshiring
3. Token'da quyidagi permission'lar bo'lishi kerak:
   - `gist` (Gist yaratish va tahrirlash)

#### Xatolik: 403 Forbidden
**Sabab:** Token'da Gist yozish ruxsati yo'q

**Yechim:**
1. Token'ni yangilang
2. `gist` permission'ini qo'shing

#### Xatolik: 404 Not Found
**Sabab:** Gist ID noto'g'ri yoki Gist mavjud emas

**Yechim:**
1. Gist ID'ni tekshiring: `d88f1ebc50c5d37c857ee5961d6dba5c`
2. Gist URL'ni oching: https://gist.github.com/hasanuz2001/d88f1ebc50c5d37c857ee5961d6dba5c
3. Agar Gist yo'q bo'lsa, yangi yarating:
   ```bash
   cd mini-app-results/backend
   python3 create_gist.py
   ```

#### Xatolik: Network Error / CORS
**Sabab:** Internet muammosi yoki CORS

**Yechim:**
1. Internet aloqasini tekshiring
2. Browser console'da Network tab'ni oching
3. Request'ni tekshiring

### 3. Config.js tekshirish

**mini-app/config.js** faylida:

```javascript
const CONFIG = {
    GITHUB_TOKEN: 'ghp_...',  // ← Token to'g'rimi?
    GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c',  // ← Gist ID to'g'rimi?
    API_BASE: null  // ← Kerak emas
};
```

**Tekshirish:**
- Token `ghp_` bilan boshlanishi kerak
- Gist ID 32 ta belgi bo'lishi kerak
- Config.js fayli index.html'da yuklanganligini tekshiring

### 4. Gist fayl nomi tekshirish

Gist'da `responses.json` fayli bo'lishi kerak. Agar boshqa nom bo'lsa, kodni o'zgartirish kerak.

### 5. Test qilish

#### Browser Console'da test:

```javascript
// Token va Gist ID tekshirish
const token = CONFIG?.GITHUB_TOKEN;
const gistId = CONFIG?.GIST_ID;

console.log('Token:', token ? 'Mavjud' : 'Yo\'q');
console.log('Gist ID:', gistId || 'Yo\'q');

// Gist'ni o'qish testi
fetch(`https://api.github.com/gists/${gistId}`, {
  headers: { 'Authorization': `token ${token}` }
})
.then(r => r.json())
.then(data => console.log('Gist mavjud:', data.id))
.catch(e => console.error('Xatolik:', e));
```

### 6. Eng keng tarqalgan muammolar

1. **Config.js yuklanmayapti**
   - `index.html`'da `config.js` yuklanganligini tekshiring
   - Browser console'da xatoliklar bor-yo'qligini tekshiring

2. **Token GitHub'da ko'rsatilmayapti**
   - Config.js `.gitignore`'da bo'lishi mumkin
   - GitHub'da `config.js.example`'dan `config.js` yarating

3. **Gist fayl nomi noto'g'ri**
   - Gist'da `responses.json` fayli bo'lishi kerak
   - Agar boshqa nom bo'lsa, kodni o'zgartirish kerak

## 🔍 Debug qadamlari

1. Browser console'ni oching (F12)
2. Survey'ni to'ldiring
3. Console'da quyidagi loglarni tekshiring:
   - `GitHub Gist'ga javob yuborilmoqda...`
   - `Gist'dan o'qish:`
   - `Gist'ga yozish:`
   - Xatolik xabarlari

4. Network tab'ni oching va quyidagi request'larni tekshiring:
   - `GET https://api.github.com/gists/...`
   - `PATCH https://api.github.com/gists/...`

## 📞 Yordam

Agar muammo hal bo'lmasa:
1. Browser console'dagi barcha xatoliklarni ko'chiring
2. Network tab'dagi request/response'larni ko'chiring
3. Config.js kontentini tekshiring (token va Gist ID)
