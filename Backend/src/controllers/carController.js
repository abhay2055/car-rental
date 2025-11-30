import Car from "../models/Car.js";

export const uploadImagesLocal = async (req, res) => {
  try {
    const urls = req.files.map((file) => {
      return `${process.env.REACT_APP_API_URL}/${file.path}`;
    });

    res.json({ urls });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Local upload failed" });
  }
};

export const createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json({
      message: "Car added successfully",
      car,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save car" });
  }
};

export const getCarsByUser = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const cars = await Car.find({ ownerId });
    console.log(cars);
    res.json({ cars });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
