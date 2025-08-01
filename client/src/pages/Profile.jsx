import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">Profile</h1>
      <form action="" className="flex flex-col mt-5 gap-4">
        <img src={currentUser.avatar} alt="profile Photo"  className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 "/>
        
        <input
          type="text"
          placeholder="Username"
          className=" rounded-lg p-3 bg-white"
          id="username"
          name="username"
        />
        <input
          type="email"
          placeholder="Email"
          className=" rounded-lg p-3 bg-white"
          id="email"
          name="email"
        />
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg p-3 bg-white"
            id="password"
            name="password"
          />
          <FontAwesomeIcon
            icon={faEyeSlash}
            onClick={() => console.log("eye")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
          />
        </div>
        <button className="bg-slate-700 text-white uppercase rounded-lg p-3 hover:opacity-90 disabled:opacity-80" >
          update
        </button>
          <button type="text" className="bg-green-700 text-white uppercase rounded-lg p-3 hover:opacity-90 disabled:opacity-80" >Create listing</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <div className="text-center mt-5">
        <span className="text-green-700 cursor-pointer">Show listing</span>
      </div>
    </div>
  );
};

export default Profile;
