import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { Camera, Plus } from "lucide-react";
import EditProfile from "../components/EditProfile";
import { userDataContext } from "../context/UserContext";

const Home = () => {
  const [editProfile, setEditProfile] = useState(false);
  const {userData} = useContext(userDataContext)
  return (
    <div className="min-h-screen bg-[#F4F2EE]">
      <Navbar />

      {editProfile && <EditProfile setEditProfile={setEditProfile} />}

      <div className="pt-7 flex lg:flex-row flex-col gap-5 px-7">
        <div className="bg-white md:w-[25%] min-h-[300px] p-4">
          <div className="h-24 bg-gray-300 relative">
            <img src={`${userData?.coverImage || "https://via.placeholder.com/150"}`} alt="" className="h-full w-full object-cover" />
            <Camera className="absolute top-0 right-0 m-3 cursor-pointer"/>
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
              <h1 className="font-semibold text-lg">{userData?.firstName} {userData?.lastName}</h1>
              <p className="text-gray-600 text-sm">{userData?.headline}</p>
              <p className="text-xs text-gray-500">{userData?.location}</p>
            </div>

            <button className="mt-4 w-full border border-blue-500 text-blue-500 rounded-full py-2 hover:bg-blue-50 transition cursor-pointer font-medium" onClick={()=>setEditProfile(true)}>
              Edit Profile
            </button>
          </div>
        </div>

        <div className="bg-white lg:w-[50%] h-[300px]"></div>
        <div className="bg-white lg:w-[25%] h-[300px]"></div>
      </div>
    </div>
  );
};

export default Home;
