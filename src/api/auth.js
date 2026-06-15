const API_BASE_URL = "http://192.168.1.2:5000/api/v1";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password, role: "admin" }),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      return data;
    }
    throw new Error(data.message || response.statusText || "An error occurred");
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function register(name, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password, role: "admin" }),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      return data;
    }
    throw new Error(data.message || response.statusText || "An error occurred");
  } catch (error) {
    return Promise.reject(error.message);
  }
}


