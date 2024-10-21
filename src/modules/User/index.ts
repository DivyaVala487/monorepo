import { Router } from "express";
import * as MainControllers from "./Main.controllers";
const router = Router();
import multer from "multer";
const upload = multer({ dest: "temp/" });


/*-------------------------------------------------------------
|                API"S FOR Countries , States and Cities      |
------------------------------------------------------------ */

// Api For Adding the Country
router.post("/add-country", upload.single("image"), MainControllers.addCountry);

// Api For  Getting All the Countries
router.get("/get-all-countries", MainControllers.getAllCountries);

// for adding the state
router.post("/add-state", MainControllers.addState);

// for getting all the states while loading the page
router.get("/all-states", MainControllers.getAllStates);

// router.get("/get-states", MainControllers.getStates);
router.post("/create-city", MainControllers.addCity);

// need to change
router.get("/get-all-cities", MainControllers.getAllCities);

// for getting all cities initially
router.get("/get-cities", MainControllers.getCities);


/*-------------------------------------------------------------
|                API"S FOR Category and Sub category           |
------------------------------------------------------------ */
// for adding the category
router.post("/add-category", upload.single("image"), MainControllers.addCategory);

// for getting all category
router.get("/get-all-category", MainControllers.getAllCategory);

// for adding the subcategory
router.post("/add-sub-category", upload.array("image"), MainControllers.addSubCategory);

// for getting all  subcategory
router.get("/get-all-sub-categories", MainControllers.getAllSubCategories);

// for the deleting the subcategory based up on the category_id
router.delete("/delete-sub-category/:categoryId/:subCategoryId", MainControllers.deleteSubCategory);

// for editong the subcategory
router.put("/edit-sub-category", upload.single("image"), MainControllers.editSubCategory);



export default router;
