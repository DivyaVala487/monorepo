import { Router } from "express";
import * as MainControllers from "./Main.controllers";
const router = Router();
import multer from "multer";
const upload = multer({ dest: "temp/" });
// For Adding the country
router.post("/add-country", upload.single("image"), MainControllers.addCountry);
// for getting all countries
router.get("/get-all-countries", MainControllers.getAllCountries);
// for adding the state
router.post("/add-state", MainControllers.addState);
// for getting all the states based up on the
router.get("/all-states", MainControllers.getAllStates);
router.get("/get-states", MainControllers.getStates);
router.post("/create-city", MainControllers.addCity);
// need to change
router.post("/get-all-cities", MainControllers.getAllCities);
// for getting all cities initially
router.get("/get-cities", MainControllers.getCities);
// for adding the category
router.post("/add-category", upload.single("image"), MainControllers.addCategory);
router.get("/get-all-category", MainControllers.getAllCategory);
// subcategory need to add the get sub caegory
router.post("/add-sub-category", upload.single("image"), MainControllers.addSubCategory);
router.delete("/delete-sub-category/:categoryId/:subCategoryId", MainControllers.deleteSubCategory);
router.post("/edit-sub-category", upload.single("image"), MainControllers.editSubCategory);


export default router;
