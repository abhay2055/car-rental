import express from "express";

import { uploadLocal } from "../middlewares/uploadLocal.js";
import { uploadImagesLocal,createCar,getCarsByUser,getAllCars} from "../controllers/carController.js";


const router = express.Router();

router.post("/upload-car-images", uploadLocal.array("images", 10), uploadImagesLocal);
router.post("/create", createCar);
router.get("/get/user/:ownerId", getCarsByUser);
router.get("/all/list", getAllCars);

export default router;
