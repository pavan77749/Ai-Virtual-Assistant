import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import {isAuth} from "../middleware/isAuth.js";
import upload from "../middleware/multer.js"
import { updateAssistant } from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/me", isAuth, getUsers);
userRoutes.post("/update", isAuth, upload.single("assistantImage"), updateAssistant);

export default userRoutes;
