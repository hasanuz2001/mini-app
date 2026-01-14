# 🔑 Token Test Qo'llanmasi

## Token Muammosini Tekshirish

Agar "Token noto'g'ri" xatosi chiqsa, quyidagilarni tekshiring:

### 1. Browser Console'da Test

Browser console'ni oching (F12) va quyidagilarni yozing:

```javascript
// Config tekshirish
console.log('CONFIG:', typeof CONFIG !== 'undefined' ? CONFIG : 'Config topilmadi');
console.log('Token:', CONFIG?.GITHUB_TOKEN ? 'Mavjud' : 'Yo\'q');
console.log('Token uzunligi:', CONFIG?.GITHUB_TOKEN?.length || 0);
console.log('Token boshlanishi:', CONFIG?.GITHUB_TOKEN?.substring(0, 4) || 'null');
console.log('Gist ID:', CONFIG?.GIST_ID || 'Yo\'q');
```

### 2. Token Formatini Tekshirish

Token quyidagicha bo'lishi kerak:
- `ghp_` bilan boshlanishi kerak (classic token)
- Yoki `github_pat_` bilan boshlanishi kerak (fine-grained token)
- Uzunligi: 40-50 ta belgi

### 3. Token'ni Test Qilish

```javascript
// Token'ni test qilish
const token = CONFIG?.GITHUB_TOKEN?.trim();
const gistId = CONFIG?.GIST_ID;

if (!token || !gistId) {
  console.error('❌ Token yoki Gist ID yo\'q!');
} else {
  console.log('✅ Token va Gist ID mavjud');
  console.log('Token:', token.substring(0, 10) + '...');
  
  // Gist'ni test qilish
  fetch(`https://api.github.com/gists/${gistId}`, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  .then(r => {
    console.log('Status:', r.status);
    if (r.status === 401) {
      console.error('❌ Token noto\'g\'ri yoki muddati tugagan!');
      return r.json();
    } else if (r.status === 404) {
      console.error('❌ Gist topilmadi!');
      return r.json();
    } else if (r.ok) {
      console.log('✅ Token ishlayapti!');
      return r.json();
    }
    return r.json();
  })
  .then(data => {
    if (data.message) {
      console.error('Xatolik:', data.message);
    } else {
      console.log('✅ Gist mavjud:', data.id);
    }
  })
  .catch(e => console.error('Xatolik:', e));
}
```

### 4. Token Permission'larini Tekshirish

Token'da quyidagi permission'lar bo'lishi kerak:
- ✅ `gist` (Gist yaratish va tahrirlash)

Token'ni tekshirish:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Token'ni toping
3. Permission'larni tekshiring

### 5. Yangi Token Yaratish

Agar token noto'g'ri bo'lsa:

1. **Eski token'ni bekor qiling** (agar exposed bo'lsa)
2. **Yangi token yarating:**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - "Generate new token (classic)"
   - Nom: `Survey Gist Access`
   - Permission: ✅ `gist`
   - "Generate token"
3. **Token'ni ko'chirib oling**
4. **Config.js'da yangilang:**
   ```javascript
   const CONFIG = {
       GITHUB_TOKEN: 'yangi-token-bu-yerga',
       GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c',
       API_BASE: null
   };
   ```

### 6. Config.js Cache Muammosi

Agar token yangilangan bo'lsa, lekin hali ham eski token ishlatilayotgan bo'lsa:

1. **Browser cache'ni tozalang:**
   - Chrome: Ctrl+Shift+Delete (Windows) yoki Cmd+Shift+Delete (Mac)
   - Hard refresh: Ctrl+F5 (Windows) yoki Cmd+Shift+R (Mac)

2. **GitHub Pages cache:**
   - Config.js versiyasini o'zgartiring: `config.js?v=2`
   - `index.html`'da: `<script src="config.js?v=2">`

### 7. Eng Keng Tarqalgan Muammolar

1. **Token bo'sh joylar bilan:**
   ```javascript
   GITHUB_TOKEN: ' ghp_... '  // ← Bo'sh joylar
   ```
   **Yechim:** Token'ni trim qiling yoki qo'shtirnoqlarni to'g'ri qo'ying

2. **Token qo'shtirnoqlar bilan:**
   ```javascript
   GITHUB_TOKEN: "'ghp_...'"  // ← Qo'shtirnoqlar ichida qo'shtirnoq
   ```
   **Yechim:** Faqat bitta qo'shtirnoq ishlating: `'ghp_...'`

3. **Config.js yuklanmayapti:**
   - Browser console'da: `Uncaught ReferenceError: CONFIG is not defined`
   - **Yechim:** `index.html`'da `config.js` yuklanganligini tekshiring

4. **GitHub Pages'da eski versiya:**
   - Config.js GitHub'da yangilangan, lekin Pages'da eski versiya
   - **Yechim:** Versiya parametrini o'zgartiring: `config.js?v=2`

## 📞 Yordam

Agar muammo hal bo'lmasa:
1. Browser console'dagi barcha xatoliklarni ko'chiring
2. Token'ni test qiling (yuqoridagi kod bilan)
3. Config.js kontentini tekshiring (token va Gist ID)
