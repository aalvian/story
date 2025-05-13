import CONFIG from "../config";

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  STORIES: `${CONFIG.BASE_URL}/stories`,
};

// == Register == //
export async function register({ name, email, password }) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const responseJson = await response.json();
  return { ...responseJson, ok: response.ok };
}

// == Login == //
export async function login({ email, password }) {
  try {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: data.message || "Login gagal",
      };
    }

    return {
      error: false,
      loginResult: data.loginResult,
    };
  } catch (error) {
    return {
      error: true,
      message: "Terjadi kesalahan jaringan",
    };
  }
}

// == Get == //
export async function getStories(token) {
  try {
    const url = new URL(`${ENDPOINTS.STORIES}`);

    const response = await fetch(url, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: true,
        message: errorData.message || 'Network error',
        listStory: []
      };
    }

    const data = await response.json();
    return {
      error: false,
      listStory: data.listStory || [],
      message: data.message || 'Success'
    };

  } catch (error) {
    console.error('Fetch error:', error);
    return {
      error: true,
      message: error.message || 'Network error',
      listStory: []
    };
  }
}

// == Add == //
export async function addStory(formData, token) {
  try {
    const response = await fetch(`${ENDPOINTS.STORIES}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();
    
    return {
      error: !response.ok,
      message: data.message || (response.ok ? 'Success' : 'Failed')
    };
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
}