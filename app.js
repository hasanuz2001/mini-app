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

  // END OF SURVEY CHECK — MUST COME FIRST
  if (current >= questions.length) {
    progressBar.style.width = "100%";
    content.innerHTML = `
      <div class="card">
        <h3>${t.finish}</h3>
        <p>${t.thank_you || ""}</p>
      </div>
    `;
    console.log("Answers:", answers);
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

  if (q.type === "single_choice") {
    q.options[safeLang].forEach(opt => {
      // Skip "open comment" pseudo-option
      if (
        opt.toLowerCase().includes("mening") ||
        opt.toLowerCase().includes("по моему") ||
        opt.toLowerCase().includes("in my opinion")
      ) {
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
  answers[questions[current].id] = value;
  current++;
  render();
}

function submitOpenAnswer() {
  const text = document.getElementById("openAnswer")?.value || "";
  const qId = questions[current].id;

  if (!answers[qId]) {
    answers[qId] = {};
  }

  answers[qId] = {
    selected: answers[qId],
    comment: text
  };

  current++;
  render();
}


render();