import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import {
  generateAuthenticatedNavigationListTemplate,
  generateUnauthenticatedNavigationListTemplate,
  generateSubscribeButtonTemplate,
} from "../templates";
import {
  subscribe,
  unsubscribe,
  checkSubscriptionStatus,
} from "../utils/notification-helper";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
    this._initAuthState();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  _initAuthState() {
    this.#setupNavigationList();

    window.addEventListener("auth-change", () => {
      this.#setupNavigationList();
    });
  }

  async #setupNavigationList() {
    const isLoggedIn = !!localStorage.getItem("token");
    const navListMain = document.getElementById("navlist-main");
    const navList = document.getElementById("navlist");

    navListMain.innerHTML = "";
    navList.innerHTML = isLoggedIn
      ? generateAuthenticatedNavigationListTemplate()
      : generateUnauthenticatedNavigationListTemplate();

    if (isLoggedIn) {
      const logoutButton = document.getElementById("logout-button");
      logoutButton?.addEventListener("click", (e) => {
        e.preventDefault();
        this._handleLogout();
      });

      // Handle subscribe/unsubscribe button
      const token = localStorage.getItem("token");
      const isSubscribed = await checkSubscriptionStatus();

      document.getElementById("push-notification-tools").innerHTML =
        generateSubscribeButtonTemplate(isSubscribed);

      document
        .getElementById(
          isSubscribed ? "unsubscribe-button" : "subscribe-button",
        )
        ?.addEventListener("click", async () => {
          const success = isSubscribed
            ? await unsubscribe(token)
            : await subscribe(token);

          if (success) {
            this.#setupNavigationList();
          }
        });
    }
  }

  _handleLogout() {
    if (confirm("Yakin ingin logout?")) {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("auth-change"));
      window.location.hash = "#/login";
    }
  }

  async renderPage() {
    try {
      const url = getActiveRoute();
      const route = routes[url];

      if (!route) {
        console.error(`Route ${url} tidak ditemukan!`);
        window.location.hash = "#";
        return;
      }

      const token = localStorage.getItem("token");
      if (route.requiresAuth && !token) {
        window.location.hash = "#/login";
        return;
      }

      if (document.startViewTransition) {
        await document.startViewTransition(async () => {
          this.#content.innerHTML = await route.page.render();
          await route.page.afterRender();
        });
      } else {
        this.#content.innerHTML = await route.page.render();
        await route.page.afterRender();
      }
    } catch (error) {
      console.error("Render error:", error);
      window.location.hash = "#";
    }
  }
}

export default App;
