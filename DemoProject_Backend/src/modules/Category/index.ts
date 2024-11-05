import { Router } from "express";
import * as CategoryControllers from "./Category.controllers";
const router = Router();
import multer from "multer";
const upload = multer({ dest: "temp/" });


/*-------------------------------------------------------------
|                API"S FOR Categories                         |
------------------------------------------------------------ */


router.post("/add-category", upload.single("image"), CategoryControllers.addCategory);

router.get("/get-all-category", CategoryControllers.getAllCategory);

router.put("/edit-category", upload.single("image"), CategoryControllers.editCategory);

router.delete("/delete-category/:categoryId", CategoryControllers.deleteCategory);

export default router;