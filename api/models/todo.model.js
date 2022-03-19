import mongoose from "mongoose";

const shemaTodo = {
  user_id: String,
  title: String,
  done: { type: Boolean, default: false },
};

const Todo = mongoose.model("Todo", shemaTodo, "todos");

export default Todo;
