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

  const login = async (email, password) => {
    try {
      const response = await axios.post('auth/signin', {
        email,
        password,
      });

      setisAuthenticated(true);
      setUser({
        userID: response.data.user._id,
        accessToken: response.data.accessToken,
      });
    } catch (error) {
      console.error(`Login error: ${error.message}`);
    }
  };

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
