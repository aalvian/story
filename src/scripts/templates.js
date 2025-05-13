export function generateAuthenticatedNavigationListTemplate() {
  return `
      <li>
        <a href="#/add" id="add-button">
          <i class="fas fa-plus-circle"></i> Tambah Cerita
        </a>
      </li>
      <li>
        <a href="#/" id="home-button">
          <i class="fas fa-bookmark"></i> Simpan Cerita
        </a>
      </li>
      <li>
        <a href="#/" id="subscribe-button">
          <i class="fas fa-bell"></i> Subscribe
        </a>
      </li>
      <li id="push-notification-tools">
        ${generateSubscribeButtonTemplate()}
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


export function generateSubscribeButtonTemplate(isSubscribed = false) {
  return isSubscribed
    ? `
      <button id="unsubscribe-button" class="btn unsubscribe-button">
        Unsubscribe <i class="fas fa-bell-slash"></i>
      </button>
    `
    : `
      <button id="subscribe-button" class="btn subscribe-button">
        Subscribe <i class="fas fa-bell"></i>
      </button>
    `;
}

