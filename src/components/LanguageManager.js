import { loadTranslations, updateTranslations } from "../utils/Translator";
import { remove, add, addEventToDOM, callIfFunction } from "../utils/helpers";

export default class LanguageManager {
  constructor(callbackAuthStatusAuthRoute, callbackAuthStatusMainRoute) {
    this._callbackAuthStatusAuthRoute = callbackAuthStatusAuthRoute;
    this._callbackAuthStatusMainRoute = callbackAuthStatusMainRoute;
    this._currentLanguage = this._getCurrentLanguageFromPage();
    loadTranslations(this._currentLanguage);
  }

  getCurrentLanguage() {
    return this._currentLanguage;
  }

  _getCurrentLanguageFromPage() {
    return (
      localStorage.getItem("selectedLanguage") ||
      document.body.getAttribute("data-lang") ||
      "en"
    );
  }

  getLanguageElements(header) {
    this._enLang = header.querySelector(".header__lang[data-lang='en']");
    this._ptLang = header.querySelector(".header__lang[data-lang='pt']");
    this._setLanguage(this._currentLanguage);
  }

  _setLanguage(language) {
    language = {
      en: this._enLang,
      pt: this._ptLang,
    };
    for (let lang in language) {
      if (language[lang]) {
        remove("selected", language[lang]);
      }
    }
    if (language[this._currentLanguage]) {
      add("selected", language[this._currentLanguage]);
    }
  }

  _updateLanguageAttributes() {
    document.documentElement.setAttribute("lang", this._currentLanguage);
    document.documentElement.setAttribute("data-lang", this._currentLanguage);
  }

  _switchLanguage(evt, clickedLang) {
    clickedLang = evt.currentTarget.getAttribute("data-lang");
    if (this._currentLanguage !== clickedLang) {
      this._currentLanguage = clickedLang;
      localStorage.setItem("selectedLanguage", this._currentLanguage);
      loadTranslations(this._currentLanguage);
      updateTranslations();
      this._setLanguage();
      this._updateLanguageAttributes();
      callIfFunction(this._callbackAuthStatusAuthRoute);
      callIfFunction(this._callbackAuthStatusMainRoute);
    }
  }

  addLangSwitchListeners() {
    addEventToDOM("click", this._switchLanguage.bind(this), this._enLang);
    addEventToDOM("click", this._switchLanguage.bind(this), this._ptLang);
  }
}
