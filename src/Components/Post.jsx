import React, { useEffect, useState, useRef } from "react";
import { Avatar } from "@mui/material";
import axios from "redaxios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  let isLiked = useRef(false);

  let dislike = useRef(post.dislikes.length);
  let isDisliked = useRef(false);

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  const [poster, setPoster] = useState({});

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (user._id != post.userId) {
        const poster = await axios.get(
          `http://localhost:8800/api/users?userId=${post.userId}`
        );
        setPoster(poster.data);
      } else {
        setPoster(user);
      }

      const likes = await (
        await axios.get(`http://localhost:8800/api/posts/${post._id}`)
      ).data.likes;
      setLike(likes.length);
    };
    fetchData();
  }, []);

  let imagePresent = true;

  if (post.image == "") {
    imagePresent = false;
  }

  const handleLike = async (action) => {
    if (action == "like") {
      // retrieve liks
      const likes = await (
        await axios.get(`http://localhost:8800/api/posts/${post._id}`)
      ).data.likes;

      // check if likes include the client user. If so, the user un-likes the post.
      if (!likes.includes(user._id)) {
        isLiked = false;
        setLike(like + 1);
        await axios.put(`http://localhost:8800/api/posts/${post._id}/like`, {
          userId: user._id,
        });
      } else {
        // if not, then the user likes the post
        isLiked = true;
        setLike(like - 1);
        await axios.put(`http://localhost:8800/api/posts/${post._id}/like`, {
          userId: user._id,
        });
      }
    } else if (action == "dislike") {
      const dislikes = await (
        await axios.get(`http://localhost:8800/api/posts/${post._id}`)
      ).data.dislikes;

      if (!dislikes.includes(user._id)) {
        isDisliked = false;
        dislike += 1;
        await axios.put(`http://localhost:8800/api/posts/${post._id}/dislike`, {
          userId: user._id,
        });

        // setIsDisliked(true)
      } else {
        isDisliked = true;
        dislike -= 1;
        await axios.put(`http://localhost:8800/api/posts/${post._id}/dislike`, {
          userId: user._id,
        });
      }
    }
  };
  const getFollowers = () => {
    try {
      return poster.followers.length;
    } catch (err) {
      return 0;
    }
  };

  return (
    <div
      id="post"
      className="border-[#e5e7eb] border-4 p-2 w-full mb-3 rounded-lg shadow-sm"
    >
      <div
        id="profile"
        className="flex flex-row align-middle space-x-1 justify-between"
      >
        <Link to={`/profile/${poster.username}`}>
          <div className="flex flex-row space-x-2">
            <Avatar src={PF + poster.profilePicture} />
            <div className="flex flex-row self-center">
              <div className="flex flex-col">
                <span className="font-semibold mb-[-0.5vh]">
                  {poster.nickname}
                </span>
                <span className="font-semibold text-[#c3c4c9]">
                  @{poster.username}
                </span>
              </div>
              <div>
                <span className="text-[#c3c4c9] self.center mb-5 ml-1">
                  &middot; {getFollowers()} followers
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div id="date" className="self-center text-[#c3c4c9] font-semibold">
          {format(post.createdAt)}
        </div>
      </div>
      <hr className="border-t-4 mt-2 mb-2 w-full" />
      <span id="message" className="p-2 break-words whitespace-normal">
        {post.desc}
      </span>
      <img
        src={imagePresent ? PF + post.img : "/assets/empty.png"}
        className="rounded-lg max-h-[70vh] max-w-[70h] object-contain mt-5"
      />

      <div id="footer" className="flex flex-row mt-3 space-x-3 justify-between">
        <div id="opinion" className="flex flex-row space-x-3">
          <button
            className="rounded-lg bg-green-400 shadow-md p-[0.2rem] cursor-pointer hover:shadow-lg transition-all font-semibold pr-2 text-lg"
            onClick={() => handleLike("like")}
          >
            👍&middot; {like}
          </button>
          <button
            className="rounded-lg bg-red-400 shadow-md p-[0.2rem] cursor-pointer hover:shadow-lg transition-all text-lg"
            onClick={() => handleLike("dislike")}
          >
            👎
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
