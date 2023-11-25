import {
  queryElement,
  removeStartingDot,
  remove,
  toggle,
  togglePopupDisplay,
  handleKeyPressFunction,
  handleOutsideClickFunction,
  addEventToDOM,
  preventDefaultAndCall,
} from "../utils/helpers.js";

export default class Popup {
  constructor(targetElement) {
    this._popupElement = queryElement(targetElement);
    this._popupElementWithoutDot = removeStartingDot(targetElement)();
    this._openedClassName = `${this._popupElementWithoutDot}__opened`;
    this._closeButtons = Array.from(
      queryElement('[id$="__closed-btn"]', "querySelectorAll")
    );
  }

  _toggleDisplayCallback = () =>
    toggle(this._openedClassName, this._popupElement);

  _removeDisplayCallback = () =>
    remove(this._openedClassName, this._popupElement);

  _handleEscClose = () =>
    addEventToDOM(
      "keydown",
      handleKeyPressFunction(this._removeDisplayCallback),
      document
    );

  _handleOutsideClickClose = () =>
    addEventToDOM(
      "mousedown",
      handleOutsideClickFunction(
        this._popupElementWithoutDot,
        this._removeDisplayCallback
      ),
      this._popupElement
    );

  _getCloseButtonsForSetEventListeners() {
    this._closeButtons.forEach((button) => {
      addEventToDOM(
        "mousedown",
        preventDefaultAndCall(() => {
          this._removeDisplayCallback();
        }),
        button
      );
    });
  }

  toggle = () =>
    togglePopupDisplay(
      this._openedClassName,
      this._popupElement,
      this._toggleDisplayCallback
    );

  setEventListenersPopup = () => {
    this._handleEscClose();
    this._handleOutsideClickClose();
    this._getCloseButtonsForSetEventListeners();
  };
}
