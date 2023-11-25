import { t } from "../utils/Translator";
import Popup from "./Popup.js";
import apiInstance from "../api/Api.js";
import {
  addEventToDOM,
  closestElement,
  preventDefaultAndCall,
  handleDeleteFunction,
} from "../utils/helpers.js";
import {
  popupFormWithConfirmation,
  headingPopupWithConfirmation,
  popupBtnWithConfirmation,
} from "../utils/constants.js";

export default class PopupWithConfirmation extends Popup {
  constructor() {
    super(".popup_with-confirmation");
    this._getElements();
    this.setEventListenersPopup();
    this._setTranslatedContent();
    this._setApi = apiInstance;
  }

  _getElements() {
    this._popupForm = popupFormWithConfirmation;
    this._heading = headingPopupWithConfirmation;
    this._btnSubmit = popupBtnWithConfirmation;
  }

  _setTranslatedContent() {
    this._heading.textContent = t("confirmationPopup.title");
    this._btnSubmit.textContent = t("confirmationPopup.yesBtn");
  }

  handleFormOpen = async (evt) => {
    evt.preventDefault();
    this._selectedElement = closestElement(evt, ".card");
    this._deleteBtn = closestElement(evt, ".button-trash-icon");
    if (this._selectedElement) {
      this._popupForm;
      this.toggle();
    }
  };

  handleFormSubmit = async (evt, cardId) => {
    evt.preventDefault();
    this._setTranslatedContent();
    if (this._btnSubmit && !this.deletePromise) {
      this.deletePromise = new Promise((resolve) => {
        addEventToDOM(
          "submit",
          preventDefaultAndCall(() => {
            this._btnSubmit.textContent = t("confirmationPopup.deleting");
            resolve();
          }),
          this._popupForm
        );
      })
        .then(async () => {
          await this._setApi.deleteCard(cardId);
        })
        .then(() => {
          handleDeleteFunction(evt, "button-trash-icon", "card");
          this._btnSubmit.textContent = t("confirmationPopup.deleted");
        })
        .finally(() => {
          this.toggle();
        });
    }
  };
}
