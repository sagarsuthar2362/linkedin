import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <userDataContext.Provider value={{ userData, setUserData }}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
