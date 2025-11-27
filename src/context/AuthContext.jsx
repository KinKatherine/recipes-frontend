import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

// --- Добавляем email каждому пользователю ---
const FAKE_USERS = {
  user1: { id: 1, password: '1', username: 'user1', isAdmin: false, email: 'user1@example.com' },
  user2: { id: 2, password: '2', username: 'user2', isAdmin: false, email: 'user2@example.com' },
  admin: { id: 3, password: 'admin', username: 'admin', isAdmin: true, email: 'admin@example.com' },
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password) => {
    const user = FAKE_USERS[username];
    if (user && user.password === password) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = { currentUser, isLoggedIn: !!currentUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
