import React, { useContext, useState } from "react";
import { Bell, Home, Search, Users } from "lucide-react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const menu = [
  {
    name: "Home",
    icon: <Home />,
  },
  {
    name: "My Network",
    icon: <Users />,
  },
  {
    name: "Notifications",
    icon: <Bell />,
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [activeSearch, setactiveSearch] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const { userData, setUserData } = useContext(userDataContext);

  const handleSignout = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/auth/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUserData(null);
        navigate("/signup");
      }
    } catch (error) {
      console.log("error signing out", error);
    }
  };

  return (
    <div className="py-3 px-2 bg-white shadow-md">
      <div className="flex items-center lg:justify-around justify-between">
        {/* left navbar */}
        <div className="flex items-center gap-4">
          <img src="linkedin-icon.svg" alt="" className="h-12" />

          <div
            className={`md:flex items-center gap-2 bg-gray-200 px-4 rounded md:w-96 py-3 ${activeSearch ? "flex" : "hidden"}`}
          >
            <Search />
            <input
              type="text"
              placeholder="search here"
              className="outline-none"
            />
          </div>

          <Search
            className={`md:hidden cursor-pointer ${activeSearch ? "hidden" : ""}`}
            onClick={() => setactiveSearch(true)}
          />
        </div>

        {/* right navbar */}
        <div className="flex items-center lg:gap-8 gap-4 relative">
          {menu.map((item, index) => (
            <div
              key={index}
              className="md:flex flex-col items-center cursor-pointer hidden"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}

          {/*  this is for mobile view */}
          <div className="sm:hidden md:hidden cursor-pointer">
            <Bell />
          </div>

          <div
            className="h-12 w-12 rounded-full cursor-pointer"
            onClick={() => setShowProfilePopup(!showProfilePopup)}
          >
            <img src="empty-user.png" alt="" />
          </div>

          {/* profile */}
          {showProfilePopup && (
            <div className="absolute right-0 top-18 bg-white rounded  px-4 py-7 flex flex-col items-center gap-4 w-[280px] rounded-md">
              <div className="h-17 w-17 rounded-full cursor-pointer">
                <img src="empty-user.png" alt="" />
              </div>

              <h1 className="font-medium">
                {userData?.firstName} {userData?.lastName}{" "}
              </h1>

              <button className="border-2 border-blue-500 text-blue-500 rounded-full px-4 py-2 w-full cursor-pointer">
                View Profile
              </button>

              <div className="h-px bg-gray-300 w-full"></div>

              <button className="flex items-center gap-2 cursor-pointer">
                <Users />
                <span>My Networks</span>
              </button>

              <button
                className="border-2 border-red-700 text-red-700 rounded-full px-4 py-1 w-full cursor-pointer"
                onClick={handleSignout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
