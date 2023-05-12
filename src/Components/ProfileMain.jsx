import React, { useContext, useEffect } from "react";
import { Avatar } from "@mui/material";
import PostInput from "./PostInput";
import { useState } from "react";
import axios from "redaxios";
import { AuthContext } from "../context/Authcontext";

const ProfileMain = ({ username }) => {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState(0);
  const [follow, setFollow] = useState(false);
  const currentUser = useContext(AuthContext).user;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();

    const fetchFollowing = async () => {
      return await (
        await axios.get(`http://localhost:8800/api/users?username=${username}`)
      ).data;
    };
    fetchFollowing().then((f) =>
      !f.followers.includes(currentUser._id)
        ? setFollow(true)
        : setFollow(false)
    );
  }, [username]);

  const getFollowers = () => {
    try {
      return user.followers.length;
    } catch (err) {
      return 0;
    }
  };

  const getCoverPicture = () => {
    try {
      return user.coverPicture.startsWith(
        "https://source.unsplash.com/featured/"
      )
        ? user.coverPicture
        : PF + user.coverPicture;
    } catch (err) {}
  };

  const handleFollow = async () => {
    const following = await (
      await axios.get(`http://localhost:8800/api/users?username=${username}`)
    ).data;

    if (following.followers.includes(currentUser._id)) {
      setFollow(false);
      await axios.put(
        `http://localhost:8800/api/users/${following._id}/unfollow`,
        {
          userId: currentUser._id,
        }
      );
      window.location.reload();
    } else {
      setFollow(true);
      await axios.put(
        `http://localhost:8800/api/users/${following._id}/follow`,
        {
          userId: currentUser._id,
        }
      );
      window.location.reload();
    }
  };

  return (
    <div className="flex p-5 flex-col">
      <div id="upper flex-col justify-center">
        <div id="banner" className="relative h-[320]px flex flex-col">
          <img
            src={getCoverPicture()}
            alt=""
            className="object-cover self-center h-[40vh] w-[130vh] z-[-1] relative rounded-lg"
          />
          <Avatar
            src={`${PF + user.profilePicture}`}
            alt=""
            className="w-[30vh] h-[30vh] self-center outline outline-8 outline-white translate-y-[-8vh]"
            sx={{ height: 150, width: 150 }}
          />
        </div>
      </div>
      <div id="lower" className="flex flex-col p-4 mt-9 sm:mt-[-8vh]">
        <div
          id="identification"
          className="flex-row justify-between w-full mt-[-10vh] mb-3 sm:mt-8"
        >
          <div className="flex flex-col">
            <h1 className="font-semibold lg:text-4xl">{user.nickname}</h1>
            <h2 className="text-[#c3c4c9] font-semibold mt-[-0.4vh]">
              @{user.username}
            </h2>
          </div>
          <div className="font-semibold">
            {getFollowers() + " "}
            followers
          </div>
          <div id="opinion" className="flex flex-row w-full">
            <button
              className={`p-2 shadow-md rounded-full ${
                follow ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={handleFollow}
            >
              {follow ? "➕Follow" : "➖Unfollow"}
            </button>
          </div>
          <div id="location" className="mt-4">
            {user.from ? <span>⚓{user.from}</span> : <></>}
          </div>
        </div>
        {/* <hr className="border-t-4 mb-2 w-full" /> */}
        {/* <p className="text-lg p-1 pl-4"> {user.desc} </p> */}
        {/* <hr className="border-t-4 mt-2 mb-3 w-full" /> */}
      </div>
    </div>
  );
};

export default ProfileMain;
