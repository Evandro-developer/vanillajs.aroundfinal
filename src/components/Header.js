import { t } from "../utils/Translator";
import { queryElement, addEventToDOM } from "../utils/helpers";
import LanguageManager from "./LanguageManager";

export default class Header {
  constructor(templateSelector, callbackAuthStatusAuthRoute, routesInstance) {
    this._templateSelector = templateSelector;
    this.languageManager = new LanguageManager(
      callbackAuthStatusAuthRoute,
      this._langSwitchAuthStatusMainRoute.bind(this)
    );
    this._routesInstance = routesInstance;
    this._currentLanguage = this.languageManager.getCurrentLanguage();
  }

  generateHeaderInstance() {
    const template = queryElement(this._templateSelector).content;
    this._header = template.cloneNode(true);
    this._userEmail = this._header.querySelector("#user-email");
    this._authStatus = this._header.querySelector("#auth-status");
    this.languageManager.getLanguageElements(this._header);
    this._langSwitchAuthStatusMainRoute();
    this._setEventListeners();
    return this._header;
  }

  updateAuthStatusText() {
    const isRouteLogin = this._routesInstance.getCurrentRoute() === "/signin";
    const authStatusText = isRouteLogin ? "header.signup" : "header.login";
    this._authStatus.textContent = t(authStatusText);
  }

  updateUserEmail(route) {
    if (route === "/main" && this._isUserAuthenticated()) {
      this._userEmail.textContent = this._getUserEmail();
    } else {
      this._userEmail.textContent = "";
    }
  }

  _isUserAuthenticated() {
    return this._routesInstance.userIsLoggedIn();
  }

  _getUserEmail() {
    return this._routesInstance.getUserEmail();
  }

  _langSwitchAuthStatusMainRoute() {
    const translations = {
      "/main": "header.logout",
    };
    const route = this._routesInstance
      ? this._routesInstance.getCurrentRoute()
      : "";
    if (translations[route]) {
      this._authStatus.textContent = t(translations[route]);
    }
  }

  _addListenerAuthStatusMainRoute() {
    addEventToDOM(
      "click",
      () => {
        this._routesInstance.logout();
      },
      this._authStatus
    );
  }

  _setEventListeners() {
    this._addListenerAuthStatusMainRoute();
    this.languageManager.addLangSwitchListeners(this._currentLanguage);
  }
}
