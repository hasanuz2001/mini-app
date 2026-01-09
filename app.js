const tg = window.Telegram.WebApp;
tg.expand();

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
  const q = questions[current];
  progressBar.style.width = ((current / questions.length) * 100) + "%";

  if (!q) {
    content.innerHTML = `
      <div class="card">
        <h3>${t.finish}</h3>
        <p>${t.thank_you || ""}</p>
      </div>
    `;
    console.log("Answers:", answers);
    return;
  }

  let html = `<div class="card"><p>${q.text[lang]}</p>`;

  if (q.type === "demographic") {
    q.options[lang].forEach(opt => {
      html += `<button onclick="answer('${opt}')">${opt}</button>`;
    });
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


render();