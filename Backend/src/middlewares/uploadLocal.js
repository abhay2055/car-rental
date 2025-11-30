import multer from "multer";
import path from "path";

// Folder jahan images save hongi
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/cars");   // create this folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

export const uploadLocal = multer({ storage });
