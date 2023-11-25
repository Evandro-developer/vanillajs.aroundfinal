import { t } from "../utils/Translator";
import Popup from "./Popup.js";
import apiInstance from "../api/Api.js";
import { initializePopupFormValidator } from "../utils/globalValidationRules.js";
import { setButtonFunctionById, addEventToDOM } from "../utils/helpers.js";
import {
  headingPopupProfile,
  nameOutputProfile,
  jobOutputProfile,
  btnSubmitProfile,
  popupProfileForm,
} from "../utils/constants.js";

export default class UserInfo extends Popup {
  constructor({ nameSelector, jobSelector }) {
    super(".popup");
    this._getElements(nameSelector, jobSelector);
    this._setTranslatedContent();
    this.setEventListenersPopup();
    this._setApi = apiInstance;
  }

  _getElements(nameSelector, jobSelector) {
    this._nameInput = nameSelector;
    this._jobInput = jobSelector;
    this._heading = headingPopupProfile;
    this._nameOutput = nameOutputProfile;
    this._jobOutput = jobOutputProfile;
    this._btnSubmit = btnSubmitProfile;
    this._popupForm = popupProfileForm;
  }

  _setTranslatedContent() {
    this._heading.textContent = t("editProfilePopup.title");
    this._nameInput.placeholder = t("editProfilePopup.namePlaceholder");
    this._jobInput.placeholder = t("editProfilePopup.professionPlaceholder");
    this._btnSubmit.textContent = t("common.saveBtn");
  }

  _setInputValidation() {
    this._formValidator = initializePopupFormValidator(this._popupForm);
    this._formValidator.enableValidation();
  }

  _getInputValues = (evt) => {
    evt.preventDefault();
    this._setTranslatedContent();
    this.toggle();
    this._popupForm.reset();
    this._setInputValidation();
  };

  _fetchInputValues = () => {
    const { value: name } = this._nameInput;
    const { value: job } = this._jobInput;
    return { name, job };
  };

  _setInputValues = async (evt) => {
    evt.preventDefault();
    if (!this._formValidator.isFormValid()) {
      return;
    }
    this._btnSubmit.textContent = t("common.savingBtn");
    const { name, job } = this._fetchInputValues();
    if (name && job) {
      await this._setApi.addNewUserInfo(name, job);
      this._nameOutput.textContent = name;
      this._jobOutput.textContent = job;
      this._btnSubmit.textContent = t("common.savedBtn");
      this.toggle();
      this._popupForm.reset();
      this._setInputValidation();
    }
  };

  _getButtonForFunctions = () => ({
    "button-edit": this._getInputValues,
    popup__button: this._setInputValues,
  });

  _setButtonForFunctions = (evt) =>
    setButtonFunctionById(this._getButtonForFunctions(), evt);

  _setUpdateValues = async () => {
    this._userInfo = await this._setApi.getUserInfo();
    this._nameOutput.textContent = this._userInfo.name;
    this._jobOutput.textContent = this._userInfo.about;
  };

  setEventListeners = () => {
    this._setUpdateValues();
    addEventToDOM("mousedown", this._setButtonForFunctions, document);
  };
}
