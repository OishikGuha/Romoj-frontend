import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Friend from "./Friend";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  let followers = [];
  let followings = [];
  if (user) {
    followers = user.followers;
    followings = user.followings;
    console.log(followings);
  }
  const friends = [...new Set(followers.concat(...followings))];

  return (
    <div className="flex w-[20vh] h-[calc(100vh-72px)] p-3 flex-col">
      <ul className="font-bold text-lg space-y-4 mt-6">
        <li>
          <Link to={`/`} className="w-screen">
            📃 Feed
          </Link>
        </li>
        <li>
          <Link
            to={`/profile/${user ? user.username : ""}`}
            className="w-screen"
          >
            👤 Me
          </Link>
        </li>
      </ul>
      <div id="friends" className="flex flex-col mt-10">
        <span className="font-semibold">Friends:</span>
        <ul className="space-y-2">
          {friends.length > 0 ? (
            friends.map((f, i) => {
              return (
                <div className="mt-[1vh]" key={i}>
                  <Friend userId={f} />
                </div>
              );
            })
          ) : (
            <span>
              Hmm.. You don't have any friends, go to a user's profile and click
              "follow" to add them!
            </span>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
