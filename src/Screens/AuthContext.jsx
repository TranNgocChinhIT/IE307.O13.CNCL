import React ,{createContext,useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated,setisAuthenticated] = useState(true);
    return (
        <AuthContext.Provider value={{email , setEmail,password,setPassword,isAuthenticated,setisAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext,AuthProvider};