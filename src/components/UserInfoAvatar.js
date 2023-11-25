import { t } from "../utils/Translator";
import Popup from "./Popup.js";
import apiInstance from "../api/Api.js";
import { initializePopupFormValidator } from "../utils/globalValidationRules.js";
import { setButtonFunctionById, addEventToDOM } from "../utils/helpers.js";
import {
  headingPopupAvatar,
  imgLinkInputAvatar,
  imgLinkOutputAvatar,
  popupAvatarButtonSubmit,
  popupFormAvatar,
} from "../utils/constants.js";

export default class UserInfoAvatar extends Popup {
  constructor(linkSelector) {
    super(".popup_avatar-edit");
    this._getElements(linkSelector);
    this._setTranslatedContent();
    this.setEventListenersPopup();
    this._setApi = apiInstance;
  }

  _getElements(linkSelector) {
    this._link = linkSelector;
    this._heading = headingPopupAvatar;
    this._linkInput = imgLinkInputAvatar;
    this._linkOutput = imgLinkOutputAvatar;
    this._btnSubmit = popupAvatarButtonSubmit;
    this._popupForm = popupFormAvatar;
  }

  _setTranslatedContent() {
    this._heading.textContent = t("editAvatarPopup.title");
    this._linkInput.placeholder = t("editAvatarPopup.avatarPlaceholder");
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
    const { value: link } = this._linkInput;
    return { link };
  };

  _setInputValues = async (evt) => {
    evt.preventDefault();
    if (!this._formValidator.isFormValid()) {
      return;
    }
    this._btnSubmit.textContent = t("common.savingBtn");
    const { link } = this._fetchInputValues();
    if (link) {
      await this._setApi.addNewUserInfoAvatar(link);
      this._linkOutput.src = link;
      this._btnSubmit.textContent = t("common.savedBtn");
      this.toggle();
      this._popupForm.reset();
      this._setInputValidation();
    }
  };

  _getButtonForFunctions = () => ({
    "button-avatar-edit": this._getInputValues,
    "popup__button_avatar-edit": this._setInputValues,
  });

  _setButtonForFunctions = (evt) =>
    setButtonFunctionById(this._getButtonForFunctions(), evt);

  _setUpdateValues = async () => {
    this._userInfoAvatar = await this._setApi.getUserInfo();
    this._linkOutput.src = this._userInfoAvatar.avatar;
  };

  setEventListeners = () => {
    this._setUpdateValues();
    addEventToDOM("mousedown", this._setButtonForFunctions, document);
  };
}
