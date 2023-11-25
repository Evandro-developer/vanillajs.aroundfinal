import authInstance from "../api/auth";
import { queryElement, addEventToDOM } from "../utils/helpers";
import { initializeAuthFormValidator } from "../utils/globalValidationRules";
import InfoTooltip from "./InfoToolTip";

export default class AuthFormLogin {
  constructor(selector, routesInstance) {
    this._element = queryElement(selector);
    this._routesInstance = routesInstance;
    this._auth = authInstance;
    this._isTooltipOpen = false;
    this._getElements();
    this._setValidation();
    this._setEventListeners();
  }

  _getElements() {
    this._authEmailInput = queryElement("#auth-email");
    this._authPasswordInput = queryElement("#auth-password");
  }

  _loginSuccess(userData) {
    this._routesInstance.updateUI(userData);
    this._routesInstance.navigate("/main", userData);
    this._routesInstance.loadContentBasedOnRoute(userData);
  }

  async _showErrorTooltip() {
    if (this._isTooltipOpen) return;
    this._isTooltipOpen = true;
    const tooltip = new InfoTooltip(
      { success: false },
      "#infoToolTip-template"
    ).generateTooltipInstance();
    this._routesInstance._root.appendChild(tooltip);
  }

  _handleLogin = async (evt) => {
    evt.preventDefault();
    if (!this._formValidator.isFormValid()) {
      return;
    }
    const email = this._authEmailInput.value;
    const password = this._authPasswordInput.value;
    try {
      const userData = await this._auth.authorize(email, password);
      if (userData) {
        this._loginSuccess(userData);
      } else {
        console.error("Erro durante o login: Usuário não autorizado");
        await this._showErrorTooltip();
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      await this._showErrorTooltip();
      return;
    }
  };

  _setValidation() {
    this._formValidator = initializeAuthFormValidator(this._element);
    this._formValidator.enableValidation();
  }

  _setEventListeners() {
    addEventToDOM("submit", this._handleLogin, this._element);
  }
}
