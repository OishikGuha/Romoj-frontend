import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Rightbar from "../Components/Rightbar";
import Feed from "../Components/Feed";
import { AuthContext } from "../context/Authcontext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <div
        id="elements"
        className="flex-row flex lg:ml-[15rem] ml-[5rem] justify-content"
      >
        <div className="sm:block hidden">
          <Sidebar />
        </div>
        <div className="ml-[-2rem] sm:ml-0 w-full">
          <Feed
            disableInput={false}
            // username={user.username}
            userOnly={false}
          />
        </div>

        <div className="lg:block hidden sm:mr-[10rem]">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Home;
