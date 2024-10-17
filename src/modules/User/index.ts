import { Router } from "express";
import * as MainControllers from "./Main.controllers";
const router = Router();
import multer from "multer";
const upload = multer({ dest: "temp/" });
router.post("/add-country", upload.single("image"), MainControllers.addCountry);
router.get("/get-all-countries", MainControllers.getAllCountries);
router.post("/add-state", MainControllers.addState);
router.post("/all-states", MainControllers.getAllStates);
router.post("/create-city", MainControllers.addCity);
router.post("/get-all-cities", MainControllers.getAllCities);
// for adding the category
router.post("/add-category", upload.single("image"), MainControllers.addCategory);
router.get("/get-all-category", MainControllers.getAllCategory);
router.post("/add-sub-category", upload.single("image"), MainControllers.addSubCategory);
export default router;
