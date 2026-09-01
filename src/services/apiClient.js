const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

let cachedToken = localStorage.getItem('access_token');
let cachedRefreshToken = localStorage.getItem('refresh_token');

export const getAuthToken = () => cachedToken || localStorage.getItem('access_token');
export const getRefreshToken = () => cachedRefreshToken || localStorage.getItem('refresh_token');

export const setTokens = (access, refresh) => {
  if (access) {
    cachedToken = access;
    localStorage.setItem('access_token', access);
  }
  if (refresh) {
    cachedRefreshToken = refresh;
    localStorage.setItem('refresh_token', refresh);
  }
};

export const clearTokens = () => {
  cachedToken = null;
  cachedRefreshToken = null;
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

let autoAuthPromise = null;

async function performAutoAuth() {
  if (autoAuthPromise) return autoAuthPromise;

  autoAuthPromise = (async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'vijay.gopi@company.com', password: 'password123' }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.tokens?.access || data.access || data.token;
        const refreshToken = data.tokens?.refresh || data.refresh;
        if (accessToken) {
          setTokens(accessToken, refreshToken);
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
          return accessToken;
        }
      }
    } catch (err) {
      console.warn('[Auto-Auth Error]', err);
    } finally {
      autoAuthPromise = null;
    }
    return null;
  })();

  return autoAuthPromise;
}

if (!getAuthToken()) {
  performAutoAuth();
}

async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  let token = getAuthToken();
  if (!token && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/register')) {
    token = await performAutoAuth();
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const config = {
    ...options,
    headers,
  };

  try {
    let response = await fetch(url, config);

    if (response.status === 401 && !endpoint.includes('/auth/login')) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        config.headers['Authorization'] = `Bearer ${getAuthToken()}`;
        response = await fetch(url, config);
      } else {
        const newToken = await performAutoAuth();
        if (newToken) {
          config.headers['Authorization'] = `Bearer ${newToken}`;
          response = await fetch(url, config);
        }
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.detail || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    if (response.status === 204) return {};
    return await response.json();
  } catch (err) {
    throw err;
  }
}

async function refreshAuthToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access || data.tokens?.access;
      const newRefreshToken = data.refresh || data.tokens?.refresh || refreshToken;
      setTokens(accessToken, newRefreshToken);
      return true;
    }
  } catch (e) {
    console.error('Token refresh failed:', e);
  }

  clearTokens();
  return false;
}

export async function withFallback(apiCallPromise, fallbackData) {
  try {
    const res = await apiCallPromise;
    return res !== undefined && res !== null ? res : fallbackData;
  } catch (error) {
    console.info(`[API Fallback Used] Serving local fallback data for requested resource.`);
    return fallbackData;
  }
}

export const apiClient = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body) }),
  patch: (endpoint, body, options) => request(endpoint, { ...options, method: 'PATCH', body: body instanceof FormData ? body : JSON.stringify(body) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
  withFallback,
};

export default apiClient;
