const tg = window.Telegram.WebApp;
tg.expand();

let current = 0;
let answers = {};

const content = document.getElementById("content");
const progressBar = document.getElementById("progress-bar");

function render() {
  const q = questions[current];
  progressBar.style.width = ((current / questions.length) * 100) + "%";

  if (!q) {
    content.innerHTML = `
      <div class="card">
        <h3>Rahmat!</h3>
        <p>So‘rovnoma yakunlandi.</p>
      </div>
    `;
    console.log("Answers:", answers);
    return;
  }

  let html = `<div class="card"><p>${q.text}</p>`;

  if (q.type === "demographic") {
    q.options.forEach(opt => {
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