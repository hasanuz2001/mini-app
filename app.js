/* Telegram Mini App initialization */
const tg = window.Telegram.WebApp;
tg.expand();

/* State */
let current = 0;
let answers = {};
let lang = null;
let t = null;

/* DOM */
const content = document.getElementById("content");
const progressBar = document.getElementById("progress-bar");

/* ---------- Language Selector ---------- */
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

/* ---------- Set Language ---------- */
function setLanguage(selectedLang) {
  if (!window.translations || !translations[selectedLang]) {
    content.innerHTML = "<p>Xatolik: til maʼlumotlari yuklanmadi.</p>";
    return;
  }

  lang = selectedLang;
  t = translations[lang];
  document.documentElement.lang = lang;

  current = 0;
  answers = {};

  renderQuestion();
}

/* ---------- Render Question ---------- */
function renderQuestion() {
  if (!lang) {
    renderLanguageSelector();
    return;
  }

  const q = questions[current];

  progressBar.style.width = `${(current / questions.length) * 100}%`;

  if (!q) {
    content.innerHTML = `
      <div class="card">
        <h3>${t.finish}</h3>
        <p>${t.thank_you || ""}</p>
      </div>
    `;
    console.log("Survey answers:", answers);
    return;
  }

  let html = `<div class="card"><p>${q.text[lang]}</p>`;

  if (q.type === "demographic") {
    q.options[lang].forEach(opt => {
      html += `<button onclick="answer('${opt.replace(/'/g, "\\'")}')">${opt}</button>`;
    });
  }

  if (q.type === "likert") {
    html += `<div class="likert">`;
    for (let i = 1; i <= 5; i++) {
      html += `<button onclick="answer(${i})">${i}</button>`;
    }
    html += `</div>`;
  }
  if (q.type === "single_choice") {
  q.options[lang].forEach(opt => {
    html += `<button onclick="answer('${opt.replace(/'/g, "\\'")}')">${opt}</button>`;
  });

  if (q.open_option) {
    html += `
      <textarea id="openAnswer" placeholder="Izohingiz (ixtiyoriy)"></textarea>
      <button onclick="submitOpenAnswer()">Davom etish</button>
    `;
  }
}
  html += `</div>`;
  content.innerHTML = html;
}

/* ---------- Answer Handler ---------- */
function answer(value) {
  answers[questions[current].id] = value;
  current++;
  renderQuestion();
}

/* ---------- Start ---------- */
renderLanguageSelector();
function submitOpenAnswer() {
  const text = document.getElementById("openAnswer")?.value || "";
  answers[questions[current].id] = {
    choice: answers[questions[current].id],
    comment: text
  };
  current++;
  renderQuestion();
}
