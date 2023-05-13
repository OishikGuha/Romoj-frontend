import React, { useContext } from "react";
import { Alert, Avatar } from "@mui/material";
import Tilt from "react-parallax-tilt";
import { useState, useEffect, useRef } from "react";
import axios from "redaxios";
import { AuthContext } from "../context/AuthContext";
const PostInput = ({ update }) => {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const user = useContext(AuthContext).user;
  const [file, setFile] = useState(null);

  const description = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: description.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/upload`, data);
      } catch (err) {}
    }
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/posts`, newPost);
      update();
    } catch (err) {}
  };

  return (
    <div id="PostArea" className=" rounded-lg pb-2 border-4">
      <form action="" className="flex flex-col">
        <div id="upper" className="flex flex-row">
          <Tilt>
            <Avatar
              src={PF + user.profilePicture}
              sx={{ width: 60, height: 60 }}
              className="mt-4 ml-4 shadow-md"
            />
          </Tilt>
          <textarea
            type="text"
            name=""
            id=""
            ref={description}
            className="ml-2 mt-5 w-full mr-2 p-1 outline-none resize-none"
            placeholder="Speak your mind"
          />
          <button
            type="submit"
            className="text-3xl mt-6 mr-4 rounded-full bg-[#e5e7eb] p-2"
            onClick={handleSubmit}
          >
            ✈️
          </button>
        </div>
        <hr className="border-2 w-full mt-2 text-center" />
        <div
          id="lower"
          className="flex flex-row justify-between mt-2 ml-2 w-full"
        >
          <ul className="flex flex-row w-full justify-evenly md:mr-10 md:ml-10 ml-[-0.5rem]">
            <li>
              <label htmlFor="file">
                <Tilt className="PostOption" tiltReverse>
                  📷 Photo
                </Tilt>
                <input
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg,.webp"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default PostInput;
