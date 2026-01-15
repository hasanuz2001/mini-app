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

// Backend API URL - endi kerak emas, to'g'ridan-to'g'ri Gist API ishlatiladi
// Lekin orqaga moslik uchun saqlanadi
let API_BASE = null; // Backend kerak emas, Gist API ishlatiladi

const content = document.getElementById("content");
const progressBar = document.getElementById("progress-bar");
// DIMENSIONS o'chirildi - faqat backend'da saqlash kerak

function escapeForOnclick(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, "&quot;");
}

function buildAnswerPayload(optionId, optionText) {
  return {
    id: String(optionId),
    text: String(optionText)
  };
}

function getAnswerText(answer) {
  if (!answer) {
    return "";
  }
  if (typeof answer === "object") {
    if (typeof answer.text === "string") {
      return answer.text;
    }
    if (answer.selected && typeof answer.selected.text === "string") {
      return answer.selected.text;
    }
    return "";
  }
  return String(answer);
}

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
    <div class="landing">
      <div class="hero">
        <img src="hero.png" alt="Uran sohasida sun'iy intellekt" />
      </div>
      <div class="card language-card">
        <div class="survey-title">
        <div><h4>(UZ) Uran fohasida Sun'iy Intellektdan foydalanishga qanday qaraysiz?</h4></div>
        <div><h4>(EN) How do you view the use of artificial intelligence in uranium mining?</h4></div>  
        <div><h4>(RU) Как вы относитесь к использованию искусственного интеллекта при добыче урана?</h4></div>
         </div>
        <button onclick="setLanguage('uz')">🇺🇿 O‘zbekcha</button>
        <button onclick="setLanguage('uz_cyrl')">🇺🇿 Ўзбекча (кирил)</button>
        <button onclick="setLanguage('ru')">🇷🇺 Русский</button>
        <button onclick="setLanguage('en')">🇬🇧 English</button>
        <p class="survey-note">
          *Mazkur so'rovnoma javoblari faqat ilmiy maqsadlarda foydalaniladi
          <br>*Ответы данного опроса используются только в научных целях
          <br>*Survey responses are used for scientific purposes only
        </p>
      </div>
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
  const userName = getAnswerText(answers[1]);
  
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
    q.options[safeLang].forEach((opt, index) => {
      const safeOpt = escapeForOnclick(opt);
      html += `<button onclick="answerOption('${index + 1}', '${safeOpt}')">${opt}</button>`;
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

      const safeOpt = escapeForOnclick(opt);
      html += `<button onclick="answerOption('${index + 1}', '${safeOpt}')">${opt}</button>`;
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
      html += `<button onclick="answerOption('${i}', '${i}')">${i}</button>`;
    }
    html += `</div>`;
  }

  html += `</div>`;
  content.innerHTML = html;
}

function answerOption(optionId, optionText) {
  console.log('answerOption called with:', optionId, optionText, 'current:', current, 'questions.length:', questions.length);
  answers[questions[current].id] = buildAnswerPayload(optionId, optionText);
  current++;
  console.log('after increment, current:', current);
  render();
}

