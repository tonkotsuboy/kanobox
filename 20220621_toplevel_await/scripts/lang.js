export const { translations } =
  /^en\b/.test(navigator.language) ?
    await import("./i18n/lang-en.js"):
    await import("./i18n/lang-ja.js");
