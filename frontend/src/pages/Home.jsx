import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { Camera, MessageSquare, Plus, ThumbsUp } from "lucide-react";
import EditProfile from "../components/EditProfile";
import { userDataContext } from "../context/UserContext";
import CreatePost from "../components/CreatePost";
import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  const {
    userData,
    showCreatePostPopup,
    setshowCreatePostPopup,
    posts,
    setPosts,
  } = useContext(userDataContext);

  const formatTime = (time) => {
    const now = new Date();
    const past = new Date(time);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return "Just now";

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day ago`;

    return past.toLocaleDateString();
  };

  const handleLike = async (postId) => {
    try {
      // Optimistic UI update
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes: p.likes.includes(userData._id)
                  ? p.likes.filter((id) => id !== userData._id)
                  : [...p.likes, userData._id],
              }
            : p,
        ),
      );

      // API call
      const res = await axios.post(
        `${backendURL}/api/posts/like/${postId}`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log(res)
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE] pb-10">
      <Navbar />

      {editProfile && <EditProfile setEditProfile={setEditProfile} />}
      {showCreatePostPopup && <CreatePost />}

      <div className="pt-7 flex lg:flex-row flex-col gap-5 px-7">
        <div className="bg-white md:w-[25%] max-h-80 p-4 md:sticky top-7">
          <div className="h-24 bg-gray-300 relative">
            <img
              src={`${userData?.coverImage || "https://via.placeholder.com/150"}`}
              alt=""
              className="h-full w-full object-cover"
            />
            <Camera className="absolute top-0 right-0 m-3 cursor-pointer" />
          </div>

          <div className="px-4 pb-4">
            <div className="relative -mt-10 w-fit">
              <img
                src={`${userData?.profileImage || "https://via.placeholder.com/150"}`}
                className="h-20 w-20 rounded-full border-4 border-white object-cover"
              />

              <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer">
                <Plus size={16} />
              </div>
            </div>

            <div className="mt-3">
              <h1 className="font-semibold text-lg">
                {userData?.firstName} {userData?.lastName}
              </h1>
              <p className="text-gray-600 text-sm">{userData?.headline}</p>
              <p className="text-xs text-gray-500">{userData?.location}</p>
            </div>

            <button
              className="mt-4 w-full border border-blue-500 text-blue-500 rounded-full py-2 hover:bg-blue-50 transition cursor-pointer font-medium"
              onClick={() => setEditProfile(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="space-y-5 lg:w-[50%]">
          <div className="bg-white flex items-center px-10 gap-6 py-2">
            <img
              src={userData?.profileImage || "empty-user.png"}
              alt={userData?.firstName}
              className="h-16 w-16 rounded-full object-cover overflow-hidden"
            />
            <button
              className="border text-xl w-full py-2 rounded-full cursor-pointer text-gray-600 hover:bg-gray-100 transition"
              onClick={() => setshowCreatePostPopup(true)}
            >
              Create a post
            </button>
          </div>

          <div className="space-y-5">
            {posts?.length > 0 ? (
              posts.map((post) => (
                <div
                  className="bg-white min-h-50 p-5 rounded-xl shadow-md"
                  key={post._id}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-15 w-15 rounded-full overflow-hidden">
                      <img src={post.author.profileImage} />
                    </div>

                    <div>
                      <h1 className="font-semibold">
                        {post.author.firstName} {post.author.lastName}
                      </h1>
                      <p className="text-gray-600 text-sm">
                        {post.author.headline}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTime(post.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div>
                      <p
                        className={`mt-3 ${expandedPost === post._id ? "" : "line-clamp-2"}`}
                      >
                        {post.description}
                      </p>
                      <span
                        className="text-blue-600 cursor-pointer font-medium"
                        onClick={() =>
                          setExpandedPost(
                            expandedPost === post._id ? null : post._id,
                          )
                        }
                      >
                        {expandedPost === post._id
                          ? "show less"
                          : "read more.."}
                      </span>
                    </div>
                    {post.image && (
                      <img
                        src={post?.image || "/empty-user.png"}
                        alt=""
                        className="h-full w-full object-cover mt-2 rounded"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      className="flex items-center gap-1 mt-3 text-gray-600 cursor-pointer"
                      onClick={() => handleLike(post._id)}
                    >
                      <ThumbsUp fill={post.likes.includes(userData._id) ? "currentColor" : "none"} />
                      <span>{post.likes.length}</span>
                    </button>

                    <button className="flex items-center gap-1 mt-3 text-gray-600 cursor-pointer">
                      <MessageSquare />
                      <span>{post.comments.length}</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No Posts available</div>
            )}
          </div>
        </div>
        <div className="bg-white lg:w-[25%] max-h-10"></div>
      </div>
    </div>
  );
};

export default Home;