function submitOpenAnswer() {
  console.log('submitOpenAnswer called, current:', current);
  const text = document.getElementById("openAnswer")?.value || "";
  const qId = questions[current].id;

  answers[qId] = {
    id: "open_option",
    selected: answers[qId] || null,
    comment: text || ""
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
  answers[qId] = {
    id: "open_text",
    text
  };
  
  console.log('opentext answer saved:', text);
  current++;
  render();
}

function skipOpenText() {
  console.log('skipOpenText called, current:', current);
  const qId = questions[current].id;
  answers[qId] = {
    id: "open_text",
    text: ""
  }; // Bo'sh qatorni saqlash
  
  current++;
  render();
}


render();

// GitHub Gist API orqali ma'lumotlarni olish
async function getGistData() {
  const token = (typeof CONFIG !== 'undefined' && CONFIG.GITHUB_TOKEN) ? CONFIG.GITHUB_TOKEN : null;
  const gistId = (typeof CONFIG !== 'undefined' && CONFIG.GIST_ID) ? CONFIG.GIST_ID : null;
  
  if (!token || !gistId) {
    throw new Error('GITHUB_TOKEN yoki GIST_ID sozlanmagan');
  }
  
  // Token'ni tozalash
  const cleanToken = token.trim();
  
  // Token formatini tekshirish
  if (!cleanToken.startsWith('ghp_') && !cleanToken.startsWith('github_pat_')) {
    console.error('❌ Token format noto\'g\'ri! Token "ghp_" yoki "github_pat_" bilan boshlanishi kerak.');
    throw new Error('Token format noto\'g\'ri');
  }
  
  // Token uzunligini tekshirish
  if (cleanToken.length < 40) {
    console.error('❌ Token juda qisqa! Token uzunligi kamida 40 ta belgi bo\'lishi kerak.');
    throw new Error('Token juda qisqa');
  }
  
  const url = `https://api.github.com/gists/${gistId}`;
  console.log('Gist\'dan o\'qish:', { 
    url, 
    gistId, 
    tokenPrefix: cleanToken ? cleanToken.substring(0, 10) + '...' : 'null',
    tokenLength: cleanToken.length,
    tokenFormat: cleanToken.substring(0, 4)
  });
  
  // Token'ni test qilish (user endpoint orqali)
  try {
    const userTestResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${cleanToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!userTestResponse.ok) {
      const userErrorText = await userTestResponse.text();
      console.error('❌ Token test xatosi:', userTestResponse.status, userErrorText);
      
      if (userTestResponse.status === 401) {
        throw new Error('Token noto\'g\'ri yoki muddati tugagan. Iltimos, yangi token yarating va config.js\'da yangilang.');
      }
    } else {
      const userData = await userTestResponse.json();
      console.log('✅ Token ishlayapti! User:', userData.login);
    }
  } catch (userError) {
    console.error('Token test xatosi:', userError);
    // Token test xatosi bo'lsa ham, Gist'ga urinib ko'ramiz
  }
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${cleanToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gist API xatosi:', response.status, errorText);
    
    if (response.status === 401) {
      throw new Error('Token noto\'g\'ri yoki muddati tugagan. Iltimos, yangi token yarating va config.js\'da yangilang.');
    } else if (response.status === 404) {
      throw new Error(`Gist topilmadi (404). Gist ID: ${gistId}. Iltimos, Gist ID\'ni tekshiring yoki yangi Gist yarating.`);
    }
    
    throw new Error(`Gist API error: ${response.status} - ${errorText}`);
  }
  
  const gist = await response.json();
  
  // Fayl nomini tekshirish
  if (!gist.files || !gist.files['responses.json']) {
    console.error('Gist fayllari:', Object.keys(gist.files || {}));
    throw new Error('Gist\'da responses.json fayli topilmadi');
  }
  
  const content = gist.files['responses.json'].content;
  return JSON.parse(content);
}

// GitHub Gist API orqali ma'lumotlarni saqlash
async function saveGistData(data) {
  const token = (typeof CONFIG !== 'undefined' && CONFIG.GITHUB_TOKEN) ? CONFIG.GITHUB_TOKEN : null;
  const gistId = (typeof CONFIG !== 'undefined' && CONFIG.GIST_ID) ? CONFIG.GIST_ID : null;
  
  if (!token || !gistId) {
    throw new Error('GITHUB_TOKEN yoki GIST_ID sozlanmagan');
  }
  
  // Token'ni tozalash
  const cleanToken = token.trim();
  
  const url = `https://api.github.com/gists/${gistId}`;
  const payload = {
    files: {
      'responses.json': {
        content: JSON.stringify(data, null, 2)
      }
    }
  };
  
  console.log('Gist\'ga yozish:', { 
    url, 
    gistId, 
    dataSize: JSON.stringify(data).length,
    tokenPrefix: cleanToken ? cleanToken.substring(0, 10) + '...' : 'null'
  });
  
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': `token ${cleanToken}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gist API yozish xatosi:', response.status, errorText);
    throw new Error(`Gist API error: ${response.status} - ${errorText}`);
  }
  
  const result = await response.json();
  console.log('Gist muvaffaqiyatli yangilandi:', result.id);
  return true;
}

