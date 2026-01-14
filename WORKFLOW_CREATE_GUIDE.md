# 📝 GitHub Actions Workflow Faylini Yaratish - Batafsil Qo'llanma

## 🎯 Maqsad

GitHub Actions workflow fayli yaratish orqali:
- `config.js` faylini GitHub Secrets'dan avtomatik yaratish
- GitHub Pages'ga avtomatik deploy qilish

## 🚀 Qadam-baqadam Qo'llanma

### Qadam 1: Repository'ni Local'da O'zgartirish

1. **Terminal'ni oching** va repository papkasiga kiring:
   ```bash
   cd /Users/hasanhaydarov/hello_app/diploma_app/mini-app
   ```

2. **`.github` papkasini yarating** (agar mavjud bo'lmasa):
   ```bash
   mkdir -p .github/workflows
   ```
   
   - `.github` - GitHub Actions uchun maxsus papka
   - `workflows` - Workflow fayllari shu papkada bo'ladi

### Qadam 2: Workflow Faylini Yaratish

1. **Workflow faylini yarating:**
   ```bash
   touch .github/workflows/deploy.yml
   ```
   
   Yoki text editor'da:
   - `.github/workflows/` papkasida
   - `deploy.yml` nomi bilan yangi fayl yarating

2. **Fayl nomi:**
   - `deploy.yml` - Deploy uchun
   - `build.yml` - Build uchun
   - `ci.yml` - CI/CD uchun
   - Har qanday nom bo'lishi mumkin, lekin `.yml` yoki `.yaml` bilan tugashi kerak

### Qadam 3: Workflow Kontentini Yozish

Faylga quyidagi kontentni yozing:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch: # Manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pages: write
      id-token: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Create config.js from secret
        run: |
          cat > config.js << 'EOF'
          const CONFIG = {
              GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
              GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c',
              API_BASE: null
          };
          EOF
          echo "✅ config.js yaratildi"
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### Qadam 4: GitHub'ga Push Qilish

1. **Faylni saqlang:**
   - Text editor'da `Ctrl+S` (Windows) yoki `Cmd+S` (Mac)

2. **Git'ga qo'shing:**
   ```bash
   git add .github/workflows/deploy.yml
   ```

3. **Commit qiling:**
   ```bash
   git commit -m "Add: GitHub Actions workflow for deploy"
   ```

4. **Push qiling:**
   ```bash
   git push origin main
   ```

### Qadam 5: GitHub'da Tekshirish

1. **GitHub'da repository'ni oching:**
   - https://github.com/hasanuz2001/mini-app

2. **`.github/workflows/` papkasini tekshiring:**
   - Repository'da `.github` papkasini oching
   - `workflows` papkasini oching
   - `deploy.yml` faylini ko'ring

3. **Actions tab'ni tekshiring:**
   - Repository'da **"Actions"** tab'ni bosing
   - "Deploy to GitHub Pages" workflow'ni ko'ring
   - Push qilingandan keyin workflow avtomatik ishga tushadi

## 📁 Fayl Strukturasi

```
mini-app/
├── .github/
│   └── workflows/
│       └── deploy.yml  ← Workflow fayli
├── index.html
├── app.js
├── config.js.example
└── ...
```

## 🔍 Workflow Tushuntirish

### 1. Workflow Nomi

```yaml
name: Deploy to GitHub Pages
```
- Workflow'ning nomi
- Actions tab'da ko'rsatiladi

### 2. Trigger (Ishga Tushirish)

```yaml
on:
  push:
    branches: [ main ]
  workflow_dispatch: # Manual trigger
```
- `push` - `main` branch'ga push qilinganda ishga tushadi
- `workflow_dispatch` - Manual ishga tushirish mumkin

### 3. Job (Ish)

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
```
- `deploy` - Job nomi
- `runs-on: ubuntu-latest` - Ubuntu server'da ishlaydi

### 4. Steps (Qadamlar)

```yaml
steps:
  - name: Checkout code
    uses: actions/checkout@v3
```
- Har bir step - bitta vazifa
- `name` - Step nomi
- `uses` - Action ishlatish
- `run` - Command ishga tushirish

### 5. Secret Ishlatish

```yaml
GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}'
```
- `${{ secrets.GITHUB_TOKEN }}` - Secret qiymatini olish
- Secret nomi: `GITHUB_TOKEN` (GitHub Secrets'da yaratilgan)

## 🛠️ Alternativ: GitHub'da To'g'ridan-to'g'ri Yaratish

Agar local'da yaratish qiyin bo'lsa, GitHub'da to'g'ridan-to'g'ri yaratish mumkin:

### Qadam 1: GitHub'da Fayl Yaratish

1. **Repository'ni oching:**
   - https://github.com/hasanuz2001/mini-app

2. **"Add file" → "Create new file" tugmasini bosing**

3. **Fayl nomini yozing:**
   ```
   .github/workflows/deploy.yml
   ```
   - ⚠️ **Muhim:** `.github` bilan boshlanishi kerak
   - `/` belgisi papka yaratadi

### Qadam 2: Kontentni Yozish

1. **Fayl kontentini yozing** (yuqoridagi misol)

2. **"Commit new file" tugmasini bosing**

3. **Workflow avtomatik ishga tushadi**

## ⚠️ Muhim Eslatmalar

### 1. Fayl Joylashuvi

- ✅ **To'g'ri:** `.github/workflows/deploy.yml`
- ❌ **Noto'g'ri:** `github/workflows/deploy.yml` (nuqta yo'q)
- ❌ **Noto'g'ri:** `.github/deploy.yml` (workflows papkasi yo'q)

### 2. Fayl Formati

- ✅ **To'g'ri:** `.yml` yoki `.yaml`
- ❌ **Noto'g'ri:** `.txt`, `.js`, `.json`

### 3. YAML Sintaksisi

- Indentatsiya (tushirish) muhim
- 2 yoki 4 space ishlatiladi (tab emas!)
- Qo'shtirnoqlar muhim

### 4. Secret Nomlari

- ⚠️ **Muhim:** `GITHUB_` bilan boshlanmasligi kerak!
- ✅ **To'g'ri:** `TOKEN_GITHUB`, `GITHUB_API_TOKEN`
- ❌ **Noto'g'ri:** `GITHUB_TOKEN` (GitHub bloklaydi)

## 🔍 Tekshirish

### 1. Workflow Mavjudligini Tekshirish

```bash
# Local'da
ls -la .github/workflows/

