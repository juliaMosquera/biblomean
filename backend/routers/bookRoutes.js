import express from "express";
import bookController from "../controllers/bookController.js";
import bookMidd from "../middleware/bookValidate.js";
const router = express.Router();


router.post("/saveBook",
bookMidd.existingBook,
bookMidd.idUser,
bookController.registerBook)

router.get("/listBook", bookController.listBook)

router.delete("/deleteBook/:_id", bookController.deleteBook)
router.put("/updateBook", bookController.updateBook)

export default router;
