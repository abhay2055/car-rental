import express from "express";

import { uploadLocal } from "../middlewares/uploadLocal.js";
import { uploadImagesLocal,createCar,getCarsByUser} from "../controllers/carController.js";


const router = express.Router();

router.post("/upload-car-images", uploadLocal.array("images", 10), uploadImagesLocal);
router.post("/create", createCar);
router.get("/get/user/:ownerId", getCarsByUser);

export default router;
