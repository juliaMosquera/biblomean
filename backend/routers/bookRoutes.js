import express from "express";
import bookController from "../controllers/bookController.js";
const router = express.Router();

//http://localhost:3001/api/book/registerBook
router.post("/registerBook", bookController.registerBook)

export default router;
