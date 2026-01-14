let tg = null;
if (window.Telegram && window.Telegram.WebApp) {
  tg = window.Telegram.WebApp;
  tg.expand();
  tg.ready();
}

let current = 0;
let answers = {};

let lang = null;

let t = null;

// Backend API URL - config.js dan olinadi yoki default qiymat
let API_BASE;
if (typeof CONFIG !== 'undefined' && CONFIG.API_BASE) {
  API_BASE = CONFIG.API_BASE;
} else {
  // Default qiymatlar - config.js bo'lmasa
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
  
  // GitHub Pages yoki production'da default backend URL
  // Bu qiymatni o'zgartirish kerak bo'lishi mumkin
  API_BASE = isLocalhost 
    ? "http://localhost:8000"
    : "https://your-backend-url.com"; // Production backend URL'ni qo'ying
}

const content = document.getElementById("content");
const progressBar = document.getElementById("progress-bar");
// DIMENSIONS o'chirildi - faqat backend'da saqlash kerak

// Telegram user ID olish
function getUserId() {
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    return `tg_${tg.initDataUnsafe.user.id}`;
  }
  // Agar Telegram'da emas bo'lsa, random ID yaratish
  let userId = localStorage.getItem('survey_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('survey_user_id', userId);
  }
  return userId;
}

function renderLanguageSelector() {
  content.innerHTML = `
    <div class="card">
      <h3>Tilni tanlang</h3>
      <p>Choose language / Выберите язык</p>

      <button onclick="setLanguage('uz')">🇺🇿 O‘zbekcha</button>
      <button onclick="setLanguage('uz_cyrl')">🇺🇿 Ўзбекча (кирил)</button>
      <button onclick="setLanguage('ru')">🇷🇺 Русский</button>
      <button onclick="setLanguage('en')">🇬🇧 English</button>
    </div>
  `;
}

function setLanguage(selectedLang) {
  lang = selectedLang;

  if (!translations || !translations[lang]) {
    alert("Language data not loaded");
    return;
  }

  t = translations[lang];
  render();
}

