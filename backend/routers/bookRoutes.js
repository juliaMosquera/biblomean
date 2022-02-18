import express from "express";
import bookController from "../controllers/bookController.js";
import bookMidd from "../middleware/bookValidate.js";
const router = express.Router();

//http://localhost:3001/api/book/registerBook
router.post("/registerBook",
bookMidd.existingBook,
bookMidd.idUser,
bookController.registerBook)

router.get("/listBook/:title?", bookController.listBook)

export default router;
