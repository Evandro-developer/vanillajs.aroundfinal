import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super(".img-popup-card");
    this.setEventListenersPopup();
  }

  handlePopupImageOpen(popupCardImg, popupCardName, data) {
    this.toggle();
    popupCardImg.src = data.link;
    popupCardName.textContent = data.placeName;
  }
}
