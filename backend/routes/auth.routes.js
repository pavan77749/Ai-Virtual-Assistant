import express from "express";
import { login, logout,signup } from "../controllers/auth.controller.js";

const userRoutes = express.Router();

userRoutes.post("/signup",signup);

userRoutes.post("/login", login);

userRoutes.post("/logout",logout);

export default userRoutes;
