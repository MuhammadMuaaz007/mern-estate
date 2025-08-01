
import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // <-- fix here
      unique: true,
    },
    email: {
      type: String,
      required: true, // <-- fix here
      unique: true,
    },
    password: {
      type: String,
      required: true, // <-- fix here
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
