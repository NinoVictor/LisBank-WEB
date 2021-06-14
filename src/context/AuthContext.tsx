import { User } from "../types/Auth";
import { createContext, useReducer } from "react";

export interface AuthState {
  isLoggedIn: Boolean;
  user?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export interface AuthContextProps {
  authState: AuthState;
  login: (login: User) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = (user: User) => {
    dispatch({ type: "login", payload: user });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

type AuthAction = { type: "login"; payload: User } | { type: "logout" };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "logout":
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
