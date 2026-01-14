# 🔐 GitHub Secret Push Qo'llanmasi

## ⚠️ Muammo

GitHub secret scanning token'ni topdi va push qilishni blokladi:
```
remote: error: GH013: Repository rule violations found
- Push cannot contain secrets
- GitHub Personal Access Token
```

## ✅ Yechimlar

### Variant 1: Secret'ni Allow Qilish (Tezkor)

1. **Link'ga kiring:**
   https://github.com/hasanuz2001/mini-app/security/secret-scanning/unblock-secret/38EyUqZ0YmdcWmpVDVW11FKtTGk

2. **"Allow secret" tugmasini bosing**

3. **Push qiling:**
   ```bash
   git push origin main
   ```

⚠️ **Eslatma:** Bu token'ni public repository'da saqlash xavfsizlik xavfi!

### Variant 2: Token'ni Environment Variable Qilish (Tavsiya)

Token'ni config.js'dan olib tashlab, environment variable sifatida ishlating:

1. **Config.js'ni o'zgartiring:**
   ```javascript
   GITHUB_TOKEN: process.env.GITHUB_TOKEN || 'your-token'
   ```

2. **Deployment'da environment variable qo'shing:**
   - Railway: Settings → Variables → `GITHUB_TOKEN`
   - Render: Environment → `GITHUB_TOKEN`
   - Heroku: Config Vars → `GITHUB_TOKEN`

### Variant 3: GitHub Secrets (GitHub Actions uchun)

Agar GitHub Actions ishlatmoqchi bo'lsangiz:

1. Repository → Settings → Secrets and variables → Actions
2. "New repository secret"
3. Name: `GITHUB_TOKEN`
4. Value: Token'ni qo'ying

## 🔒 Xavfsizlik Tavsiyalari

1. **Token'ni public repository'da saqlamang**
2. **Token'ni environment variable sifatida ishlating**
3. **Agar token exposed bo'lsa, yangi token yarating**
4. **Token permissions'ni cheklang** (faqat kerakli permission'lar)

## 📝 Keyingi Qadamlar

1. Secret'ni allow qiling (Variant 1)
2. Yoki token'ni environment variable qiling (Variant 2)
3. Push qiling
