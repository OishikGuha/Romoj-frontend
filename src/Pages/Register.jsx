import React from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router";
import axios from "redaxios";

const Register = () => {
  const nickname = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const cpassword = useRef();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== cpassword.current.value) {
      cpassword.current.setCustomValidity("Passwords don't match! 💀");
    } else {
      const user = {
        nickname: nickname.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        cpassword: cpassword.current.value,
      };

      try {
        await fetch(`/api/auth/register`, { method: "PUT", body: user });
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col align-middle w-screen h-screen">
      <header className="self-center font-bold text-8xl mt-10">Romoj</header>
      <span className="self-center text-gray-500 text-3xl mt-3">
        the new thing™
      </span>
      <div
        id="register"
        className="border-[10px] rounded-lg w-[50vh] p-10 self-center mt-20 flex flex-col justify-center align-middle hover:shadow-lg shadow-none transition-all"
      >
        <form onSubmit={handleClick}>
          <input
            type="text"
            name="nickname"
            id="nickname"
            placeholder="Nickname"
            ref={nickname}
            className="outline outline-gray-300 rounded-full w-full p-2 mb-6 focus:outline-gray-300 focus:outline-4 focus:shadow-md transition-all shadow-sm"
          />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            ref={username}
            className="outline outline-gray-300 rounded-full w-full p-2 mb-6 focus:outline-gray-300 focus:outline-4 focus:shadow-md transition-all shadow-sm"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            ref={email}
            className="outline outline-gray-300 rounded-full w-full p-2 mb-6 focus:outline-gray-300 focus:outline-4 focus:shadow-md transition-all shadow-sm"
          />
          <input
            type="password"
            name="pass"
            id="pass"
            placeholder="Password"
            ref={password}
            className="outline outline-gray-300 rounded-full w-full p-2 mb-6 focus:outline-gray-300 focus:outline-4 focus:shadow-md transition-all shadow-sm"
          />
          <input
            type="password"
            name="cpass"
            id="cpass"
            placeholder="Confirm Password"
            ref={cpassword}
            className="outline outline-gray-300 rounded-full w-full p-2 mb-6 focus:outline-gray-300 focus:outline-4 focus:shadow-md transition-all shadow-sm"
          />
          <div id="submit" className="self-center align-middle">
            <button
              type="submit"
              className="shadow-lg flex outline outline-gray-300 rounded-full ml-[13vh] bg-gray-300 p-2 self-center text-center"
            >
              <span className="text-center font-semibold">Register! 👶</span>
            </button>
          </div>
        </form>
        <div className="self-center mt-[2vh]">
          <Link to="/login" className=" self-center font-semibold mr-3">
            <span className="underline"> Already have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