// To'g'ridan-to'g'ri GitHub Gist API'ga javob yuborish
async function submitToGist(userId, answers) {
  // Token va Gist ID olish (funksiya boshida)
  const token = (typeof CONFIG !== 'undefined' && CONFIG.GITHUB_TOKEN) ? CONFIG.GITHUB_TOKEN : null;
  const gistId = (typeof CONFIG !== 'undefined' && CONFIG.GIST_ID) ? CONFIG.GIST_ID : null;
  
  // Token formatini tekshirish
  if (token) {
    const trimmedToken = token.trim();
    if (trimmedToken.length === 0) {
      console.error('❌ Token bo\'sh!');
    } else if (!trimmedToken.startsWith('ghp_') && !trimmedToken.startsWith('github_pat_')) {
      console.warn('⚠️ Token format noto\'g\'ri bo\'lishi mumkin. Token "ghp_" yoki "github_pat_" bilan boshlanishi kerak.');
    }
  }
  
  try {
    console.log('GitHub Gist\'ga javob yuborilmoqda...', { 
      userId, 
      answers,
      token: token ? `${token.substring(0, 10)}...` : 'null',
      tokenLength: token ? token.length : 0,
      tokenStartsWith: token ? token.substring(0, 4) : 'null',
      gistId: gistId || 'null',
      configExists: typeof CONFIG !== 'undefined',
      configKeys: typeof CONFIG !== 'undefined' ? Object.keys(CONFIG) : []
    });
    
    if (!token || !gistId) {
      console.error('⚠️ GITHUB_TOKEN yoki GIST_ID sozlanmagan!', {
        token: token ? 'mavjud' : 'yo\'q',
        tokenValue: token ? `${token.substring(0, 10)}...` : null,
        gistId: gistId || 'yo\'q',
        config: typeof CONFIG !== 'undefined' ? CONFIG : 'config topilmadi'
      });
      const statusEl = document.getElementById('saving-status');
      if (statusEl) {
        const message = lang === "uz"
          ? "❌ GitHub Token yoki Gist ID sozlanmagan!<br>Iltimos, config.js faylida GITHUB_TOKEN va GIST_ID ni sozlang.<br>Browser console'ni tekshiring."
          : lang === "uz_cyrl"
          ? "❌ GitHub Token ёки Gist ID сўзланмаган!<br>Илтимос, config.js файлида GITHUB_TOKEN ва GIST_ID ни сўзланг.<br>Browser console'ни текширинг."
          : lang === "ru"
          ? "❌ GitHub Token или Gist ID не настроены!<br>Пожалуйста, настройте GITHUB_TOKEN и GIST_ID в файле config.js.<br>Проверьте консоль браузера."
          : "❌ GitHub Token or Gist ID not configured!<br>Please set GITHUB_TOKEN and GIST_ID in config.js file.<br>Check browser console.";
        statusEl.innerHTML = message;
        statusEl.style.color = "#d32f2f";
      }
      return false;
    }
    
    // Token'ni trim qilish (bo'sh joylar bo'lmasligi uchun)
    const cleanToken = token.trim();
    if (cleanToken.length === 0) {
      throw new Error('Token bo\'sh!');
    }
    
    // Mavjud ma'lumotlarni olish
    let gistData = await getGistData();
    
    // Agar gist bo'sh bo'lsa, struktura yaratish
    if (!gistData || !gistData.timestamp) {
      gistData = {
        timestamp: [],
        user_id: [],
        question_id: [],
        answer: []
      };
    }
    
    // Yangi javoblarni qo'shish
    const timestamp = new Date().toISOString();
    for (const [qId, answer] of Object.entries(answers)) {
      gistData.timestamp.push(timestamp);
      gistData.user_id.push(userId);
      gistData.question_id.push(String(qId));
      gistData.answer.push(
        typeof answer === 'object' ? JSON.stringify(answer) : String(answer)
      );
    }
    
    // Gist'ga saqlash
    await saveGistData(gistData);
    
    console.log('Javoblar GitHub Gist\'ga muvaffaqiyatli saqlandi!');
    
    // Status yangilash
    const statusEl = document.getElementById('saving-status');
    if (statusEl) {
      statusEl.innerHTML = lang === "uz" 
        ? "✅ Javoblar GitHub Gist'ga muvaffaqiyatli saqlandi!" 
        : lang === "uz_cyrl"
        ? "✅ Жавоблар GitHub Gist'га муваффақиятли сақланди!"
        : lang === "ru"
        ? "✅ Ответы успешно сохранены в GitHub Gist!"
        : "✅ Responses saved successfully to GitHub Gist!";
      statusEl.style.color = "#2e7d32";
    }
    
    return true;
  } catch (error) {
    console.error('GitHub Gist\'ga yuborishda xatolik:', error);
    console.error('Xatolik tafsilotlari:', {
      message: error.message,
      stack: error.stack,
      token: token ? `${token.substring(0, 10)}...` : 'null',
      gistId: gistId
    });
    
    // Status yangilash - aniq xatolik xabari
    const statusEl = document.getElementById('saving-status');
    if (statusEl) {
      let errorMessage = '';
      
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        errorMessage = lang === "uz"
          ? "❌ Token noto'g'ri yoki muddati tugagan!<br>Iltimos, config.js'da GITHUB_TOKEN ni tekshiring."
          : lang === "uz_cyrl"
          ? "❌ Token нотўғри ёки муддати тугаган!<br>Илтимос, config.js'да GITHUB_TOKEN ни текширинг."
          : lang === "ru"
          ? "❌ Неверный токен или срок действия истёк!<br>Пожалуйста, проверьте GITHUB_TOKEN в config.js."
          : "❌ Invalid token or expired!<br>Please check GITHUB_TOKEN in config.js.";
      } else if (error.message.includes('404') || error.message.includes('Not Found')) {
        errorMessage = lang === "uz"
          ? "❌ Gist topilmadi!<br>Iltimos, config.js'da GIST_ID ni tekshiring. Gist ID: " + (gistId || 'sozlanmagan')
          : lang === "uz_cyrl"
          ? "❌ Gist топилмади!<br>Илтимос, config.js'да GIST_ID ни текширинг. Gist ID: " + (gistId || 'сўзланмаган')
          : lang === "ru"
          ? "❌ Gist не найден!<br>Пожалуйста, проверьте GIST_ID в config.js. Gist ID: " + (gistId || 'не настроен')
          : "❌ Gist not found!<br>Please check GIST_ID in config.js. Gist ID: " + (gistId || 'not configured');
      } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
        errorMessage = lang === "uz"
          ? "❌ Ruxsat yo'q!<br>Token'da Gist yozish ruxsati yo'q. Iltimos, token'ni yangilang."
          : lang === "uz_cyrl"
          ? "❌ Рухсат йўқ!<br>Token'да Gist ёзиш рухсати йўқ. Илтимос, token'ни янгиланг."
          : lang === "ru"
          ? "❌ Нет доступа!<br>У токена нет прав на запись в Gist. Пожалуйста, обновите токен."
          : "❌ Forbidden!<br>Token doesn't have write permission for Gist. Please update token.";
      } else {
        errorMessage = lang === "uz"
          ? `❌ GitHub Gist'ga yuborishda xatolik!<br>Xatolik: ${error.message}<br>Iltimos, browser console'ni tekshiring.`
          : lang === "uz_cyrl"
          ? `❌ GitHub Gist'га юборишда хато!<br>Хато: ${error.message}<br>Илтимос, browser console'ни текширинг.`
          : lang === "ru"
          ? `❌ Ошибка при отправке в GitHub Gist!<br>Ошибка: ${error.message}<br>Пожалуйста, проверьте консоль браузера.`
          : `❌ Error sending to GitHub Gist!<br>Error: ${error.message}<br>Please check browser console.`;
      }
      
      statusEl.innerHTML = errorMessage;
      statusEl.style.color = "#d32f2f";
    }
    
    return false;
  }
}

// Eski funksiya nomi - orqaga moslik uchun
async function submitToBackend(userId, answers) {
  // To'g'ridan-to'g'ri Gist API'ga yuborish
  return await submitToGist(userId, answers);
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