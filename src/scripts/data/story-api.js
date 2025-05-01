import CONFIG from "../config";

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  STORIES: `${CONFIG.BASE_URL}/stories`,
};

// Register
export async function register({ name, email, password }) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const responseJson = await response.json();
  return { ...responseJson, ok: response.ok };
}

// Login
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

// Get All Stories (Butuh Token)
export async function getStories(token, page = 1, size = 10) {
  const response = await fetch(
    `${ENDPOINTS.STORIES}?page=${page}&size=${size}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const responseJson = await response.json();
  return { ...responseJson, ok: response.ok };
}

// Add Story (Butuh Token)
export async function addStory({ description, photo, lat, lon }, token) {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("photo", photo);
  if (lat) formData.append("lat", lat);
  if (lon) formData.append("lon", lon);

  const response = await fetch(ENDPOINTS.STORIES, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const responseJson = await response.json();
  return { ...responseJson, ok: response.ok };
}
