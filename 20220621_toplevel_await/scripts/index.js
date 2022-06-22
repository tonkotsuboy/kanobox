import { translations } from "./lang.js";

// translationsのデータが格納された後に、実行される
document.querySelector("h1").textContent = translations.title;
document.querySelector("button").textContent = translations.button;
