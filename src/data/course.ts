import type { Course } from "../types";

export const AI_COURSE_SEED: Course = {
  id: "ai-kurs-2026-seed",
  eyebrow: "ISH UCHUN AI · 2026",
  name: "Neyron tarmoqlar ish uchun",
  tagline:
    "2 oy ichida kundalik ish vazifalarini hal qilish uchun neyron tarmoqlardan foydalanishni o'rganing — va muhim ishlarga ko'proq vaqt ajrating.",
  stats: [
    { id: "stat-1", label: "Davomiyligi", value: "2 oy" },
    { id: "stat-2", label: "Haftalik yuklama", value: "~5 soat" },
    { id: "stat-3", label: "Modullar", value: "12 ta" },
    { id: "stat-4", label: "Vositalar", value: "10+" },
  ],
  audience: [
    "Marketologlar",
    "Menejerlar",
    "HR mutaxassislar",
    "Ofis xodimlari",
  ],
  outcomes: [
    {
      id: "outcome-1",
      title: "G'oyalar generatsiyasi",
      description:
        "Yangi mahsulotlar, biznes-modellar, reklama kampaniyalari va xodimlarni motivatsiya qilish tizimlari uchun yechimlar topasiz.",
    },
    {
      id: "outcome-2",
      title: "Ma'lumotlar va tadqiqot tahlili",
      description:
        "Neyron tarmoqlarni tadqiqot markazingizga aylantirasiz: katta hajmdagi ma'lumotlarni qayta ishlash va sistematizatsiya qilishni o'rganasiz.",
    },
    {
      id: "outcome-3",
      title: "Kontent yaratish",
      description:
        "Blog maqolalari, sotsial tarmoq postlari, texnik tavsiflar va biznes-muloqot matnlarini AI yordamida tezroq tayyorlaysiz.",
    },
    {
      id: "outcome-4",
      title: "Rutin vazifalarni avtomatlashtirish",
      description:
        "Xat shablonlari, hisobotlar, shartnomalar, muddat kuzatuvi va muntazam status-hisobotlarni AI ga topshirasiz.",
    },
  ],
  forYouIf: {
    title: "Kurs sizga yordam beradi, agar...",
    body: "",
    items: [
      "neyron tarmoqlarning foydali ekanligini eshitgan, lekin qayerdan boshlashni bilmasangiz;",
      "AI dan foydalanib ko'rgan, lekin kerakli natijani olmagan bo'lsangiz;",
      "tartibsiz promptlardan AI bilan tizimli ishlashga o'tishni xohlasangiz;",
      "rutin vazifalarni qisqartirish va ko'proq bo'sh vaqt olish yo'lini izlayotgan bo'lsangiz.",
    ],
  },
  tools: [
    "ChatGPT",
    "Claude",
    "Gemini",
    "Perplexity",
    "DeepSeek",
    "Mistral",
    "Qwen",
    "Ollama",
    "LM Studio",
    "n8n",
  ],
  parts: [
    {
      id: "part-1",
      eyebrow: "I QISM",
      title: "Asoslar va tanishuv",
      subtitle:
        "Kurs qanday tuzilganligi, AI vositalari va ular bilan muloqot tili.",
      modules: [
        {
          id: "m-00",
          number: "00",
          duration: "KIRISH · 30 DAQIQA",
          title: "Boshlang'ich modul",
          description:
            "Kurs qanday tuzilganligi bilan tanishasiz va birinchi real vazifa ustida ishlaysiz — AI yordamida loyihani boshqarish rejasi tuziladi. Birinchi promptingizni bosqichma-bosqich yaxshilashni o'rganasiz.",
          tags: ["Onboarding", "Birinchi prompt", "Amaliy topshiriq"],
        },
        {
          id: "m-01",
          number: "01",
          duration: "1 HAFTA",
          title: "Maqsad qo'yish va AI vositalari bilan tanishuv",
          description:
            "Neyron tarmoqlarni ish uchun sozlaysiz. Ular bilan asosiy muloqotni o'zlashtirasiz. AI vositalarning umumiy ko'rinishi, ma'lumotlar xavfsizligi qoidalari va o'z maqsadlaringizni shakllantirish.",
          tags: ["Kontekst oynasi", "Token", "Xavfsizlik", "Interfeys"],
        },
        {
          id: "m-02",
          number: "02",
          duration: "1 HAFTA",
          title: "AI asoslari va u bilan muloqot tili",
          description:
            "Neyron tarmoqlar qanday ishlaydi, kontekst oynasi va xotira mexanizmi. Nima uchun \"gallyutsinatsiyalar\" yuzaga keladi va sifatli javob olish yo'llari. Birinchi workshop — oddiy g'oyalar generatsiyasi uchun samarali promptlar.",
          tags: ["Zero-Shot", "Few-Shot", "N-Shot", "System Prompt", "Workshop"],
        },
      ],
    },
    {
      id: "part-2",
      eyebrow: "II QISM",
      title: "Amaliyot — matn, jadval va promptbook",
      subtitle:
        "Asosiy ish ko'nikmalari — matnni tahrirlash, hujjatlar bilan ishlash va professional promptlash texnikalari.",
      modules: [
        {
          id: "m-03",
          number: "03",
          duration: "2 HAFTA",
          title: "Generativ modellar bilan amaliy ishlash",
          description:
            "Matnni stilizatsiya qilish va tahrirlash — auditoriyaga mos ohang. Prompt tuzilishi va teglash orqali aniq natija olish. Hujjatlar va jadvallar bilan ishlash. AI tomonidan yozilgan matnni aniqlash ko'nikmasi.",
          tags: ["Stilizatsiya", "Tahrirlash", "Teglash", "Jadvallar", "Detektsiya"],
        },
        {
          id: "m-04",
          number: "04",
          duration: "2 HAFTA",
          title: "Ilg'or promptlash texnikalari",
          description:
            "Murakkab vazifalarni prompt ketma-ketligiga bo'lish. Chain of Thought, Tree of Thoughts, Self-Consistency, Chain of Density va Prompt Chaining texnikalari. Bu bosqichda shaxsiy promptbook to'plami yaratish boshlanadi.",
          tags: [
            "Chain of Thought",
            "Tree of Thoughts",
            "Self-Consistency",
            "Prompt Chaining",
            "Promptbook",
          ],
        },
        {
          id: "m-05",
          number: "05",
          duration: "1 HAFTA",
          title: "Uchrashuvlarni transkripsiya va xulosalash",
          description:
            "Videouchrashuvlar uchun AI yordamchilar: Zoom AI Companion, Google Meet, Microsoft Teams, Slack, MyMeet.ai, Fellow.ai, Gamma. Avtosubtitr, protokol, konspekt va avtomatik prezentatsiyalar yaratish.",
          tags: ["Zoom AI", "Meet AI", "Teams AI", "Gamma", "Avtosubtitr"],
        },
        {
          id: "m-06",
          number: "06",
          duration: "1 HAFTA",
          title: "Pochta, kalendar va messenjerlarga AI integratsiyasi",
          description:
            "Kundalik ish vositalariga AI yordamchilarni joylashtirish. Telegramda ovozni matnga o'girish, Gemini, FigJam AI, Miro AI va AI-brauzerlar. Real ish holati uchun bosqichma-bosqich algoritm tuzish.",
          tags: ["Gmail AI", "Telegram", "Kalendar", "FigJam", "Miro"],
        },
      ],
    },
    {
      id: "part-3",
      eyebrow: "III QISM",
      title: "Agentlar, integratsiya va yakuniy loyiha",
      subtitle:
        "Eng kuchli qism — avtonom AI agentlar, API integratsiyasi va shaxsiy portfolio yaratish.",
      modules: [
        {
          id: "m-07",
          number: "07",
          duration: "2 HAFTA",
          title: "AI agentlarni yaratish va sozlash",
          description:
            "Avtonom AI agentlar bilan tanishuv — ulardan foydalanish, ishlab chiqish va test qilish. n8n platformasi asoslari. Murakkab agentlar uchun TZ yozish va Telegram botga integratsiyalash.",
          tags: ["n8n", "Agent", "Multi-agent", "Telegram bot", "Test"],
        },
        {
          id: "m-08",
          number: "08",
          duration: "2 HAFTA",
          title: "API integratsiyasi va xavfsizlik",
          description:
            "Biznes jarayonlarga AI ni chuqur integratsiya. API bilan ishlash asoslari va TZ tuzish. Bulut xizmatlari, server ijarasi va lokal modellarning taqqoslanishi. Ma'lumotlar xavfsizligi nuqtai nazaridan tanlov.",
          tags: ["API", "Bulut", "Lokal model", "Xavfsizlik"],
        },
        {
          id: "m-09",
          number: "09",
          duration: "1 HAFTA",
          title: "Ma'lumotlar tahlili AI bilan",
          description:
            "AI yordamida ma'lumotlarni tozalash, strukturalash va tahlil qilish. SheetAI, Julius AI, Rows vositalari. Grafiklar va diagrammalarni avtomatik yaratish, natijalarni taqdimot uchun tayyorlash.",
          tags: ["SheetAI", "Julius AI", "Rows", "Vizualizatsiya"],
        },
        {
          id: "m-10",
          number: "10",
          duration: "1 HAFTA",
          title: "AI yordamida rasm va video yaratish",
          description:
            "HeyGen, Synthesia, Kling, Runway, Pika Labs vositalari. Text-to-Video va Image-to-Video texnologiyalari. Avatar generatsiyasi, ovoz berish, montaj va spetseffektlar.",
          tags: ["HeyGen", "Runway", "Pika Labs", "Text-to-Video", "Avatar"],
        },
        {
          id: "m-11",
          number: "11",
          duration: "1 HAFTA · FINAL",
          title: "Yakuniy modul va shaxsiy loyiha",
          description:
            "Kundalik ish jarayonlarini tahlil qilasiz, eng ko'p vaqt oladigan vazifalarni aniqlaysiz va shaxsiy AI integratsiya tizimini yaratasiz. Shaxsiy promptbook yakunlanadi va loyiha mentor oldida himoya qilinadi.",
          tags: ["Capstone", "Promptbook", "Himoya", "Sertifikat"],
          final: true,
        },
      ],
    },
  ],
  format: [
    {
      id: "fmt-1",
      number: "01",
      title: "Asosiy amaliyot — workshop'larda",
      description:
        "Mentor bilan birga real vaqtda vazifalar hal qilinadi va murakkab holatlar tahlil qilinadi. Workshoplar har hafta — ish kunlari kechqurun yoki shanba kunduzi.",
    },
    {
      id: "fmt-2",
      number: "02",
      title: "Ko'nikmalarni mustahkamlash — ish daftarida",
      description:
        "AI yordamida kasbingizga tegishli vazifalarni bajarasiz. Ish daftarida natijalar qayd etiladi va yechimlar bo'yicha tavsiyalar olinadi.",
    },
    {
      id: "fmt-3",
      number: "03",
      title: "Faqat kerakli nazariya — platformada",
      description:
        "O'z tezligingizda shug'ullanasiz. Neyron tarmoqlar va ularning ish printsiplari bo'yicha zarur ma'lumotlarni o'rganasiz. Barcha materiallar muntazam yangilanadi.",
    },
    {
      id: "fmt-4",
      number: "04",
      title: "Shaxsiy promptbook — butun kurs davomida",
      description:
        "Promptlash texnikalaridan foydalanishni va samarali so'rovlar tuzishni o'rganasiz. O'zingizning shaxsiy promptbookingizni to'plab borasiz — ish vazifalarini hal qilish uchun.",
    },
  ],
  aiHelper: {
    title: "AI yordamchi kurs davomida",
    body: "Agar biror nazariy qism tushunarsiz bo'lsa, AI yordamchi boshqa so'zlar bilan tushuntirib beradi. Har modul oxirida esa asosiy mazmun haqida qisqacha takrorlash tayyorlaydi.",
  },
  certificate: {
    title: "Sertifikat haqida",
    body: "Kursni tugatish va yakuniy loyihani muvaffaqiyatli topshirish shart. Shundan so'ng elektron sertifikat beriladi — LinkedIn'ga qo'shishingiz yoki ish beruvchiga taqdim etishingiz mumkin.",
  },
  finalOutcomes: [
    "10+ ta neyron tarmoqdan professional darajada foydalanish",
    "Murakkab vazifalar uchun ilg'or prompt zanjirlarini tuzish",
    "O'zingizning to'plangan shaxsiy promptbookingiz — 60+ tayyor prompt",
    "AI yordamida matn, jadval va hujjatlar bilan tez ishlash",
    "Telegram botga integratsiyalangan shaxsiy AI agent",
    "Uchrashuvlardan avtomatik protokol va prezentatsiyalar olish",
    "AI yordamida rasm, video va prezentatsiyalar yaratish",
    "API orqali AI ni ish jarayonlariga integratsiya qilish",
  ],
  createdAt: "2026-04-24T00:00:00.000Z",
};

export function blankCourse(): Omit<import("../types").CourseInput, never> {
  return {
    eyebrow: "",
    name: "",
    tagline: "",
    stats: [],
    audience: [],
    outcomes: [],
    forYouIf: { title: "", body: "", items: [] },
    tools: [],
    parts: [],
    format: [],
    aiHelper: undefined,
    certificate: undefined,
    finalOutcomes: [],
  };
}
