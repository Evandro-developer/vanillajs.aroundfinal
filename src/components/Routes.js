export default class Routes {
  constructor(root, authRender) {
    this._root = root;
    this._authRender = authRender;
  }

  _initialize = () => {
    if (this.userIsLoggedIn()) {
      this.navigate("/main");
    } else if (window.location.pathname !== "/signin") {
      this.navigate("/signin");
    }
  };

  userIsLoggedIn = () => {
    return Boolean(localStorage.getItem("token"));
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    this.navigate("/signin");
  };

  getUserEmail = () => {
    return localStorage.getItem("userEmail");
  };

  updateUI = (userData) => {
    if (this.userIsLoggedIn()) {
      this._authRender.renderUIBasedOnLoginStatus(true, userData);
    } else {
      this._authRender.renderUIBasedOnLoginStatus(false);
    }
  };

  navigate = (path, userData) => {
    const pathHome = "/main";
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    if (userData) {
      window.location.pathname = pathHome;
    }
    this.updateUI(userData);
  };

  getCurrentRoute = () => {
    return window.location.pathname;
  };

  loadContentBasedOnRoute = (userData) => {
    const route = this.getCurrentRoute();
    const isLoggedIn = this.userIsLoggedIn();
    this._authRender.renderUIBasedOnLoginStatus(isLoggedIn, userData);
    if (!isLoggedIn) {
      const routeActions = {
        "/signup": () => this._authRender.generateAuthPage(true),
        "/signin": () => this._authRender.generateAuthPage(true),
        "/main": () => this._authRender.generateAuthPage(false),
        default: () => this.navigate("/signin"),
      };
      (routeActions[route] || routeActions.default)();
    }
  };

  setEventListeners = () => {
    this._initialize();
    this.loadContentBasedOnRoute();
  };
}
