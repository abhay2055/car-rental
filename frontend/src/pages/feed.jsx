import { useState } from "react";

function CarSearch() {
  const [query, setQuery] = useState("");
  const [car, setCar] = useState(null);

  const searchCar = async () => {
    if (!query) return;

    const res = await fetch(
      `https://api.api-ninjas.com/v1/cars?model=${query}`,
      {
        headers: {
          "X-Api-Key": "1j9++VZOJjnX2zpJaRIHbw==gOgIvBukNBd3I2oJ",
        },
      }
    );

    const data = await res.json();
    setCar(data[0]); // first result
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">
          Search Any Car 🚗🔍
        </h1>

        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 rounded text-black"
            type="text"
            placeholder="Search car e.g. Honda City"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchCar}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {car && (
          <div className="bg-gray-800 mt-8 p-6 rounded-lg shadow-lg text-left">
            <h2 className="text-2xl font-bold">{car.make} {car.model}</h2>
            <p className="text-gray-300">Year: {car.year}</p>
            <p className="text-gray-300">Fuel: {car.fuel_type}</p>
            <p className="text-gray-300">City MPG: {car.city_mpg}</p>
            <p className="text-gray-300">Highway MPG: {car.highway_mpg}</p>
            <p className="text-gray-300">Cylinders: {car.cylinders}</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default CarSearch;
