import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import carRoutes from "./src/routes/carRoutes.js";

import cors from "cors";


dotenv.config();
connectDB();

const app = express();
// app.use(cors());  
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running with ES6 imports...");
});

app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes);

app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port", process.env.PORT);
}); 