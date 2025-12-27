const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const opts = { method, headers: { ...headers } };
  if (body) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }
  const token = getToken();
  if (token) opts.headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, opts);
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw data || { message: res.statusText };
    return data;
  } catch (err) {
    throw err;
  }
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  del: (path) => request(path, { method: "DELETE" }),
  setToken: (t) => {
    if (t) localStorage.setItem("token", t);
    else localStorage.removeItem("token");
  },
};

export default api;