function render() {
  if (!lang) {
    renderLanguageSelector();
    return;
  }

  console.log('render() called, current:', current, 'questions.length:', questions.length);
  
  // END OF SURVEY CHECK — MUST COME FIRST
  if (current >= questions.length) {
  console.log('Survey finished!');
  
  // Ismni answers[1] dan ol
  const userName = answers[1] || "";
  
  let finishMessage = t.thank_you;
  if (userName && userName.trim()) {
    finishMessage = `${userName} ${
      lang === "uz" ? "! Sizga katta rahmat! Ilm va izlanishimizga katta hissa qo'shdingiz!" :
      lang === "uz_cyrl" ? "! Сизга катта раҳмат! Илм ва изланишимизга катта ҳисса қўшдингиз!" :
      lang === "ru" ? "! Большое спасибо! Вы внесли большой вклад в нашу науку и исследования!" :
      "! Thank you so much! You have made a great contribution to our science and research!"
    }`;
  }
  
  // Loading holatini ko'rsatish
  content.innerHTML = `
    <div class="card">
      <h3>${t.finish}</h3>
      <p>${finishMessage}</p>
      <p style="margin-top: 15px; color: #666; font-size: 14px;" id="saving-status">
        ${lang === "uz" ? "Javoblar saqlanmoqda..." :
          lang === "uz_cyrl" ? "Жавоблар сақланмоқда..." :
          lang === "ru" ? "Ответы сохраняются..." :
          "Saving responses..."}
      </p>
    </div>
  `;
  
  // Backend'ga yuborish va natijani ko'rsatish
  saveResult();
  
  return;
}

  const q = questions[current];
  const safeLang = (q.text && q.text[lang]) ? lang : "uz";
  progressBar.style.width = ((current / questions.length) * 100) + "%";

  let html = `<div class="card"><p>${q.text[safeLang]}</p>`;

  if (q.type === "demographic") {
    q.options[safeLang].forEach(opt => {
      html += `<button onclick="answer('${opt}')">${opt}</button>`;
    });
  }

  if (q.type === "open_text") {
    html += `
      <div style="margin-top:12px;">
        <textarea
          id="openAnswer"
          placeholder="${
            lang === "uz" ? "Ism sharifingizni shu yerga yozing..." :
            lang === "uz_cyrl" ? "Исм шарифингизни шу ерга ёзинг..." :
            lang === "ru" ? "Напишите здесь ваше имя и фамилию..." :
            "Write your name and surname here..."
          }"
          rows="2"
          style="width:100%;"
        ></textarea>
        <button style="margin-top:10px;" onclick="submitOpenText()">
          ${
            lang === "uz" ? "Davom etish" :
            lang === "uz_cyrl" ? "Давом этиш" :
            lang === "ru" ? "Продолжить" :
            "Continue"
          }
        </button>
        <button style="margin-top:8px; background:#999;" onclick="skipOpenText()">
          ${
            lang === "uz" ? "O'tkazib yuboraman" :
            lang === "uz_cyrl" ? "Ўтказиб юборамам" :
            lang === "ru" ? "Пропустить" :
            "Skip"
          }
        </button>
      </div>
    `;
  }

  if (q.type === "single_choice") {
    q.options[safeLang].forEach((opt, index) => {
      // If this question has open_option, the LAST option is a pseudo-option for comments
      if (q.open_option && index === q.options[safeLang].length - 1) {
        return;
      }

      const safeOpt = opt.replace(/'/g, "\\'");
      html += `<button onclick="answer('${safeOpt}')">${opt}</button>`;
    });

    if (q.open_option) {
      html += `
        <div style="margin-top:12px;">
          <div
            style="
              display:inline-block;
              padding:8px 12px;
              background:#2e7d32;
              color:#fff;
              font-weight:600;
              border-radius:6px;
              margin-bottom:8px;
              cursor:default;
              user-select:none;
            "
          >
            ${
              lang === "uz" ? "Mening fikrim quyidagicha:" :
              lang === "uz_cyrl" ? "Менинг фикрим қуйидагича:" :
              lang === "ru" ? "Моё мнение следующее:" :
              "My opinion is as follows:"
            }
          </div>
          <textarea
            id="openAnswer"
            placeholder="${
              lang === "uz" ? "Izohni shu yerga yozing (ixtiyoriy)" :
              lang === "uz_cyrl" ? "Изоҳни шу ерга ёзинг (ихтиёрий)" :
              lang === "ru" ? "Напишите комментарий здесь (необязательно)" :
              "Write your comment here (optional)"
            }"
            rows="3"
            style="width:100%;"
          ></textarea>
          <button style="margin-top:10px;" onclick="submitOpenAnswer()">
            ${
              lang === "uz" ? "Izohni jo'natish" :
              lang === "uz_cyrl" ? "Изоҳни жўнатиш" :
              lang === "ru" ? "Отправить комментарий" :
              "Submit comment"
            }
          </button>
        </div>
      `;
    }
  }

  if (q.type === "likert") {
    html += `<div class="likert">`;
    for (let i = 1; i <= 5; i++) {
      html += `<button onclick="answer(${i})">${i}</button>`;
    }
    html += `</div>`;
  }

  html += `</div>`;
  content.innerHTML = html;
}

function answer(value) {
  console.log('answer called with:', value, 'current:', current, 'questions.length:', questions.length);
  answers[questions[current].id] = value;
  current++;
  console.log('after increment, current:', current);
  render();
}

function submitOpenAnswer() {
  console.log('submitOpenAnswer called, current:', current);
  const text = document.getElementById("openAnswer")?.value || "";
  const qId = questions[current].id;

  if (!answers[qId]) {
    answers[qId] = {};
  }

  answers[qId] = {
    selected: answers[qId],
    comment: text
  };

  console.log('answers updated, incrementing current');
  current++;
  console.log('current after increment:', current);
  render();
}

function submitOpenText() {
  console.log('submitOpenText called, current:', current);
  const text = document.getElementById("openAnswer")?.value || "";
  const qId = questions[current].id;
  answers[qId] = text;
  
  console.log('opentext answer saved:', text);
  current++;
  render();
}

function skipOpenText() {
  console.log('skipOpenText called, current:', current);
  const qId = questions[current].id;
  answers[qId] = ""; // Bo'sh qatorni saqlash
  
  current++;
  render();
}


render();

// Backend'ga javob yuborish
async function submitToBackend(userId, answers) {
  try {
    console.log('Backend\'ga javob yuborilmoqda...', { 
      userId, 
      answers,
      API_BASE: API_BASE,
      url: `${API_BASE}/submit`
    });
    
    // Backend URL tekshirish
    if (API_BASE === "https://your-backend-url.com" || !API_BASE) {
      console.error('⚠️ Backend URL sozlanmagan!');
      const statusEl = document.getElementById('saving-status');
      if (statusEl) {
        const message = lang === "uz"
          ? "❌ Backend URL sozlanmagan!<br>Iltimos, config.js faylini yarating (config.js.example dan ko'chiring) va API_BASE ni sozlang."
          : lang === "uz_cyrl"
          ? "❌ Бэкенд URL сўзланмаган!<br>Илтимос, config.js файлини яратинг (config.js.example дан кўчиринг) ва API_BASE ни сўзланг."
          : lang === "ru"
          ? "❌ URL бэкенда не настроен!<br>Пожалуйста, создайте файл config.js (скопируйте из config.js.example) и настройте API_BASE."
          : "❌ Backend URL not configured!<br>Please create config.js file (copy from config.js.example) and set API_BASE.";
        statusEl.innerHTML = message;
        statusEl.style.color = "#d32f2f";
      }
      return false;
    }
    
    const response = await fetch(`${API_BASE}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        answers: answers
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Javoblar backend\'ga muvaffaqiyatli yuborildi:', result);
      
      // Status yangilash
      const statusEl = document.getElementById('saving-status');
      if (statusEl) {
        statusEl.innerHTML = lang === "uz" 
          ? "✅ Javoblar muvaffaqiyatli saqlandi!" 
          : lang === "uz_cyrl"
          ? "✅ Жавоблар муваффақиятли сақланди!"
          : lang === "ru"
          ? "✅ Ответы успешно сохранены!"
          : "✅ Responses saved successfully!";
        statusEl.style.color = "#2e7d32";
      }
      
      return true;
    } else {
      const error = await response.text();
      console.error('Backend xatosi:', response.status, error);
      
      // Status yangilash
      const statusEl = document.getElementById('saving-status');
      if (statusEl) {
        statusEl.innerHTML = lang === "uz"
          ? "❌ Backend xatosi! Javoblar saqlanmadi. Iltimos, qayta urinib ko'ring."
          : lang === "uz_cyrl"
          ? "❌ Бэкенд хатоси! Жавоблар сақланмади. Илтимос, қайта уриниб кўринг."
          : lang === "ru"
          ? "❌ Ошибка бэкенда! Ответы не сохранены. Пожалуйста, попробуйте снова."
          : "❌ Backend error! Responses not saved. Please try again.";
        statusEl.style.color = "#d32f2f";
      }
      
      return false;
    }
  } catch (error) {
    console.error('Backend\'ga yuborishda xatolik:', error);
    
    // Status yangilash
    const statusEl = document.getElementById('saving-status');
    if (statusEl) {
      statusEl.innerHTML = lang === "uz"
        ? "❌ Internet muammosi! Backend'ga ulanib bo'lmadi. Iltimos, internet aloqasini tekshiring va qayta urinib ko'ring."
        : lang === "uz_cyrl"
        ? "❌ Интернет муаммоси! Бэкенд'га уланиб бўлмади. Илтимос, интернет алоқасини текширинг ва қайта уриниб кўринг."
        : lang === "ru"
        ? "❌ Проблема с интернетом! Не удалось подключиться к бэкенду. Пожалуйста, проверьте интернет-соединение и попробуйте снова."
        : "❌ Internet issue! Could not connect to backend. Please check your internet connection and try again.";
      statusEl.style.color = "#d32f2f";
    }
    
    return false;
  }
}

function saveResult() {
  const userId = getUserId();

  // Faqat backend'ga yuborish (localStorage'ga saqlash yo'q)
  submitToBackend(userId, answers).then(success => {
    if (success) {
      console.log('✅ Javoblar backend\'ga muvaffaqiyatli yuborildi');
    } else {
      console.error('❌ Backend\'ga yuborishda xatolik yuz berdi');
    }
  });
}