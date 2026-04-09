import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { Image, X } from "lucide-react";
import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const CreatePost = () => {
  const { showCreatePostPopup, setshowCreatePostPopup } =
    useContext(userDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await axios.post(`${backendURL}/api/posts/create`, formData, {
        withCredentials: true,
      });
      if (res.data?.success) {
        setshowCreatePostPopup(false);
      }
    } catch (error) {
      console.log("error occured while creating post", error.response);
    }
  };

  return (
    <div className="h-screen w-full bg-black/70 fixed top-0 left-0 z-99 flex items-center justify-center">
      <div className="bg-white h-[500px] w-4xl rounded-lg relative px-3 py-11 overflow-auto">
        <X
          size={30}
          className="cursor-pointer absolute right-2 top-2"
          onClick={() => setshowCreatePostPopup(false)}
        />

        <div>
          <form className="flex flex-col h-full" onSubmit={handleSubmit}>
            <textarea
              name="description"
              className="flex-1 w-full p-2 outline-none min-h-90 placeholder:text-xl text-lg resize-none"
              placeholder="What do you want to talk about?"
            ></textarea>

            <div className="flex items-center justify-between mt-3">
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-8 h-8 absolute cursor-pointer opacity-0"
                />
                <Image className="cursor-pointer" />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
