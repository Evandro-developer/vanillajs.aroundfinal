import { t } from "../utils/Translator";
import Popup from "./Popup.js";
import Card from "./Card.js";
import apiInstance from "../api/Api.js";
import { initializePopupFormValidator } from "../utils/globalValidationRules.js";
import {
  animateOpacity,
  setButtonFunctionById,
  addEventToDOM,
} from "../utils/helpers.js";
import {
  headingPopupCardAdd,
  btnSubmitCardAdd,
  popupCardAddForm,
  sectionCards,
} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({ nameSelector, linkSelector }) {
    super(".popup_card-add");
    this._getElements(nameSelector, linkSelector);
    this._setTranslatedContent();
    this.setEventListenersPopup();
    this._setApi = apiInstance;
    this._sectionCards = sectionCards;
  }

  _getElements(nameSelector, linkSelector) {
    this._name = nameSelector;
    this._link = linkSelector;
    this._heading = headingPopupCardAdd;
    this._btnSubmit = btnSubmitCardAdd;
    this._popupForm = popupCardAddForm;
  }

  _setTranslatedContent() {
    this._heading.textContent = t("addPlacePopup.title");
    this._name.placeholder = t("addPlacePopup.placeNamePlaceholder");
    this._link.placeholder = t("addPlacePopup.imageUrlPlaceholder");
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
    const { value: placeName } = this._name;
    const { value: link } = this._link;
    return { placeName, link };
  };

  _setInputValues = async (evt) => {
    evt.preventDefault();
    if (!this._formValidator.isFormValid()) {
      return;
    }
    this._setTranslatedContent();
    this._btnSubmit.textContent = t("common.savingBtn");
    const { placeName, link } = this._fetchInputValues();
    if (placeName && link) {
      this._newCard = await this._setApi.addNewCard(placeName, link);
      this._newCardInstance = new Card(this._newCard, "#cards-template");
      this._cardItem = this._newCardInstance.generateCardInstance();
      this._sectionCards.prepend(this._cardItem);
      this._btnSubmit.textContent = t("common.savedBtn");
      animateOpacity(this._cardItem, 0, 1, 300);
      this._setTranslatedContent();
      this.toggle();
      this._popupForm.reset();
      this._setInputValidation();
    }
  };

  _getButtonForFunctions = () => ({
    "button-add": this._getInputValues,
    "popup__button_card-add": this._setInputValues,
  });

  _setButtonForFunctions = (evt) =>
    setButtonFunctionById(this._getButtonForFunctions(), evt);

  setEventListeners = () => {
    addEventToDOM("mousedown", this._setButtonForFunctions, document);
  };
}
