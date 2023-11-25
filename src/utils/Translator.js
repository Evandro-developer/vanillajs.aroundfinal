import { I18N } from "./locales";

let languageData = {};

export const t = (key) => {
  return languageData[key];
};

const extractTranslations = (data, lang) => {
  const result = {};
  const recurse = (obj, path = []) => {
    for (let key in obj) {
      if (obj[key][lang]) {
        result[path.concat(key).join(".")] = obj[key][lang];
      } else {
        recurse(obj[key], path.concat(key));
      }
    }
  };
  recurse(data);
  return result;
};

export const loadTranslations = (lang, newLanguageData) => {
  newLanguageData = extractTranslations(I18N, lang);
  if (Object.keys(newLanguageData)) {
    languageData = newLanguageData;
  }
  updateTranslations();
};

export const updateTranslations = (key, translatedText) => {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    key = element.getAttribute("data-translate");
    translatedText = t(key);
    if (translatedText && translatedText !== key) {
      element.textContent = translatedText;
    } else {
      console.warn(`Tradução não encontrada para: ${key}`);
    }
  });
};
