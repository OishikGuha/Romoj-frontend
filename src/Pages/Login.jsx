import React from "react";
import { TextField } from "@mui/material";
import { useRef } from "react";
import { loginCall } from "../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="flex flex-col align-middle w-screen h-screen">
      <header className="self-center font-bold text-8xl mt-10">Romoj</header>
      <span className="self-center text-gray-500 text-3xl mt-3">
        the new thing™
      </span>
      <div
        id="login"
        className="border-[10px] rounded-lg w-[50vh] p-10 self-center mt-20 flex flex-col justify-center align-middle hover:shadow-lg shadow-none transition-all"
      >
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="id"
            id="id"
            placeholder="Email"
            required
            className="outline outline-gray-300 rounded-full w-full p-2 mb-6 focus:outline-gray-300 focus:outline-4 focus:shadow-md transition-all shadow-sm"
            ref={email}
          />
          <input
            type="password"
            name="pass"
            id="pass"
            placeholder="Password"
            required
            className="outline outline-gray-300 rounded-full w-full p-2 mb-6 focus:outline-gray-300 focus:outline-4 focus:shadow-md transition-all shadow-sm"
            ref={password}
            minLength="6"
          />
          <div id="submit" className="self-center align-middle">
            <button
              type="submit"
              className="shadow-lg flex outline outline-gray-300 rounded-full ml-[12vh] bg-gray-300 p-2 self-center text-center"
            >
              <span className="text-center font-semibold">
                {isFetching ? (
                  <CircularProgress size={12} className="mr-2" />
                ) : (
                  "Login! 🏃‍♂️🏃‍♀️💨"
                )}
              </span>
            </button>
          </div>
        </form>
        <div className="self-center mt-[2vh]">
          <Link to="/register" className="self-center font-semibold">
            <span className="underline">Don't have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
