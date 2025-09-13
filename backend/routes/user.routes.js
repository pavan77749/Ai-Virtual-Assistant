import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import {isAuth} from "../middleware/isAuth.js";

const userRoutes = express.Router();

userRoutes.get("/me", isAuth, getUsers);

export default userRoutes;
