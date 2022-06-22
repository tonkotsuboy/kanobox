export const { translations } =
  navigator.language.includes("en") ?
    await import("./i18n/lang-en.js"):
    await import("./i18n/lang-ja.js");
