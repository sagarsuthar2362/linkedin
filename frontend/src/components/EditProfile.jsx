import axios from "axios";
import { Camera, Plus, X } from "lucide-react";
import React, { useState } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const EditProfile = ({ setEditProfile }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [education, setEducation] = useState({
    institutionName: "",
    degree: "",
    fieldOfStudy: "",
  });
  const [experience, setExperience] = useState({
    companyName: "",
    position: "",
  });

  const handleAddSkill = (newSkill) => {
    if (newSkill.trim().length == 0) return;
    if (skills.includes(newSkill)) {
      setNewSkill("");
      return;
    }

    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  const handleDeleteSkill = (skillToDelete) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToDelete);
    setSkills(updatedSkills);
  };

  const handleUpdateForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (skills.length > 0) formData.append("skills", JSON.stringify(skills));
    if (profileImage) formData.append("profileImage", profileImage);
    if (coverImage) formData.append("coverImage", coverImage);
    if (education) formData.append("education", JSON.stringify(education));
    if (experience) formData.append("experience", JSON.stringify(experience));

    try {
      const res = await axios.put(
        `${backendURL}/api/user/update-profile`,
        formData,
        {
          withCredentials: true,
        },
      );
      console.log(res);
    } catch (error) {
      console.log("error occured while updating profile", error.response);
    }
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 z-99 flex items-center justify-center">
      <div className="bg-white h-[500px] w-[400px] rounded-lg relative px-3 py-11 overflow-auto">
        <X
          size={30}
          className="cursor-pointer absolute right-2 top-2"
          onClick={() => setEditProfile(false)}
        />

        <div className="h-[24%] bg-gray-300 rounded">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setCoverImage(file);
              setCoverImagePreview(URL.createObjectURL(file));
            }}
            className="absolute right-5 cursor-pointer w-10 h-10 z-99 opacity-0"
          />

          <img src={`${coverImagePreview}`} alt="" />

          <Camera className="absolute right-5 cursor-pointer" />
        </div>

        <div className="">
          <div className="relative -mt-10 left-[15px] w-fit">
            <img
              src={`${profileImagePreview || "empty-user.png"}`}
              alt=""
              className="h-17 w-17"
            />

            <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProfileImage(e.target.files[0]);
                  setProfileImagePreview(URL.createObjectURL(file));
                }}
                className="absolute right-0 cursor-pointer w-7 h-5 z-99 opacity-0"
              />

              <Plus />
            </div>
          </div>

          <div className="mt-4">
            <form className="space-y-3" onSubmit={handleUpdateForm}>
              <input
                type="text"
                name="firstName"
                placeholder="Firstname"
                className="border border-gray-400 outline-none w-full rounded p-2"
              />

              <input
                type="text"
                name="lastName"
                placeholder="Lastname"
                className="border border-gray-400 outline-none w-full rounded p-2"
              />

              <input
                type="text"
                name="userName"
                placeholder="Username"
                className="border border-gray-400 outline-none w-full rounded p-2"
              />

              <input
                type="text"
                name="headline"
                placeholder="Headline"
                className="border border-gray-400 outline-none w-full rounded p-2"
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                className="border border-gray-400 outline-none w-full rounded p-2"
              />

              <div className="border border-gray-400 p-2">
                <label className="block mb-1"> Skills</label>

                <div className="space-y-2 mb-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 p-2 flex justify-between"
                    >
                      <p>{skill}</p>
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => handleDeleteSkill(skill)}
                      >
                        <X />
                      </button>
                    </div>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Skills"
                  className=" outline-none w-full rounded border p-2"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />

                <button
                  className="text-blue-500 border w-full mt-2 rounded cursor-pointer"
                  type="button"
                  onClick={() => handleAddSkill(newSkill)}
                >
                  Add
                </button>
              </div>

              <select
                name="gender"
                className="w-full border border-gray-400 py-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <div className="border border-gray-400 p-2 space-y-2">
                <label className="block mb-1">Education</label>
                <input
                  type="text"
                  placeholder="Degree"
                  className="p-2 w-full border border-gray-200 outline-none"
                  onChange={(e) =>
                    setEducation({ ...education, degree: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Institution Name"
                  className="p-2 w-full border border-gray-200 outline-none"
                  onChange={(e) =>
                    setEducation({ ...education, institution: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Field of study"
                  className="p-2 w-full border border-gray-200 outline-none"
                  onChange={(e) =>
                    setEducation({ ...education, fieldOfStudy: e.target.value })
                  }
                />
              </div>

              <div className="border border-gray-400 p-2 space-y-2">
                <label className="block mb-1">Experience</label>
                <input
                  type="text"
                  placeholder="Company"
                  className="p-2 w-full border border-gray-200 outline-none"
                  onChange={(e) =>
                    setExperience({ ...experience, company: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Position"
                  className="p-2 w-full border border-gray-200 outline-none"
                  onChange={(e) =>
                    setExperience({ ...experience, position: e.target.value })
                  }
                />
              </div>

              <button
                className="w-full bg-blue-500 text-white rounded-md py-2 cursor-pointer"
                type="submit"
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
