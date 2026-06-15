const API_BASE_URL = "http://192.168.1.2:5000/api/v1";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export async function getInstructors() {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/instructors`, {
      method: "GET",
      headers: getHeaders(),
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

export async function getInstructor(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/instructors/${id}`, {
      method: "GET",
      headers: getHeaders(),
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
