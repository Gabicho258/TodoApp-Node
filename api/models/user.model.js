import mongoose from "mongoose";

const shemaUser = {
  email: String,
  password: String,
  name: String,
  todos: Array,
};

const User = mongoose.model("User", shemaUser, "users");

export default User;
