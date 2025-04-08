// src/Reducers/UserReducer/UserContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { userReducer, initialUserState, UserState, UserAction } from "./UserReducer";
import jwt_decode from "jwt-decode";
//import { useNavigate } from "react-router-dom"; 
interface UserContextProps {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
 // const navigate = useNavigate(); 
  // ✅ Hydrate user from localStorage once on app load
  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwt_decode<{
          sub: string;
          username: string;
          email: string;
          roles: string;
          isActive: boolean;
          exp: number;
          iat: number;
        }>(token);

        const userData: UserState = {
          isAuthenticated: true,
          name: decoded.username,
          email: decoded.email,
          role: decoded.roles,
          token,
          sub: decoded.sub,
          isActive: decoded.isActive,
          exp: decoded.exp,
          iat: decoded.iat,
        };

        
        dispatch({ type: "LOGIN", payload: userData });
       // navigate("/dashboard");
      } catch (err) {
        console.error("Failed to decode token:", err);
        localStorage.removeItem("accessToken");
      }
    }
  }, []);
// can i do here a redirection to teh dashboard ?
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserState must be used within a UserProvider");
  return context;
};



/*v1
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { userReducer, initialUserState, UserState, UserAction } from "./UserReducer";

interface UserContextProps {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserState must be used within a UserProvider");
  return context;
};
*/