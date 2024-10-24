import { Router } from "express";
import * as CityControllers from "./City.controllers";
const router = Router();
import multer from "multer";
const upload = multer({ dest: "temp/" });

/*-------------------------------------------------------------
|                API"S FOR Cities                             |
------------------------------------------------------------ */
router.post("/create-city", CityControllers.addCity);


router.get("/get-all-cities", CityControllers.getAllCities);

router.delete("/delete-city/:cityId", CityControllers.deleteCity);

router.put("/edit-city", CityControllers.editCity);


// first approach when user wants to see the initial data
router.get("/get-cities", CityControllers.getCities);

export default router;