import LoginPresenter from './login-presenter';

export default class LoginPage {
  async render() {
    return `
      <section class="form-page">
        <p id="loginError" style="color: red;" aria-live="assertive"></p>
        <form id="loginForm" class="form-card">
          <label for="email">Username</label>
          <input id="email" name="email" type="text" placeholder="Contoh: John Doe" required />

          <label for="password">Password</label>
          <input id="password" name="password" type="password" placeholder="********" required />

          <button type="submit">Login</button>
          <p>Belum punya akun? <a href="#/register">Buat akun</a></p>
        </form>
      </section>
    `;
  }

  async afterRender() {
    this.presenter = new LoginPresenter({ view: this });

    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;

      this.presenter.handleLogin(email, password);
    });
  }

  showError(message) {
    const errorElem = document.getElementById('loginError');
    errorElem.textContent = message;
  }
};

// export default LoginPage;
