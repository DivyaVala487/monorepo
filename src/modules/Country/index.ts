import { Router } from "express";
import * as CountryControllers from "./Country.controllers";
const router = Router();
import multer from "multer";
const upload = multer({ dest: "temp/" });

/*-------------------------------------------------------------
|                API"S FOR Countries                          |
------------------------------------------------------------ */

// Adding the country

router.post("/add-country", upload.single("image"), CountryControllers.addCountry);

// Get All Countries

router.get("/get-all-countries", CountryControllers.getAllCountries);

// For the Deleting the country

router.delete("/delete-country/:countryId", CountryControllers.deleteCountry);

// For Editing the Country

router.put("/edit-country", upload.single("image"), CountryControllers.editCountry);


export default router;