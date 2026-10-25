import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_BASE = 'http://localhost:5000';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('mindwave_token'));
  const [user, setUser] = useState(() => {
    try {
      const storedToken = localStorage.getItem('mindwave_token');
      const cached = localStorage.getItem('mindwave_user');
      return (storedToken && cached) ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('mindwave_token');
    if (storedToken) {
      setToken(storedToken);
      fetch(`${API_BASE}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('mindwave_user', JSON.stringify(data.user));
          }
        })
        .catch(err => console.warn('Could not verify auth token with backend:', err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('mindwave_token', data.token);
      localStorage.setItem('mindwave_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      // Fallback demo login if network error occurs
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        const demoUser = { id: 4, name: email.split('@')[0] || 'Ananya', email };
        const demoToken = 'demo-jwt-token-mindwave';
        setToken(demoToken);
        setUser(demoUser);
        localStorage.setItem('mindwave_token', demoToken);
        localStorage.setItem('mindwave_user', JSON.stringify(demoUser));
        return { success: true, isDemo: true };
      }
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      return { success: true };
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        return { success: true, isDemo: true };
      }
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('mindwave_token');
    localStorage.removeItem('mindwave_user');
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
