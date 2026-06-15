const API_BASE_URL = "http://192.168.1.2:5000/api/v1";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export async function getCourses() {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/courses`, {
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

export async function getCourse(courseId) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/courses/${courseId}`, {
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

export async function createCourse({title, description, duration, credits, instructor_id}) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/courses`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({title, description, duration, credits, instructor_id}),
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

export async function updateCourse({id, title, description, duration, credits, instructor_id}) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/courses/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({title, description, duration, credits, instructor_id}),
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

export async function deleteCourse({id}){
  try {
    const response = await fetch(`${API_BASE_URL}/admin/courses/${id}`, {
      method: "DELETE",
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
