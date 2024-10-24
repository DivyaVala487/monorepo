import { Router } from "express";
import * as SubCategories from "./SubCategory.controllers";
const router = Router();
import multer from "multer";
const upload = multer({ dest: "temp/" });


/**************************************************************
|                API"S FOR Category                           |
**************************************************************/

router.post("/add-sub-category", upload.array("image"), SubCategories.addSubCategory);

router.get("/get-all-sub-categories", SubCategories.getAllSubCategories);

router.delete("/delete-sub-category/:categoryId/:subCategoryId", SubCategories.deleteSubCategory);

router.put("/edit-sub-category", upload.single("image"), SubCategories.editSubCategory);

export default router;