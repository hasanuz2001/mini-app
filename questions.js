const questions = [
  {
    id: 1,
    type: "demographic",
    text: {
      uz: "Sizning lavozimingiz:",
      uz_cyrl: "Сизнинг лавозимингиз:",
      ru: "Ваша должность:",
      en: "Your position:"
    },
    options: {
      uz: [
        "Yuqori bo‘g‘in rahbari",
        "O‘rta bo‘g‘in rahbari",
        "Muhandis / texnik mutaxassis",
        "Operatsion xodim",
        "IT / avtomatika"
      ],
      uz_cyrl: [
        "Юқори бўғин раҳбари",
        "Ўрта бўғин раҳбари",
        "Муҳандис / техник мутахассис",
        "Операцион ходим",
        "IT / автоматика"
      ],
      ru: [
        "Руководитель высшего звена",
        "Руководитель среднего звена",
        "Инженер / технический специалист",
        "Операционный персонал",
        "IT / автоматика"
      ],
      en: [
        "Senior management",
        "Middle management",
        "Engineer / technical specialist",
        "Operational staff",
        "IT / automation"
      ]
    }
  },
  {
    id: 2,
    type: "demographic",
    text: {
      uz: "Ish tajribangiz:",
      uz_cyrl: "Иш тажрибангиз:",
      ru: "Ваш опыт работы:",
      en: "Your work experience:"
    },
    options: {
      uz: ["0–5 yil", "6–10 yil", "11–20 yil", "20+ yil"],
      uz_cyrl: ["0–5 йил", "6–10 йил", "11–20 йил", "20+ йил"],
      ru: ["0–5 лет", "6–10 лет", "11–20 лет", "20+ лет"],
      en: ["0–5 years", "6–10 years", "11–20 years", "20+ years"]
    }
  },
  {
    id: 3,
    type: "likert",
    text: {
      uz: "Sun’iy intellekt asosidagi texnik xizmat ishlab chiqarish samaradorligini oshiradi.",
      uz_cyrl: "Сунъий интеллект асосидаги техник хизмат ишлаб чиқариш самарадорлигини оширади.",
      ru: "Техническое обслуживание на основе ИИ повышает производственную эффективность.",
      en: "AI-based predictive maintenance improves operational efficiency."
    }
  },
  {
    id: 4,
    type: "likert",
    text: {
      uz: "Rahbariyat Sun’iy intellekt loyihasining maqsadini aniq tushuntirdi.",
      uz_cyrl: "Раҳбарият Сунъий интеллект лойиҳасининг мақсадини аниқ тушунтирди.",
      ru: "Руководство чётко объяснило цели проекта по ИИ.",
      en: "Management clearly explained the objectives of the AI initiative."
    }
  }
];