import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

//http://localhost:3001/api/user/registerUser
router.post("/registerUser", userController.registerUser)

export default router;