# Chiqish:
# deploy.yml
```

### 2. Workflow Sintaksisini Tekshirish

GitHub'da:
- Actions tab'ga kiring
- Workflow'ni oching
- Xatoliklar bo'lsa, qizil ko'rsatiladi

### 3. Workflow Ishga Tushganligini Tekshirish

1. **Actions tab'ga kiring**
2. **"Deploy to GitHub Pages" workflow'ni ko'ring**
3. **Yashil belgi** - muvaffaqiyatli
4. **Qizil belgi** - xatolik

## 📝 Misol: To'liq Workflow

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pages: write
      id-token: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Create config.js
        run: |
          cat > config.js << 'EOF'
          const CONFIG = {
              GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
              GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c',
              API_BASE: null
          };
          EOF
          echo "✅ config.js yaratildi"
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2
```

## 🎯 Keyingi Qadamlar

1. ✅ Workflow faylini yarating
2. ✅ GitHub'ga push qiling
3. ✅ GitHub Secrets'ga token qo'shing (`GITHUB_TOKEN`)
4. ✅ Workflow'ni ishga tushiring
5. ✅ Natijani tekshiring

## 📞 Yordam

Agar muammo bo'lsa:

1. **Workflow ishlamayapti:**
   - Actions tab'da xatoliklarni ko'ring
   - YAML sintaksisini tekshiring

2. **Secret topilmayapti:**
   - GitHub Secrets'da `GITHUB_TOKEN` mavjudligini tekshiring
   - Secret nomini tekshiring

3. **Config.js yaratilmayapti:**
   - Workflow log'larini tekshiring
   - Secret qiymatini tekshiring
