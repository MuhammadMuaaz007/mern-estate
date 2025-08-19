import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
  logout,
} from "../redux/user/userSlice";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null); // store selected file
  const [previewImage, setPreviewImage] = useState(currentUser.avatar);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // show preview
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", currentUser._id);
    formData.append("username", username);
    formData.append("email", email);
    if (password) formData.append("password", password);
    if (avatarFile) formData.append("avatar", avatarFile);
    try {
      dispatch(updateUserStart());
      const res = await axios.put(
        `/api/auth/update/${currentUser._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(updateUserSuccess(res.data.user));
      // localStorage.setItem("currentUser", JSON.stringify(res.data.user));

      alert("Profile updated successfully");
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error.response?.data || "Update failed"));
      alert("Update failed");
    }
  };

  const handleSignout = async () => {
    try {
      await axios.post("/api/auth/signout", {}, { withCredentials: true });
      // Clear Redux/local state if storing user
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/auth/delete/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Error deleting the Account:", error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">Profile</h1>
      <form onSubmit={handleUpdate} className="flex flex-col mt-5 gap-4">
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
          onChange={handleFileChange}
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          src={
            previewImage?.startsWith("/uploads")
              ? `http://localhost:5000${previewImage}`
              : previewImage
          }
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 "
        />
        {/* <p className="text-green-500 ">Image uploaded successfully!</p> */}

        <input
          type="text"
          placeholder="Username"
          className=" rounded-lg p-3 bg-white"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className=" rounded-lg p-3 bg-white"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded-lg p-3 bg-white"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
          />
        </div>
        <button className="bg-slate-700 text-white uppercase rounded-lg p-3 hover:opacity-90 disabled:opacity-80">
          update
        </button>
        <button
          type="text"
          className="bg-green-700 text-white uppercase rounded-lg p-3 hover:opacity-90 disabled:opacity-80"
        >
          Create listing
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>
          Sign out
        </span>
      </div>
      <div className="text-center mt-5">
        <span className="text-green-700 cursor-pointer">Show listing</span>
      </div>
    </div>
  );
};

export default Profile;
