// routes/user.routes.js
import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/UserController.js";

const router = express.Router();
router.post("/", createUser);
router.post("/login", loginUser);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
