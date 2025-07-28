import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className=" rounded-lg p-3 bg-white"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className=" rounded-lg p-3 bg-white"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className=" rounded-lg p-3 bg-white"
          id="password"
        />
        <button className="bg-slate-700 rounded-lg p-3 text-white hover:opacity-95 disabled:opacity-80 uppercase">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-600 hover:text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
