import FormValidator from "../components/FormValidator";

export const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,100}$/;
export const urlRegex =
  /^(https?:\/\/)?(www\.)?[\w\d.-]+(:\d+)?(\/[\w\d._~:/?%#[\]@!$&'()*+,;=-]*)?(#\w*)?$/i;
export const textRegex = /^.{2,200}$/;

export const globalValidationRules = {
  email: {
    requiredErrorMessage: "validation.emailRequired",
    pattern: emailRegex,
    patternErrorMessage: "validation.emailPattern",
  },
  password: {
    requiredErrorMessage: "validation.passwordRequired",
    pattern: passwordRegex,
    minLength: 6,
    minLengthErrorMessage: "validation.passwordMinLength",
    maxLength: 20,
    maxLengthErrorMessage: "validation.passwordMaxLength",
  },
  avatar: {
    requiredErrorMessage: "validation.avatarRequired",
    pattern: urlRegex,
    patternErrorMessage: "validation.avatarPattern",
  },
  name: {
    requiredErrorMessage: "validation.nameRequired",
    pattern: textRegex,
    minLength: 2,
    minLengthErrorMessage: "validation.namePattern",
    maxLength: 200,
    maxLengthErrorMessage: "validation.namePattern",
  },
  about: {
    requiredErrorMessage: "validation.aboutRequired",
    pattern: textRegex,
    minLength: 2,
    minLengthErrorMessage: "validation.aboutPattern",
    maxLength: 200,
    maxLengthErrorMessage: "validation.aboutPattern",
  },
  placeName: {
    requiredErrorMessage: "validation.placeNameRequired",
    pattern: textRegex,
    minLength: 2,
    minLengthErrorMessage: "validation.placeNamePattern",
    maxLength: 200,
    maxLengthErrorMessage: "validation.placeNamePattern",
  },
  link: {
    requiredErrorMessage: "validation.linkRequired",
    pattern: urlRegex,
    patternErrorMessage: "validation.linkPattern",
  },
};

const getValidations = (type) => {
  const validationConfigs = {
    popup: {
      inputSelector: ".popup__input",
      buttonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    },
    auth: {
      inputSelector: ".auth-container__input",
      buttonSelector: ".button-auth",
      inactiveButtonClass: "button-auth_disabled",
      inputErrorClass: "auth-container__input_type_error",
      errorClass: "auth-container__error_visible",
    },
  };

  return validationConfigs[type];
};

export const initializePopupFormValidator = (formSelector) => {
  const validationConfig = getValidations("popup");
  validationConfig.formSelector = formSelector;
  return new FormValidator(validationConfig, formSelector);
};

export const initializeAuthFormValidator = (formSelector) => {
  const validationConfig = getValidations("auth");
  validationConfig.formSelector = formSelector;
  return new FormValidator(validationConfig, formSelector);
};
