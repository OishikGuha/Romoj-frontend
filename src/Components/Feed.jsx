import React, { useContext } from "react";
import { Avatar } from "@mui/material";
import PostInput from "./PostInput";
import Post from "./Post";
import { useState } from "react";
import { useEffect } from "react";
import axios from "redaxios";
import { AuthContext } from "../context/AuthContext";
import { useRef } from "react";

const Feed = ({ username, onlyUser }) => {
  const [posts, setPosts] = useState([]);
  const update = () => {
    window.location.reload(false);
  };

  const user = useContext(AuthContext).user;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = onlyUser
        ? await axios.get(`/api/posts/profile/${username}`)
        : await axios.get(`/api/posts/allPosts/all`);
      // console.log(res.data);
      setPosts(res.data.reverse());
      // console.log(posts[0]);
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-grow-[0.25] p-4 w-auto flex-col overflow-x-clip">
      <div
        className={
          username
            ? user.username == username
              ? "visible"
              : "hidden"
            : "visible"
        }
      >
        <PostInput update={update} />
      </div>
      {/* Feed */}
      <div id="feed" className="flex flex-col mt-10">
        <ul className="flex flex-col">
          <li>
            {posts.map((p, i) => {
              return <Post key={i} post={p} />;
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Feed;
