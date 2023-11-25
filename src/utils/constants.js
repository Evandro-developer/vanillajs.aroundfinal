import { queryElement } from "./helpers.js";

export const userEmailSelector = "#user-email";
export const authStatusSelector = "#auth-status";

export const heartIconEnabled = require("../images/heart_icon_enabled.svg");
export const heartIconDisabled = require("../images/heart_icon_disabled.svg");

export const imgSucess = require("../images/success_icon.svg");
export const imgError = require("../images/error_icon.svg");

export const { root, userEmail, authStatus } = {
  root: queryElement("#root"),
  userEmail: queryElement("#user-email"),
  authStatus: queryElement("#auth-status"),
};

export const {
  openPopupAvatar,
  popupAvatar,
  popupFormAvatar,
  headingPopupAvatar,
  popupAvatarButtonEdit,
  popupAvatarButtonSubmit,
  imgLinkInputAvatar,
  imgLinkOutputAvatar,
} = {
  openPopupAvatar: "popup_avatar-edit__opened",
  popupAvatar: queryElement(".popup_avatar-edit"),
  popupFormAvatar: queryElement(".popup__form_avatar-edit"),
  headingPopupAvatar: queryElement("#popup__heading_avatar-edit"),
  popupAvatarButtonEdit: queryElement("#button-avatar-edit"),
  popupAvatarButtonSubmit: queryElement("#popup__button_avatar-edit"),
  imgLinkInputAvatar: queryElement(".popup__input_type_avatar-img-link"),
  imgLinkOutputAvatar: queryElement(".profile__avatar"),
};

export const {
  openPopupProfile,
  popupProfile,
  popupProfileForm,
  headingPopupProfile,
  nameInputProfile,
  jobInputProfile,
  nameOutputProfile,
  jobOutputProfile,
  btnSubmitProfile,
  btnCloseProfile,
  btnEditProfile,
  profileAvatar,
} = {
  openPopupProfile: "popup__opened",
  popupProfile: queryElement("#popup"),
  popupProfileForm: queryElement(".popup__form"),
  headingPopupProfile: queryElement("#popup__heading_profile"),
  nameInputProfile: queryElement(".popup__input_type_name"),
  jobInputProfile: queryElement(".popup__input_type_job"),
  nameOutputProfile: queryElement(".profile__title"),
  jobOutputProfile: queryElement(".profile__subtitle"),
  btnSubmitProfile: queryElement(".popup__button"),
  btnCloseProfile: queryElement(".popup__closed-btn"),
  btnEditProfile: queryElement(".button-edit"),
  profileAvatar: queryElement(".profile__avatar"),
};

export const {
  openPopupCardAdd,
  popupCardAdd,
  popupCardAddForm,
  headingPopupCardAdd,
  popupCardAddButtonSubmit,
  placeInputCardAdd,
  imgLinkInputCardAdd,
  placeOutputCardAdd,
  imgLinkOutputCardAdd,
  btnSubmitCardAdd,
  sectionCards,
  elementCard,
} = {
  openPopupCardAdd: "popup_card-add__opened",
  popupCardAdd: queryElement("#popup_card-add"),
  popupCardAddForm: queryElement("#popup__form_card-add"),
  headingPopupCardAdd: queryElement("#popup__heading_card-add"),
  popupCardAddButtonSubmit: queryElement("#popup__button_card-add"),
  placeInputCardAdd: queryElement(".popup__input_type_place"),
  imgLinkInputCardAdd: queryElement(".popup__input_type_img-link"),
  placeOutputCardAdd: queryElement(".card__title"),
  imgLinkOutputCardAdd: queryElement(".card__image"),
  btnSubmitCardAdd: queryElement(".popup__button_card-add"),
  sectionCards: queryElement(".cards"),
  elementCard: queryElement(".card"),
};

export const {
  openPopupCardImg,
  popupCardImgOpen,
  popupCardImg,
  popupCardName,
} = {
  openPopupCardImg: "img-popup-card__opened",
  popupCardImgOpen: queryElement(".img-popup-card"),
  popupCardImg: queryElement(".img-popup-card__image"),
  popupCardName: queryElement(".img-popup-card__title"),
};

export const {
  openPopupWithConfirmation,
  popupWithConfirmation,
  popupFormWithConfirmation,
  headingPopupWithConfirmation,
  popupBtnWithConfirmation,
} = {
  openPopupWithConfirmation: "popup_with-confirmation__opened",
  popupWithConfirmation: queryElement(".popup_with-confirmation"),
  popupFormWithConfirmation: queryElement(".popup__form_with-confirmation"),
  headingPopupWithConfirmation: queryElement(
    "#popup__heading_with-confirmation"
  ),
  popupBtnWithConfirmation: queryElement(".popup__button_with-confirmation"),
};
