import express from "express";
// import { upload } from "../middlewares/upload.js";
// import { uploadImages, createCar } from "../controllers/carController.js";

import { uploadLocal } from "../middlewares/uploadLocal.js";
import { uploadImagesLocal,createCar,getCarsByUser} from "../controllers/carController.js";


const router = express.Router();

router.post("/upload-car-images", uploadLocal.array("images", 10), uploadImagesLocal);
router.post("/cars", createCar);
router.get("/car/of/user/:ownerId", getCarsByUser);

export default router;
