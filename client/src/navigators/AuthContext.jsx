import React ,{createContext,useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userUpdate, setUserUpdate] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLogin,setIsLogin] =  useState(null);
  const logout = () => {
    // Xóa dữ liệu người dùng và token khỏi context
    setisAuthenticated(false);
    setUserToken(null);
    setUserID(null);
    setUserUpdate(null);
    setCartItems([]);
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
        const token = res.data.token;
        setUserToken(token);
        // Decode token để lấy thông tin người dùng
        const decoded = jwtDecode(token);
        setUserID(decoded.sub);
        setCartItems([]);
      })
      .catch((e) => {
        console.log(`Login error ${e}`);
        setIsLogin(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isAuthenticated,
        userID,
        login,
        logout,
        userUpdate,
        setUserUpdate,
        cartItems,
        setCartItems,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
