import { t } from "../utils/Translator";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import apiInstance from "../api/Api.js";
import {
  queryElement,
  addEventToDOM,
  setAttributes,
  handleLikeFunctionAsync,
} from "../utils/helpers.js";
import {
  popupCardImg,
  popupCardName,
  heartIconEnabled,
  heartIconDisabled,
} from "../utils/constants.js";

export default class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._getElements();
    this._setTranslatedContent();
    this._setApi = apiInstance;
  }

  _getElements() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._btnTrashIcon = this._cardElement.querySelector(".button-trash-icon");
    this._btnLikeIcon = this._cardElement.querySelector(".button-heart-icon");
    this._likesCounter = this._cardElement.querySelector(".card__likes");
  }

  _setTranslatedContent() {
    this._iconEnabledAlt = t("card.heartIconActivatedAlt");
    this._iconDisabledAlt = t("card.heartIconDeactivatedAlt");
  }

  _getTemplate() {
    const template = queryElement(this._templateSelector);
    const cardElement = template.content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  _handleCardDelete = (evt) => {
    !this._popupWithConfirmation
      ? (this._popupWithConfirmation = new PopupWithConfirmation())
      : null;
    this._popupWithConfirmation.handleFormOpen(evt);
    this._popupWithConfirmation.handleFormSubmit(evt, this._data._id);
  };

  _handleImageCardOpen = () => {
    !this._popupWithImage
      ? (this._popupWithImage = new PopupWithImage())
      : null;
    this._popupWithImage.handlePopupImageOpen(
      popupCardImg,
      popupCardName,
      this._data
    );
  };

  async _fetchCurrentUserId() {
    this._currentUser = await this._setApi.getUserInfo();
    this._currentUserId = this._currentUser._id;
    return this._currentUser;
  }

  async _setLikeButtonState() {
    await this._fetchCurrentUserId();
    const isLiked = this._data.likes.some(
      (user) => user._id === this._currentUserId
    );
    setAttributes(this._btnLikeIcon, {
      src: isLiked ? heartIconEnabled : heartIconDisabled,
      alt: isLiked ? this._iconEnabledAlt : this._iconDisabledAlt,
    });
    this._btnLikeIcon.setAttribute("data-liked", isLiked ? "true" : "false");
  }

  async _updateLikes() {
    this._likesCounter.textContent = this._data.likes.length;
    await this._setLikeButtonState();
  }

  _handleCardLike = (evt) => {
    handleLikeFunctionAsync(
      this,
      evt,
      "button-heart-icon",
      this._iconEnabledAlt,
      this._iconDisabledAlt,
      heartIconEnabled,
      heartIconDisabled,
      () => this._updateLikes(),
      this._setApi,
      this._setApi.addLike,
      this._setApi.removeLike,
      this._currentUserId,
      this._data._id
    );
  };

  async _updateDeleteButton() {
    await this._fetchCurrentUserId();
    if (this._data.owner._id === this._currentUserId) {
      this._btnTrashIcon.style.display = "block";
    }
  }

  _setEventListeners() {
    addEventToDOM("mousedown", this._handleCardDelete, this._btnTrashIcon);
    addEventToDOM("mousedown", this._handleImageCardOpen, this._cardImage);
    addEventToDOM("mousedown", this._handleCardLike, this._btnLikeIcon);
  }

  generateCardInstance() {
    setAttributes(this._cardImage, {
      src: this._data.link,
      alt: `Imagem de ${this._data.placeName}`,
    });
    this._cardTitle.textContent = this._data.placeName;
    this._updateLikes();
    this._updateDeleteButton();
    this._setEventListeners();
    return this._cardElement;
  }
}
