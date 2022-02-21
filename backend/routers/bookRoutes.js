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

router.put("/delete/:_id", bookController.deleteBook)
router.put("/updateBook", bookController.updateBook)

export default router;
