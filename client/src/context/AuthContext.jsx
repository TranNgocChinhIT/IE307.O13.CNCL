import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(true);
  const [user, setUser] = useState({
    userID: '',
    accessToken: '',
  });

  const logout = () => {
    // Clear user data and token from context
    setisAuthenticated(false);
    setUser({
      userID: '',
      accessToken: '',
    });
  };

  const login = (email, password) => {
    axios.post('auth/signin', {
      email,
      password,
    })
    .then(response => {
      setisAuthenticated(true);
      setUser({
        userID: response.data.user._id,
        accessToken: response.data.accessToken,
      });
    })
    .catch(error => {
      console.error(`Login error: ${error.message}`);
    });
  };
  let accessToken = user.accessToken;

  //default axios setting
// <<<<<<< HEAD
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  useEffect(() => {
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };