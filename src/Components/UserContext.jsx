import React, { createContext, useEffect, useState } from 'react';

/* Keys in localStorage ------------------------------------- */
const LS_USERS   = 'tollycart_users';       // [{username,email,password,mobile,address,gender}]
const LS_CURRENT = 'tollycart_current';     // email string

export const UserContext = createContext();

/* Helper functions ----------------------------------------- */
const loadUsers   = () => JSON.parse(localStorage.getItem(LS_USERS) || '[]');
const saveUsers   = (list) => localStorage.setItem(LS_USERS, JSON.stringify(list));
const saveCurrent = (email) => localStorage.setItem(LS_CURRENT, email);
const clearCurrent = () => localStorage.removeItem(LS_CURRENT);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(loadUsers);
  const [currentUser, setCurrentUser] = useState(() => {
    const email = localStorage.getItem(LS_CURRENT);
    return users.find((u) => u.email === email) || null;
  });

  /* ---------- auth API ---------- */
  const signUp = (data) => {
    setUsers((prev) => {
      const updated = [...prev, data];
      saveUsers(updated);
      return updated;
    });
  };

 const logIn = (identifier, password) => {
  const match = users.find(
    (u) =>
      (u.email === identifier || u.username === identifier) &&
      u.password === password
  );
  if (!match) return false;
  setCurrentUser(match);
  saveCurrent(match.email);   // use email as the session key
  return true;
};

  const logOut = () => {
    setCurrentUser(null);
    clearCurrent();
  };

  /* keep user list synced to LS whenever it changes */
  useEffect(() => saveUsers(users), [users]);

  return (
    <UserContext.Provider value={{ users, currentUser, signUp, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
