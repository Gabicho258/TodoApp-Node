import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find();
    if (users.length === 0) response.status(204).send();
    else response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const getOneUser = async (req, res) => {
  const { id: idUser } = req.params;
  const user = await User.findById(idUser);
  res.json(user);
};

export const createUser = async (req, res) => {
  const { password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const newUser = new User({ ...req.body, password: hash });
  try {
    const user = await newUser.save();
    user && res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const userDB = await User.findOne({ email });
  if (!userDB) {
    res.status(403).send();
    return;
  }

  //Validate Hash
  const passToHash = `${password}`;
  bcrypt.compare(passToHash, userDB.password, (err, isPassValid) => {
    if (email === userDB.email && isPassValid) {
      //JWT
      jwt.sign(
        { email: userDB.email },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            res.status(200).json({
              token,
              name: userDB.name,
              id: userDB._id,
            });
          } else {
            res.status(403).send();
          }
        }
      );
    } else {
      res.status(403).send();
    }
  });
};
