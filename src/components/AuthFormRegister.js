import authInstance from "../api/auth";
import { queryElement, animateOpacity, addEventToDOM } from "../utils/helpers";
import { initializeAuthFormValidator } from "../utils/globalValidationRules";
import InfoTooltip from "./InfoToolTip";

export default class AuthFormRegister {
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

  async _showSuccessTooltip(userData) {
    const tooltip = new InfoTooltip(
      { success: true },
      "#infoToolTip-template"
    ).generateTooltipInstance(async () => {
      await animateOpacity(tooltip, 1, 0, 300, true);
      this._routesInstance.updateUI(userData);
      this._routesInstance.navigate("/signin");
      this._routesInstance.loadContentBasedOnRoute(userData);
    });
    this._routesInstance._root.appendChild(tooltip);
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

  _handleRegister = async (evt) => {
    evt.preventDefault();
    if (!this._formValidator.isFormValid()) {
      return;
    }
    const email = this._authEmailInput.value;
    const password = this._authPasswordInput.value;
    try {
      const userData = await this._auth.register(email, password);
      if (userData) {
        await this._showSuccessTooltip(userData);
      } else {
        console.error("Falha durante o registro: e-mail ou senha não confere");
        await this._showErrorTooltip();
      }
    } catch (error) {
      console.error("Falha durante o registro:", error);
      await this._showErrorTooltip();
    }
  };

  _setValidation() {
    this._formValidator = initializeAuthFormValidator(this._element);
    this._formValidator.enableValidation();
  }

  _setEventListeners() {
    addEventToDOM("submit", this._handleRegister, this._element);
  }
}
