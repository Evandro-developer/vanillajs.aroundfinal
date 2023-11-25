import { t } from "../utils/Translator";
import AuthFormLogin from "./AuthFormLogin";
import AuthFormRegister from "./AuthFormRegister";
import {
  queryElement,
  preventDefaultAndCall,
  setElementProperties,
  applyEventListeners,
} from "../utils/helpers";

export default class AuthRender {
  constructor(
    root,
    navigateCallback,
    routesInstance,
    headerInstance,
    footerInstance
  ) {
    this._root = root;
    this._navigateCallback = navigateCallback;
    this.routesInstance = routesInstance;
    this._headerInstance = headerInstance;
    this._footerInstance = footerInstance;
    this._isRouteLogin = true;
  }

  _getTemplate() {
    const template = queryElement("#auth-container-template")
      .content.querySelector(".auth")
      .cloneNode(true);
    const newHeaderInstance =
      this._headerInstance.generateHeaderInstance("#header-template");
    const header = template.querySelector(".header");
    header.appendChild(newHeaderInstance);
    const newFooterInstance =
      this._footerInstance.generateFooterInstance("#footer-template");
    const footer = template.querySelector(".footer");
    footer.appendChild(newFooterInstance);
    return template;
  }

  _renderAuthForm(isRouteLogin) {
    const AuthFormClass = isRouteLogin ? AuthFormLogin : AuthFormRegister;
    this._authFormInstance = new AuthFormClass(
      "#auth-form",
      this.routesInstance
    );
  }

  _getAuthElements() {
    return {
      authTitle: queryElement("#auth-container__title"),
      authSubmitButton: queryElement("#auth-submit-button"),
      toggleAuthRoute: queryElement("#toggle-auth-route"),
      emailInput: queryElement("#auth-email"),
      passwordInput: queryElement("#auth-password"),
    };
  }

  _getHeaderElements() {
    return {
      authStatus: queryElement("#auth-status"),
    };
  }

  _setHeaderTextContent(elements) {
    const authStatus = this._isRouteLogin ? "header.signup" : "header.login";
    elements.authStatus.textContent = t(authStatus);
  }

  _setupAuth(elements) {
    this._setAuthTextContent(elements);
    this._setAuthEventListeners(elements);
    this._setInputPlaceholders(elements, !this._isRouteLogin);
  }

  _setAuthTextContent() {
    const { authTitle, authSubmitButton, toggleAuthRoute } =
      this._getAuthElements();
    const title = this._isRouteLogin ? "login.title" : "register.title";
    const submit = this._isRouteLogin
      ? "login.submitAuth"
      : "register.submitAuth";
    const toggleMessage = this._isRouteLogin
      ? "login.notAMember"
      : "register.alreadyAMember";
    const properties = [
      { textContent: t(title) },
      { textContent: t(submit) },
      { textContent: t(toggleMessage) },
    ];
    setElementProperties(
      [authTitle, authSubmitButton, toggleAuthRoute],
      properties
    );
  }

  _setAuthEventListeners(elements) {
    const header = this._getHeaderElements();
    const events = [
      {
        type: "mousedown",
        callback: preventDefaultAndCall(() => this._toggleFormType()),
        element: elements.toggleAuthRoute,
      },
      {
        type: "mousedown",
        callback: preventDefaultAndCall(() => this._toggleFormType()),
        element: header.authStatus,
      },
    ];
    applyEventListeners(events);
  }

  _setInputPlaceholders(elements, isSignup) {
    const emailPlaceholderKey = isSignup
      ? "register.emailPlaceholder"
      : "login.emailPlaceholder";
    const passwordPlaceholderKey = isSignup
      ? "register.passwordPlaceholder"
      : "login.passwordPlaceholder";
    const emailPlaceholder = t(emailPlaceholderKey);
    const passwordPlaceholder = t(passwordPlaceholderKey);
    elements.emailInput.placeholder = emailPlaceholder;
    elements.passwordInput.placeholder = passwordPlaceholder;
  }

  _toggleFormType() {
    this._isRouteLogin = !this._isRouteLogin;
    const newPath = this._isRouteLogin ? "/signin" : "/signup";
    this._navigateCallback(newPath);
    this.generateAuthPage(this._isRouteLogin);
  }

  renderUIBasedOnLoginStatus = (isLoggedIn, userData) => {
    isLoggedIn ? this.renderLoggedInUI(userData) : this.renderLoggedOutUI();
  };

  renderLoggedInUI = (path, userData) => {
    userData ? this._navigateCallback(path, userData) : null;
  };

  renderLoggedOutUI = () => this.generateAuthPage(this._isRouteLogin);

  updatelangSwitchAuthRoutes() {
    this._setAuthTextContent(this._getAuthElements());
    this._setInputPlaceholders(this._getAuthElements(), !this._isRouteLogin);
    this._setHeaderTextContent(this._getHeaderElements());
  }

  generateAuthPage(isRouteLogin) {
    this._root.innerHTML = "";
    this._isRouteLogin = isRouteLogin;
    const authRender = this._getTemplate();
    this._root.appendChild(authRender);
    this._renderAuthForm(isRouteLogin);
    const elements = this._getAuthElements();
    this._setupAuth(elements);
    this.updatelangSwitchAuthRoutes();
  }
}
