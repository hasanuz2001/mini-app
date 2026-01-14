# 🔐 GitHub Secrets'ga Token Qo'shish - Batafsil Qo'llanma

## 📋 Kirish

GitHub Secrets - bu xavfsiz ma'lumotlarni (token, parol, API kalitlari) GitHub repository'da saqlash uchun xizmat. Bu ma'lumotlar:
- ✅ Hech kimga ko'rinmaydi (hatto repository owner'ga ham)
- ✅ GitHub Actions workflow'larda ishlatiladi
- ✅ Public repository'da ham xavfsiz

## 🚀 Qadam-baqadam Qo'llanma

### Qadam 1: GitHub Repository'ga Kiring

1. Browser'da GitHub'ga kiring: https://github.com
2. Repository'ni oching: `hasanuz2001/mini-app`

### Qadam 2: Settings'ga Kiring

1. Repository sahifasida **"Settings"** tugmasini bosing
   - Repository nomining yonida joylashgan
   - Yoki URL: `https://github.com/hasanuz2001/mini-app/settings`

### Qadam 3: Secrets va Variables'ga Kiring

1. Settings sahifasida chap menudan **"Secrets and variables"** ni tanlang
2. **"Actions"** ni bosing
   - Bu GitHub Actions workflow'lari uchun secrets

### Qadam 4: New Repository Secret Yaratish

1. **"New repository secret"** tugmasini bosing
2. Quyidagi ma'lumotlarni kiriting:

   **Name (Kalit nomi):**
   ```
   TOKEN_GITHUB
   ```
   - ⚠️ **Muhim:** Bu nomni keyinroq GitHub Actions workflow'da ishlatamiz
   - ⚠️ **Eslatma:** GitHub `GITHUB_` bilan boshlanadigan secret nomlarini qo'llab-quvvatlamaydi!
   - Katta-kichik harflar muhim: `TOKEN_GITHUB` ≠ `token_github`

   **Secret (Qiymat):**
   ```
   your-github-token-here
   ```
   - ⚠️ **Muhim:** O'zingizning token'ingizni qo'ying
   - Token `ghp_` yoki `github_pat_` bilan boshlanishi kerak
   - ⚠️ **Muhim:** Token'ni to'liq ko'chirib oling
   - Bo'sh joylar bo'lmasligi kerak
   - Token'ni bir marta ko'rsatiladi, keyin ko'rinmaydi

3. **"Add secret"** tugmasini bosing

### Qadam 5: Secret Muvaffaqiyatli Qo'shildi

Secret qo'shilgandan keyin:
- ✅ Secret ro'yxatida ko'rinadi
- ✅ Qiymat ko'rinmaydi (faqat `••••••••` ko'rsatiladi)
- ✅ Secret'ni o'zgartirish yoki o'chirish mumkin

## 📸 Ekran Ko'rinishi

```
Repository Settings
├── General
├── Access
├── Secrets and variables
│   └── Actions  ← Bu yerga kiring
│       ├── Repository secrets
│       │   └── New repository secret  ← Bu yerni bosing
│       └── Variables
```

## 🔍 Secret'ni Tekshirish

Secret qo'shilganligini tekshirish:

1. **Settings** → **Secrets and variables** → **Actions**
2. **Repository secrets** bo'limida `TOKEN_GITHUB` ko'rinishi kerak
3. Qiymat ko'rinmaydi (faqat `••••••••`)

## 🛠️ GitHub Actions Workflow'da Ishlatish

Secret'ni GitHub Actions workflow'da ishlatish:

### 1. Workflow Faylini Yaratish

**Variant 1: Local'da Yaratish (Tavsiya etiladi)**

1. **Terminal'da repository papkasiga kiring:**
   ```bash
   cd /Users/hasanhaydarov/hello_app/diploma_app/mini-app
   ```

2. **`.github/workflows` papkasini yarating:**
   ```bash
   mkdir -p .github/workflows
   ```

3. **Workflow faylini yarating:**
   ```bash
   touch .github/workflows/deploy.yml
   ```
   
   Yoki text editor'da:
   - `.github/workflows/` papkasida
   - `deploy.yml` nomi bilan yangi fayl yarating

**Variant 2: GitHub'da To'g'ridan-to'g'ri Yaratish**

1. GitHub'da repository'ni oching
2. "Add file" → "Create new file" tugmasini bosing
3. Fayl nomini yozing: `.github/workflows/deploy.yml`
4. Kontentni yozing va commit qiling

**Batafsil qo'llanma:** `WORKFLOW_CREATE_GUIDE.md` faylini o'qing.

Repository'da `.github/workflows/deploy.yml` faylini yarating:

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Create config.js
        run: |
          echo "const CONFIG = {" > config.js
          echo "    GITHUB_TOKEN: '${{ secrets.TOKEN_GITHUB }}'," >> config.js
          echo "    GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c'," >> config.js
          echo "    API_BASE: null" >> config.js
          echo "};" >> config.js
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.TOKEN_GITHUB }}
          publish_dir: ./
