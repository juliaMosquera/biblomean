import express from "express";
import bookController from "../controllers/bookController.js";
import bookMidd from "../middleware/bookValidate.js";
import auth from "../middleware/auth.js";


const router = express.Router();


router.post("/registerBook",
auth,
bookMidd.idUser,
bookMidd.existingBook,
bookController.registerBook)

router.get("/listBook", auth, bookController.listBook)

router.delete("/deleteBook/:_id", auth, bookController.deleteBook)
router.put("/updateBook", auth, bookController.updateBook)

export default router;
