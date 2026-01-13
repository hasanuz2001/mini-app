let tg = null;
if (window.Telegram && window.Telegram.WebApp) {
  tg = window.Telegram.WebApp;
  tg.expand();
}

let current = 0;
let answers = {};

let lang = null;

let t = null;


const content = document.getElementById("content");
const progressBar = document.getElementById("progress-bar");
const DIMENSIONS = {
  leadership: [5, 6, 7],
  core: [8, 9, 10],
  readiness: [11, 12]
};

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
  saveResult();
  content.innerHTML = `
    <div class="card">
      <h3>${t.finish}</h3>
      <p>${t.thank_you}</p>
    </div>
  `;
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

function scoreAnswer(questionId, answer) {
  // TODO: Implement scoring logic
  // For now, return 0
  return 0;
}

function calculateScores() {
  let scores = {
    leadership: 0,
    core: 0,
    readiness: 0
  };

  Object.entries(DIMENSIONS).forEach(([dim, qIds]) => {
    qIds.forEach(id => {
      scores[dim] += scoreAnswer(id, answers[id]);
    });
  });

  return scores;
}
function saveResult() {
  const scores = calculateScores();

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  let data = JSON.parse(localStorage.getItem("survey_results") || "{}");

  if (!data[today]) {
    data[today] = {
      count: 0,
      leadership: 0,
      core: 0,
      readiness: 0
    };
  }

  data[today].count += 1;
  data[today].leadership += scores.leadership;
  data[today].core += scores.core;
  data[today].readiness += scores.readiness;

  localStorage.setItem("survey_results", JSON.stringify(data));
}