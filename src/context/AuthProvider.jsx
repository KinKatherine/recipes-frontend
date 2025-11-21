import {createContext, useContext, useState, useEffect} from 'react'
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    if(token){
      try{
        const decoded = jwtDecode(token);
        return{
          token,
          user: decoded.sub,
          role: decoded.roles[0]
        }
      }
      catch(e){
        console.error("Invalid token");
        localStorage.removeItem('token');
        return {user: null, role: null, token: null}
      }
    }
    return {user: null, role: null, token: null};
  });

  return (
    <AuthContext.Provider value ={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext;