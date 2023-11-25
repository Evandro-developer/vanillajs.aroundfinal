import { t } from "../utils/Translator";
import {
  queryElement,
  setElementColor,
  applyEventListeners,
} from "../utils/helpers";

const WHITE_COLOR = "#FFFFFF";
const GRAY_COLOR = "#545454";

export default class Footer {
  constructor(templateSelector) {
    this._templateSelector = templateSelector;
  }

  generateFooterInstance() {
    const template = queryElement(this._templateSelector);
    this._footer = template.content.cloneNode(true);
    this._getElements();
    this._updateFooter();
    this._setEventListeners();
    return this._footer;
  }

  _getElements() {
    this._linkedinIcon = this._footer.querySelector(".footer__linkedin-icon");
    this._githubIcon = this._footer.querySelector(".footer__github-icon");
    this._author = this._footer.querySelector(".footer__author");
    this._profession = this._footer.querySelector(".footer__profession");
  }

  _handleSvgLinkedinIcon(iconElement, backgroundFill, iconFill) {
    const style = iconElement.querySelector("style");
    style.innerHTML = `
        .background { fill: ${backgroundFill}; }
        .icon-color { fill: ${iconFill}; }
    `;
  }

  _handleSvgGithubIcon(iconElement, backgroundFill, iconFill) {
    const background = iconElement.querySelector("rect");
    const iconPaths = iconElement.querySelectorAll(".svgShape");
    background.setAttribute("fill", backgroundFill);
    iconPaths.forEach((path) => {
      path.setAttribute("fill", iconFill);
    });
  }

  _updateFooter() {
    this._author.textContent = t("footer.author");
    this._profession.textContent = t("footer.profession");
  }

  _setEventListeners() {
    const events = [
      {
        type: "mouseover",
        callback: () => {
          setElementColor(this._author, WHITE_COLOR);
          this._handleSvgLinkedinIcon(
            this._linkedinIcon,
            WHITE_COLOR,
            GRAY_COLOR
          );
        },
        element: this._linkedinIcon,
      },
      {
        type: "mouseout",
        callback: () => {
          setElementColor(this._author, GRAY_COLOR);
          this._handleSvgLinkedinIcon(
            this._linkedinIcon,
            GRAY_COLOR,
            WHITE_COLOR
          );
        },
        element: this._linkedinIcon,
      },
      {
        type: "mouseover",
        callback: () => {
          setElementColor(this._profession, WHITE_COLOR);
          this._handleSvgGithubIcon(this._githubIcon, GRAY_COLOR, WHITE_COLOR);
        },
        element: this._githubIcon,
      },
      {
        type: "mouseout",
        callback: () => {
          setElementColor(this._profession, GRAY_COLOR);
          this._handleSvgGithubIcon(this._githubIcon, WHITE_COLOR, GRAY_COLOR);
        },
        element: this._githubIcon,
      },
    ];
    applyEventListeners(events);
  }
}
