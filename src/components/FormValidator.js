import { t } from "../utils/Translator";
import { globalValidationRules } from "../utils/globalValidationRules";
import { add, remove } from "../utils/helpers";

export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputSelector = this._validationConfig.inputSelector;
    this._buttonSelector = this._validationConfig.buttonSelector;
    this._globalValidationRules = globalValidationRules;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    add(this._validationConfig.inputErrorClass, inputElement);
    add(this._validationConfig.errorClass, errorElement);
    const fieldRules = this._globalValidationRules[inputElement.name];
    let customErrorMessage = errorMessage;

    if (fieldRules) {
      const validityTypes = [
        { type: "typeMismatch", message: fieldRules.patternErrorMessage },
        { type: "valueMissing", message: fieldRules.requiredErrorMessage },
        { type: "tooShort", message: fieldRules.minLengthErrorMessage },
        { type: "tooLong", message: fieldRules.maxLengthErrorMessage },
      ];

      customErrorMessage = validityTypes.reduce((msg, validityType) => {
        if (inputElement.validity[validityType.type] && validityType.message) {
          if (
            validityType.type === "tooShort" ||
            validityType.type === "tooLong"
          ) {
            return t(validityType.message).replace(
              `{${
                validityType.type === "tooShort" ? "minLength" : "maxLength"
              }}`,
              fieldRules[
                validityType.type === "tooShort" ? "minLength" : "maxLength"
              ]
            );
          }
          return t(validityType.message);
        }
        return msg;
      }, errorMessage);

      errorElement.textContent = customErrorMessage;
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    if (errorElement) {
      remove(this._validationConfig.inputErrorClass, inputElement);
      remove(this._validationConfig.errorClass, errorElement);
      errorElement.textContent = "";
    }
  }

  _checkInputValidity(inputElement) {
    !inputElement.validity.valid
      ? this._showInputError(inputElement, inputElement.validationMessage)
      : this._hideInputError(inputElement);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList) {
    const buttonElement = this._formElement.querySelector(this._buttonSelector);
    this._hasInvalidInput(inputList)
      ? add(this._validationConfig.inactiveButtonClass, buttonElement)
      : remove(this._validationConfig.inactiveButtonClass, buttonElement);
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );

    const buttonElement = this._formElement.querySelector(
      this._validationConfig.buttonSelector
    );

    const handleInput = (inputElement) => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    };

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        handleInput(inputElement);
      });
    });
  }

  isFormValid() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    return !this._hasInvalidInput(inputList);
  }

  enableValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    const buttonElement = this._formElement.querySelector(this._buttonSelector);

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      this._setEventListeners(inputElement);
    });
  }
}
