import RegisterPresenter from './register-presenter';

export default class RegisterPage {
  async render() {
    return `
      <section class="form-page">
        <p id="registerError" style="color: red;" aria-live="assertive"></p>
        <form id="registerForm" class="form-card">
          <label for="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Contoh: John Doe" required />

          <label for="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" required />
          
          <label for="password">Password</label>
          <input id="password" name="password" type="password" placeholder="********" required />
          
          <button type="submit">Register</button>
          <p>Sudah punya akun? <a href="#/login">Login</a></p>
        </form>
      </section>
    `;
  }

  async afterRender() {
    this.presenter = new RegisterPresenter({ view: this });

    const form = document.getElementById('registerForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;

      this.presenter.handleRegister(name, email, password);
    });
  }

  showError(message) {
    const errorElem = document.getElementById('registerError');
    errorElem.textContent = message;
  }
};

// export default RegisterPage;
