import { useState } from "react";

export default function AddCar() {
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",  
    location: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    const uploadRes = await fetch(
      `http://localhost:5000/api/cars/upload-car-images`,
      {
        method: "POST",
        body: formData,
      }
    );

    const token = localStorage.getItem("token");

    let ownerId = null;

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        ownerId = payload.id;
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    const uploaded = await uploadRes.json();

    const finalData = {
      ...carData,
      images: uploaded.urls,
      ownerId: ownerId,
    };

    const res = await fetch(
      `http://localhost:5000/api/cars/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      }
    );

    const data = await res.json();
    console.log("Car saved:", data);
    alert("Car added successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Car
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="number"
            name="pricePerDay"
            placeholder="Price per Day"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* File Input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageSelect}
              className="w-full p-3 border rounded-lg bg-gray-50 cursor-pointer"
            />
          </div>

          {/* Preview */}
          <div className="flex gap-3 flex-wrap mt-3">
            {preview.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="preview"
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
}
