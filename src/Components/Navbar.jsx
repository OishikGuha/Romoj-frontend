import React, { useContext } from "react";
import {
  Search,
  Message,
  People,
  ConnectingAirportsOutlined,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { useRef } from "react";
import axios from "redaxios";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  const search = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios
      .get("http://localhost:8800/api/users?username=" + search.current.value)
      .then((res) => {
        navigate("/profile/" + res.data.username);
      });
  };

  return (
    <nav className="flex flex-row shadow-lg justify-between p-3 h-30 rounded-lg w-screen mb-3">
      <div className="self-center" id="logo">
        <span className="whitespace-nowrap font-bold md:text-xl lg:text-2xl shadow-none hover:shadow-md transition-all cursor-pointer rounded-lg p-1 backdrop-blur-sm text-[1.3rem]">
          <Link to="/">Romoj😂</Link>
          <span className="text-sm ml-2 font-sans font-normal">
            The open source social media™
          </span>
        </span>
      </div>
      <div
        id="search"
        className="ml-2 mr-5 sm:mr-0 sm:ml-0 self-center flex-row shadow-md rounded-lg whitespace-nowrap"
      >
        <form onSubmit={() => console.log("a")}>
          <button
            type="submit"
            className="pl-1 transition-all shadow-none hover:shadow-lg p-1 rounded-full cursor-pointer"
            onClick={handleSubmit}
          >
            <span>🔍</span>
          </button>
          <input
            type="text"
            ref={search}
            placeholder="Search a user"
            className="rounded-lg outline-none relative p-2 w-[23vh] lg:w-auto"
            size="100"
          />
        </form>
      </div>
      <div
        id="profile"
        className="flex justify-evenly flex-row self-center space-x-5 pr-10"
      >
        <button
          className="text-2xl hover:shadow-md shadow-none rounded-full"
          title="Log out"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          🚪
        </button>
        <Avatar
          alt="pfp"
          src={user ? PF + user.profilePicture : ""}
          className="m-1"
          // sx={{ width: 30, height: 30 }}
        />
        <span className="self-center text-xl hidden sm:block">
          Hello {user ? user.username : ""}!
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
