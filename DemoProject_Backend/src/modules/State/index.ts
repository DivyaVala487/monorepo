import { Router } from "express";
import * as StateControllers from "./State.controllers";
const router = Router();
import multer from "multer";
const upload = multer({ dest: "temp/" });


/*-------------------------------------------------------------
|                API"S FOR States                              |
------------------------------------------------------------ */
router.post("/add-state", StateControllers.addState);
router.get("/all-states", StateControllers.getAllStates);
router.delete("/delete-state/:countryId/:stateId", StateControllers.deleteState);
router.put("/edit-state", StateControllers.editState);

export default router;