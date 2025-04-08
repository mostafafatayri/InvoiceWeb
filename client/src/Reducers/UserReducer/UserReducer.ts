// src/Reducers/UserReducer/UserReducer.ts
export interface UserState {
  isAuthenticated: boolean;
  name: string;
  email: string;
  role: string;
  token: string;
  sub: string;
  isActive: boolean;
  exp: number;
  iat: number;
}


export type UserAction = 
  | { type: "LOGIN"; payload: UserState }
  | { type: "LOGOUT" };

  export const initialUserState: UserState = {
    isAuthenticated: false,
    name: "",
    email: "",
    role: "user",
    token: "",
    sub: "",
    isActive: false,
    exp: 0,
    iat: 0,
  };
  
  export function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
      case "LOGIN":
        return { ...action.payload, isAuthenticated: true };
      case "LOGOUT":
        return initialUserState;
      default:
        return state;
    }
  }
  


/*export interface UserState {
    isAuthenticated: boolean;
    name: string;
    email: string;
    role: "user" | "admin"|"accountant";
    token?: string;
  }
  
  export type UserAction =
    | { type: "LOGIN"; payload: UserState }
    | { type: "LOGOUT" };
  
  export const initialUserState: UserState = {
    isAuthenticated: false,
    name: "",
    email: "",
    role: "user",
  };
  
  export function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
      case "LOGIN":
        return { ...action.payload, isAuthenticated: true };
      case "LOGOUT":
        return initialUserState;
      default:
        return state;
    }
  }*/
  