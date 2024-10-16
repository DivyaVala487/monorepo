import { Router } from "express";
import * as MainControllers from "./Main.controllers";
const router = Router();

router.post("/add-country", MainControllers.addCountry);
router.get("/get-all-countries", MainControllers.getAllCountries);
router.post("/add-state", MainControllers.addState);
router.get("/all-states", MainControllers.getAllStates);
router.post("/create-city", MainControllers.addCity);
router.get("/get-all-cities", MainControllers.getAllCities);


export default router;
