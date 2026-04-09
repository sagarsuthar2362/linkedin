import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [showCreatePostPopup, setshowCreatePostPopup] = useState(false);
  const [posts, setPosts] = useState([]);

  const getUser = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/user/currentuser`, {
        withCredentials: true,
      });
      setUserData(res.data?.user);
    } catch (error) {
      console.log("error fetching user data", error);
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/posts/`, {
        withCredentials: true,
      });
      setPosts(res.data?.posts || []);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  return (
    <div>
      <userDataContext.Provider
        value={{
          userData,
          setUserData,
          showCreatePostPopup,
          setshowCreatePostPopup,
          posts,
          setPosts
        }}
      >
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
