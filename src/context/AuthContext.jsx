import axios from "redaxios";
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  let user2 = JSON.parse(localStorage.getItem("user"));

  if (user2) {
    const fetchUserUpdate = async (user) => {
      console.log(user.username);
      return await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/users?username=` + user.username
      );
    };
    fetchUserUpdate(user2).then((f) => {
      user2 = f.data;
      localStorage.setItem("user", JSON.stringify(user2));
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: user2 ? user2 : state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
