# 🔧 Token 401 Xatosi - Yechim

## ❌ Muammo: "Bad credentials" (401)

Xatolik loglaridan ko'rinib turibdiki:
- Token mavjud: `ghp_IZx8ge...`
- Config mavjud: `configExists: true`
- Lekin 401 xatosi: "Bad credentials"

## ✅ Yechim

### 1. Token'ni Tekshiring

Token quyidagi talablarga javob berishi kerak:

1. **Format:**
   - `ghp_` bilan boshlanishi kerak (classic token)
   - Yoki `github_pat_` bilan boshlanishi kerak (fine-grained token)

2. **Uzunlik:**
   - Kamida 40 ta belgi

3. **Permission:**
   - `gist` permission bo'lishi kerak

### 2. Yangi Token Yarating

1. **GitHub'ga kiring:**
   - https://github.com/settings/tokens

2. **Eski token'ni bekor qiling** (agar exposed bo'lsa):
   - Token'ni toping
   - "Revoke" tugmasini bosing

3. **Yangi token yarating:**
   - "Generate new token (classic)" tugmasini bosing
   - **Token nomi:** `Survey Gist Access`
   - **Expiration:** 90 days yoki No expiration (tavsiya etiladi)
   - **Scopes:** ✅ `gist` (checkbox)
   - "Generate token" tugmasini bosing

4. **Token'ni ko'chirib oling:**
   - ⚠️ **Eslatma:** Token faqat bir marta ko'rsatiladi!
   - Token'ni xavfsiz joyga saqlang

### 3. Config.js'da Yangilang

**Local config.js** faylida (GitHub'da emas):

```javascript
const CONFIG = {
    GITHUB_TOKEN: 'ghp_YANGI_TOKEN_BU_YERGA',  // ← Yangi token
    GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c',
    API_BASE: null
};
```

**Muhim:**
- Token'da bo'sh joylar bo'lmasligi kerak
- Token'ni to'liq ko'chirib oling (boshidan oxirigacha)
- Qo'shtirnoqlarni to'g'ri qo'ying

### 4. GitHub Pages'da Yangilang

Agar GitHub Pages ishlatayotgan bo'lsangiz:

1. **Config.js'ni GitHub'ga yuklang:**
   - ⚠️ **Xavfsizlik:** Token'ni GitHub'ga yuklamang!
   - `config.js` `.gitignore`'da bo'lishi kerak
   - Yoki GitHub Secrets ishlating

2. **Alternativ: GitHub Secrets (Tavsiya etiladi)**

   GitHub Pages'da environment variable ishlatish mumkin emas, lekin:
   
   - **Variant 1:** Config.js'ni GitHub'ga yuklang (xavfsizlik xavfi bor)
   - **Variant 2:** Netlify, Vercel yoki boshqa platforma ishlating (environment variable qo'llab-quvvatlaydi)

### 5. Browser Cache'ni Tozalang

1. **Hard refresh:**
   - Windows: `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Yoki browser cache'ni tozalang:**
   - Chrome: Settings → Privacy → Clear browsing data
   - Cache'ni tozalang

### 6. Token'ni Test Qiling

Browser console'da (F12):

```javascript
// Token'ni test qilish
const token = CONFIG?.GITHUB_TOKEN?.trim();

if (!token) {
  console.error('❌ Token yo\'q!');
} else {
  console.log('Token uzunligi:', token.length);
  console.log('Token boshlanishi:', token.substring(0, 4));
  
  // User endpoint orqali test
  fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  .then(r => {
    console.log('Status:', r.status);
    if (r.ok) {
      return r.json();
    } else {
      return r.json().then(data => {
        console.error('Xatolik:', data);
        throw new Error(data.message);
      });
    }
  })
  .then(user => {
    console.log('✅ Token ishlayapti! User:', user.login);
  })
  .catch(e => {
    console.error('❌ Token xatosi:', e.message);
  });
}
```

### 7. Gist'ni Tekshiring

Gist mavjudligini tekshiring:

```javascript
const token = CONFIG?.GITHUB_TOKEN?.trim();
const gistId = CONFIG?.GIST_ID;

fetch(`https://api.github.com/gists/${gistId}`, {
  headers: {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json'
  }
})
.then(r => {
  console.log('Gist status:', r.status);
  if (r.ok) {
    return r.json();
  } else {
    return r.json().then(data => {
      console.error('Gist xatosi:', data);
      throw new Error(data.message);
    });
  }
})
.then(gist => {
  console.log('✅ Gist mavjud!', gist.id);
  console.log('Fayllar:', Object.keys(gist.files || {}));
})
.catch(e => {
  console.error('❌ Gist xatosi:', e.message);
});
```

## 🔍 Debug Qadamlari

1. **Browser console'ni oching** (F12)
2. **Config.js yuklanganligini tekshiring:**
   ```javascript
   console.log('CONFIG:', typeof CONFIG !== 'undefined' ? CONFIG : 'Config topilmadi');
   ```
3. **Token formatini tekshiring:**
   ```javascript
   const token = CONFIG?.GITHUB_TOKEN;
   console.log('Token:', token ? token.substring(0, 10) + '...' : 'Yo\'q');
   console.log('Token uzunligi:', token?.length || 0);
   ```
4. **Token'ni test qiling** (yuqoridagi kod bilan)
5. **Gist'ni test qiling** (yuqoridagi kod bilan)

## ⚠️ Xavfsizlik Eslatmalari

1. **Token'ni hech qachon GitHub'ga commit qilmang**
2. **Token exposed bo'lsa, darhol bekor qiling**
3. **Token'ni environment variable sifatida ishlating** (agar mumkin bo'lsa)
4. **GitHub Secrets ishlating** (CI/CD uchun)

## 📞 Yordam

Agar muammo hal bo'lmasa:
1. Browser console'dagi barcha xatoliklarni ko'chiring
2. Token'ni test qiling (yuqoridagi kod bilan)
3. Gist ID'ni tekshiring
4. Config.js kontentini tekshiring
