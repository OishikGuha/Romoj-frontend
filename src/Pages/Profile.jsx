import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import ProfileMain from "../Components/ProfileMain";
import Feed from "../Components/Feed";
import { useParams } from "react-router";

const Profile = () => {
  let username = useParams().username;

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <div
        id="elements"
        className="flex-row flex lg:mr-[6rem] lg:ml-[15rem] ml-[1rem]"
      >
        <div className="sm:block hidden">
          <Sidebar />
        </div>
        <div className="flex flex-col">
          <ProfileMain username={username} />
          <Feed username={username} onlyUser={true} className="w-full ml-10" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
