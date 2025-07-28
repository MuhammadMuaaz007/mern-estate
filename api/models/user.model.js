import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: string,
      require: true,
      unique: true,
    },
    email: {
      type: string,
      require: true,
      unique: true,
    },
    password: {
      type: string,
      require: true,
    },
  },
  { Timestamp: true }
);

const User = mongoose.model("User", userSchema);
export default User;
