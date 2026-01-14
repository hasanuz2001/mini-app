# 📝 GitHub Gist Yaratish Qo'llanmasi

## ✅ Ha, Gist yaratish kerak!

Survey javoblarini saqlash uchun GitHub Gist yaratish **majburiy**.

## 🚀 Qo'lda Gist Yaratish (Eng Oson)

### 1. GitHub'ga kiring
https://gist.github.com/ ga kiring va login qiling

### 2. Yangi Gist yarating

1. **Gist description** yozing:
   ```
   AI Resistance Survey - Responses Storage
   ```

2. **Fayl nomi** yozing:
   ```
   responses.json
   ```

3. **Fayl kontentini** yozing:
   ```json
   {
     "timestamp": [],
     "user_id": [],
     "question_id": [],
     "answer": []
   }
   ```

4. **"Create secret gist"** yoki **"Create public gist"** tugmasini bosing
   - ⚠️ **Secret gist** tavsiya etiladi (xavfsizlik uchun)

### 3. Gist ID'ni oling

Gist yaratilgandan keyin, URL'dan ID'ni oling:

```
https://gist.github.com/hasanuz2001/d88f1ebc50c5d37c857ee5961d6dba5c
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                    Bu qism GIST_ID
```

**GIST_ID:** `d88f1ebc50c5d37c857ee5961d6dba5c`

### 4. Config.js'da sozlang

**mini-app/config.js:**
```javascript
const CONFIG = {
    GITHUB_TOKEN: 'your-token-here',
    GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c',  // ← Olingan ID
    API_BASE: null
};
```

**mini-app-results/config.js:**
```javascript
const CONFIG = {
    GITHUB_TOKEN: 'your-token-here',
    GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c',  // ← Xuddi shu ID
    API_BASE: null
};
```

## 🔧 Script orqali Gist Yaratish

### 1. Token oling

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. **"Generate new token (classic)"** bosing
3. **Token nomi:** `Survey Gist Access`
4. **Permission'lar:**
   - ✅ `gist` (Gist yaratish va tahrirlash)
5. **"Generate token"** bosing
6. Token'ni ko'chirib oling (faqat bir marta ko'rsatiladi!)

### 2. Script ishga tushiring

```bash
cd mini-app-results/backend
export GITHUB_TOKEN='your-new-token-here'
python3 create_gist.py
```

**Tanlov:** `1` (Yangi Gist yaratish)

### 3. Gist ID'ni oling

Script quyidagicha chiqadi:
```
✅ Gist muvaffaqiyatli yaratildi!
📋 Gist ID: d88f1ebc50c5d37c857ee5961d6dba5c
🔗 Gist URL: https://gist.github.com/hasanuz2001/d88f1ebc50c5d37c857ee5961d6dba5c
```

### 4. Config.js'da sozlang

Olingan Gist ID'ni `config.js` fayllariga qo'ying.

## ⚠️ Muhim Eslatmalar

1. **Token xavfsizligi:**
   - Token'ni hech qachon GitHub'ga commit qilmang
   - `config.js` `.gitignore`'da bo'lishi kerak
   - Token exposed bo'lsa, darhol bekor qiling

2. **Gist ID:**
   - Bir xil Gist ID'ni `mini-app` va `mini-app-results` da ishlatish kerak
   - Gist ID o'zgarmaydi (faqat Gist o'chirilsa)

3. **Fayl nomi:**
   - Gist'da fayl nomi **`responses.json`** bo'lishi kerak
   - Boshqa nom bo'lsa, kod ishlamaydi

## 🔍 Gist Mavjudligini Tekshirish

Browser'da Gist URL'ni oching:
```
https://gist.github.com/hasanuz2001/d88f1ebc50c5d37c857ee5961d6dba5c
```

Agar 404 xatosi chiqsa, Gist mavjud emas yoki private bo'lib, sizda ruxsat yo'q.

## 📞 Yordam

Agar muammo bo'lsa:
1. Token'ni tekshiring (GitHub Settings → Developer settings)
2. Gist ID'ni tekshiring (URL'dan)
3. Browser console'ni ochib, xatoliklarni ko'ring
