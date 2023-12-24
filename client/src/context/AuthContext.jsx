import React ,{createContext,useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isAuthenticated, setisAuthenticated] = useState(true);
  const [user, setUser] = useState(null);
  const [isLogin,setIsLogin] =  useState(null);
  const logout = () => {
    // Xóa dữ liệu người dùng và token khỏi context
    setisAuthenticated(false);
    setIsLogin(null);
  };

  const login = (email, password) => {
    axios
      .post("https://fakestoreapi.com/auth/login", {
        email,
        password,
      })
      .then((res) => {
        setisAuthenticated(true);
        setIsLogin(true);

      })
      .catch((e) => {
        console.log(`Login error ${e}`);
        setIsLogin(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
