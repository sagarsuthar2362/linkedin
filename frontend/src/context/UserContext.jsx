import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/user/currentuser`, {
        withCredentials: true,
      });
      setUser(res.data);
      console.log(res);
    } catch (error) {
      console.log("error fetching user data", error?.response);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <userDataContext.Provider value={user}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
