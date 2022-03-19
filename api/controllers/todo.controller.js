import { Todo } from "../models/index.js";

export const getTodosByUser = async (req, res) => {
  try {
    const { id: idUser } = req.params;
    const todos = await Todo.find({ user_id: idUser });
    res.json(todos);
  } catch (error) {
    res.status(403).json({ error });
  }
};

// Controller create one todo
export const createTodo = async (req, res) => {
  try {
    const { id: user_id } = req.params;
    const todo = new Todo({ ...req.body, user_id });
    const newTodo = await todo.save();
    newTodo && res.status(201).json(newTodo);
  } catch (error) {
    response.status(500).json({ error });
  }
};
export const deleteTodo = async (req, res) => {
  const { id: idTodo } = req.params;
  try {
    const todoToDelete = await Todo.findById(idTodo);
    if (!todoToDelete) {
      res.status(204).send({ err: "No todo to delete" });
    } else {
      const deletedTodo = await Todo.deleteOne(todoToDelete);
      if (deletedTodo) res.status(200).json(deletedTodo);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const findTodo = async (req, res, next) => {
  const { id: idTodo } = req.params;

  try {
    const todo = await Todo.findById(idTodo);
    if (todo) {
      req.data = { todo };
      next();
    } else {
      req.status(204).json({ error: "No todo" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateTodo = async (req, res) => {
  const todoToUpdate = req.body;
  const { todo } = req.data;

  try {
    Todo.updateOne(todo, todoToUpdate, (error, updatedTodo) => {
      if (!error) {
        res.status(200).json(updatedTodo);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
