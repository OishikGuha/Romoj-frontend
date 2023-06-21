import axios from "redaxios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await fetch(`/api/auth/login`, {method: 'PUT', body:userCredential});
    localStorage.setItem("user", JSON.stringify(res.data))
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};