import Car from "../models/Car.js";

export const uploadImagesLocal = async (req, res) => {
  try {
    const urls = req.files.map((file) => {
      return `http://localhost:5000/${file.path}`;
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

    // page & limit from query
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = parseInt(req.query.limit) || 6; // default limit = 6
    const skip = (page - 1) * limit;

    // total documents (for pagination UI)
    const total = await Car.countDocuments({ ownerId });

    const cars = await Car.find({ ownerId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      cars,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6; // 6 per page
    const skip = (page - 1) * limit;

    const totalCars = await Car.countDocuments();
    const cars = await Car.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      cars,
      currentPage: page,
      totalPages: Math.ceil(totalCars / limit),
      totalCars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
