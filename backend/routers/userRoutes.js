import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import midleExisting from "../middleware/userValidate.js";
import roleMidd from "../middleware/roleValidate.js";



const router = express.Router();


router.post("/registerUser",
midleExisting.existingUser,
roleMidd.getRoleUser,
userController.registerUser);

router.get("/listUser", userController.listUser)

router.post("/login", userController.login);

router.put("/delete/:_id", userController.deleteUser)

router.put("/updateUserAdmin", userController.updateUser)

export default router;
