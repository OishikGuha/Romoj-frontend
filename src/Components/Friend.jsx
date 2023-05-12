import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import axios from "redaxios";
import { Link } from "react-router-dom";

const Friend = ({ userId }) => {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?userId=${userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const getPfp = () => {
    try {
      return user.profilePicture != "" ? PF + user.profilePicture : "";
    } catch (err) {
      return "";
    }
  };

  return (
    <Link to={`/profile/${user.username}`}>
      <div className="p-2 border-t-4 border-b-4 rounded-lg flex-row flex space-x-2 ">
        <Avatar src={PF + user.profilePicture} />
        <div className="flex-col flex">
          <span className="self-center text-md">{user.nickname}</span>
          <span className="self-center text-sm text-[#c3c4c9]">
            @{user.username}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Friend;
