import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter, todoRouter } from "./api/routes/index.js";

const dbConecction = process.env.DB_STRING_CONNECTION;
await mongoose.connect(dbConecction);

mongoose.connection.on("error", (e) => console.error("ERROR: ", e));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("TodoApp - API");
});

app.use("/api", userRouter);
app.use("/api", todoRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server inicializado");
});
