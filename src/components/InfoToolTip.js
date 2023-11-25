import { t } from "../utils/Translator";
import { imgSucess, imgError } from "../utils/constants";
import {
  queryElement,
  add,
  handleOutsideClickFunction,
  handleKeyPressFunction,
  animateOpacity,
  applyEventListeners,
} from "../utils/helpers";

export default class InfoTooltip {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._tooltip = this._getTemplate();
    this._tooltipImg = this._tooltip.querySelector(".infoToolTip__img");
    this._tooltipText = this._tooltip.querySelector(".infoToolTip__text");
    this._btnClosed = this._tooltip.querySelector(".infoToolTip__closed-btn");
    this._openedClass = "infoToolTip__opened";
  }

  _getTemplate() {
    const template = queryElement(this._templateSelector);
    const tooltip = template.content
      .querySelector(".infoToolTip")
      .cloneNode(true);
    return tooltip;
  }

  _addDisplayCallback = () => add(this._openedClass, this._tooltip);

  _removeDisplayCallback = () => {
    animateOpacity(this._tooltip, 1, 0, 300, true);
  };

  _closeAndProceed() {
    this._removeDisplayCallback();
    if (this._proceedAction) {
      this._proceedAction();
    }
  }

  _setEventListeners() {
    const events = [
      {
        type: "mousedown",
        callback: this._closeAndProceed.bind(this),
        element: this._btnClosed,
      },
      {
        type: "mousedown",
        callback: handleOutsideClickFunction(
          "infoToolTip",
          this._closeAndProceed.bind(this)
        ),
        element: document,
      },
      {
        type: "keydown",
        callback: handleKeyPressFunction(this._closeAndProceed.bind(this)),
        element: document,
      },
    ];
    applyEventListeners(events);
  }

  _updateContent(data) {
    this._tooltipImg.src = data.success ? imgSucess : imgError;
    this._tooltipImg.alt = t(data.success ? "successIcon" : "errorIcon");
    this._tooltipText.textContent = t(data.success ? "success" : "error");
  }

  generateTooltipInstance(proceedAction) {
    this._updateContent(this._data);
    this._addDisplayCallback();
    this._setEventListeners();
    this._proceedAction = proceedAction;
    return this._tooltip;
  }
}
