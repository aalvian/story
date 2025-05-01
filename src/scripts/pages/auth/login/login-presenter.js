import { login } from "../../../data/story-api";

class LoginPresenter {
  constructor(view) {
    this._view = view;
  }

  async handleLogin({ email, password }) {
    try {
      if (password.length < 8) {
        this._view.showError("Password minimal 8 karakter");
        return;
      }
      
      const { error, loginResult } = await login({ email, password });

      if (error) {
        this._view.showError("Email atau password salah");
        return;
      }

      localStorage.setItem("token", loginResult.token);
      window.dispatchEvent(
        new CustomEvent("auth-change", {
          detail: { isLoggedIn: true },
        }),
      );
      window.location.hash = "#/";

    } catch (error) {
      this._view.showError(error.message);
    }
  }
}

export default LoginPresenter;
