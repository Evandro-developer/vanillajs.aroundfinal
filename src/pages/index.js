import "../styles/index.css";
import {
  nameInputProfile,
  jobInputProfile,
  imgLinkInputAvatar,
  placeInputCardAdd,
  imgLinkInputCardAdd,
  root,
} from "../utils/constants.js";
import { addEventToDOM } from "../utils/helpers";
import authInstance from "../api/auth";
import apiInstance from "../api/Api";
import UserInfo from "../components/UserInfo.js";
import UserInfoAvatar from "../components/UserInfoAvatar.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Header from "../components/Header";
import Footer from "../components/footer";
import AuthRender from "../components/AuthRender.js";
import Routes from "../components/Routes";
import Section from "../components/Section.js";
import Card from "../components/Card.js";

const token = localStorage.getItem("token");
let currentUserId = null;

const userData = token
  ? authInstance.getContent().then((user) => {
      currentUserId = user._id;
      return apiInstance.getAllCards();
    })
  : Promise.resolve(null);

const userInfo = new UserInfo({
  nameSelector: nameInputProfile,
  jobSelector: jobInputProfile,
});

const userInfoAvatar = new UserInfoAvatar({
  linkSelector: imgLinkInputAvatar,
});

const popupWithForm = new PopupWithForm({
  nameSelector: placeInputCardAdd,
  linkSelector: imgLinkInputCardAdd,
});

const authRoutesHeaderInstance = new Header("#header-template", () => {
  authRender.updatelangSwitchAuthRoutes();
});

const newFooterInstance = new Footer("#footer-template");

const authRender = new AuthRender(
  root,
  (path) => routes.navigate(path),
  routes,
  authRoutesHeaderInstance,
  newFooterInstance
);

const routes = new Routes(root, authRender);

const headerSection = new Section(
  {
    items: [{}],
    renderer: ({}) => {
      const mainHeaderInstance = new Header("#header-template", null, routes);
      const headerItem = mainHeaderInstance.generateHeaderInstance();
      mainHeaderInstance.updateUserEmail("/main");
      headerSection.prependItem(headerItem);
    },
  },
  ".header"
);

const cardsSection = new Section(
  {
    items: userData,
    renderer: (card) => {
      const newCardInstance = new Card(card, "#cards-template");
      newCardInstance.currentUserId = currentUserId;
      const cardItem = newCardInstance.generateCardInstance();
      cardsSection.prependItem(cardItem);
    },
  },
  ".cards"
);

const footerSection = new Section(
  {
    items: [{}],
    renderer: ({}) => {
      const footerItem = newFooterInstance.generateFooterInstance();
      footerSection.prependItem(footerItem);
    },
  },
  ".footer"
);

const loadAppContentToDOM = () => {
  authRender.routesInstance = routes;
  routes.setEventListeners();
  if (token) {
    headerSection.renderItems();
    cardsSection.renderItems();
    footerSection.renderItems();
    userInfo.setEventListeners();
    userInfoAvatar.setEventListeners();
    popupWithForm.setEventListeners();
  }
};

addEventToDOM("DOMContentLoaded", loadAppContentToDOM, document);
