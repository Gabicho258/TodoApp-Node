import express from "express";

import { todoCtrl } from "../controllers/index.js";

import { validateToken } from "../middlewares/validateToken.js";

const { createTodo, getTodosByUser, deleteTodo, findTodo, updateTodo } =
  todoCtrl;

const router = express.Router();

const todoRoutes = {
  GET_TODOS_BY_USER: "/todos/user/:id",
  CREATE: "/todos/create/:id",
  UPDATE: "/todos/update/:id",
  DELETE: "/todos/delete/:id",
};

router.get(todoRoutes.GET_TODOS_BY_USER, validateToken, getTodosByUser);
router.post(todoRoutes.CREATE, validateToken, createTodo);
router.put(todoRoutes.UPDATE, validateToken, findTodo, updateTodo);
router.delete(todoRoutes.DELETE, validateToken, deleteTodo);

export default router;
