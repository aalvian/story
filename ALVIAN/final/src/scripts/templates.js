export function generateAuthenticatedNavigationListTemplate() {
  return `
      <li>
        <a href="#/" id="home-button">
          <i class="fas fa-home"></i> Daftar Cerita
        </a>
      </li>
      <li>
        <a href="#/add" id="add-button">
          <i class="fas fa-plus-circle"></i> Tambah Cerita
        </a>
      </li>
      <li>
        <button id="logout-button">
          <i class="fas fa-sign-out-alt"></i>Logout
        </button>
      </li>
    `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
      <li><a href="#/login" id="login-button">Login</a></li>
      <li><a href="#/register" id="register-button">Register</a></li>
    `;
}