```

### 2. Secret'ni Ishlatish

Workflow'da secret'ni ishlatish:
- `${{ secrets.TOKEN_GITHUB }}` - Secret qiymatini olish
- Secret nomi: `TOKEN_GITHUB` (yuqorida yaratilgan)
- ⚠️ **Eslatma:** `GITHUB_` bilan boshlanadigan nomlar ishlamaydi!

## ⚠️ Muhim Eslatmalar

### 1. Secret Nomlari

- Secret nomlari **katta-kichik harflarga sezgir**
- `TOKEN_GITHUB` ≠ `token_github` ≠ `Token_Github`
- ⚠️ **Muhim:** Secret nomlari `GITHUB_` bilan boshlanmasligi kerak!
- Workflow'da ham xuddi shu nomni ishlating

### 2. Secret Qiymatlari

- Secret qiymatlari **hech qachon ko'rinmaydi**
- Secret qo'shilgandan keyin, qiymatni ko'rish mumkin emas
- Agar noto'g'ri qo'shilgan bo'lsa, o'chirib qayta yarating

### 3. Secret'ni O'zgartirish

1. Settings → Secrets and variables → Actions
2. Secret'ni toping
3. **"Update"** tugmasini bosing
4. Yangi qiymatni kiriting
5. **"Update secret"** tugmasini bosing

### 4. Secret'ni O'chirish

1. Settings → Secrets and variables → Actions
2. Secret'ni toping
3. **"Delete"** tugmasini bosing
4. Tasdiqlang

## 🔒 Xavfsizlik

### 1. Secret'lar Xavfsizmi?

- ✅ Secret'lar GitHub'da shifrlangan holda saqlanadi
- ✅ Public repository'da ham xavfsiz
- ✅ Faqat repository owner va collaborator'lar ko'ra oladi
- ✅ GitHub Actions workflow'larda ishlatiladi

### 2. Secret'ni Log'da Ko'rsatmaslik

Workflow'da secret'ni log'da ko'rsatmaslik:

```yaml
- name: Use secret
  run: |
    echo "Token ishlatilmoqda..."
    # Secret'ni echo qilmang!
    # echo "${{ secrets.GITHUB_TOKEN }}"  # ❌ NOTO'G'RI!
```

### 3. Secret'ni Environment Variable sifatida Ishlatish

```yaml
- name: Use secret as env
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    echo "Token mavjud"
    # $GITHUB_TOKEN ishlatiladi
```

## 📝 Misol: Config.js Yaratish

GitHub Actions orqali `config.js` yaratish:

### 1. Workflow Fayl

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Create config.js
        run: |
          cat > config.js << EOF
          const CONFIG = {
              GITHUB_TOKEN: '${{ secrets.TOKEN_GITHUB }}',
              GIST_ID: 'd88f1ebc50c5d37c857ee5961d6dba5c',
              API_BASE: null
          };
          EOF
      
      - name: Deploy to Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.TOKEN_GITHUB }}
          publish_dir: ./
          keep_files: false
```

### 2. Workflow'ni Ishga Tushirish

1. Workflow faylini commit qiling
2. GitHub'ga push qiling
3. **Actions** tab'ga kiring
4. Workflow ishga tushadi
5. `config.js` yaratiladi va GitHub Pages'ga deploy qilinadi

## 🎯 Tekshirish

### 1. Secret Mavjudligini Tekshirish

```bash
# GitHub CLI orqali (agar o'rnatilgan bo'lsa)
gh secret list
```

### 2. Workflow'da Tekshirish

```yaml
- name: Test secret
  run: |
    if [ -z "${{ secrets.TOKEN_GITHUB }}" ]; then
      echo "❌ Secret topilmadi!"
      exit 1
    else
      echo "✅ Secret mavjud!"
    fi
```

## 📞 Yordam

Agar muammo bo'lsa:

1. **Secret ko'rinmayapti:**
   - Settings → Secrets and variables → Actions
   - Repository secrets bo'limini tekshiring

2. **Workflow'da ishlamayapti:**
   - Secret nomini tekshiring (`TOKEN_GITHUB`)
   - Workflow sintaksisini tekshiring (`${{ secrets.TOKEN_GITHUB }}`)
   - ⚠️ `GITHUB_` bilan boshlanadigan nomlar ishlamaydi!

3. **Secret qiymati noto'g'ri:**
   - Secret'ni o'chirib qayta yarating
   - Yangi token yarating (agar kerak bo'lsa)

## ✅ Yakuniy Tekshiruv

1. ✅ Secret qo'shildimi? (Settings → Secrets → Actions)
2. ✅ Secret nomi to'g'rimi? (`TOKEN_GITHUB` - `GITHUB_` bilan boshlanmasligi kerak!)
3. ✅ Workflow'da ishlatildimi? (`${{ secrets.TOKEN_GITHUB }}`)
4. ✅ Workflow muvaffaqiyatli ishladimi? (Actions tab)
