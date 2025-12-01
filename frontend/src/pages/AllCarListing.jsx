import { useEffect, useState } from "react";

export default function CarCollection() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCars(page);
  }, [page]);

  const fetchCars = async (pageNumber) => {
    try {
      const res = await fetch(
        `https://car-rental-5zqp.onrender.com/api/cars/all/list?page=${pageNumber}`
      );
      const data = await res.json();

      setCars(data.cars || []);
      setTotalPages(data.totalPages || 1);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Car Collection</h1>

      {/* Car Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={car.images?.[0]}
              alt="Car"
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-3">{car.brand}</h2>
            <p className="text-gray-700">{car.model}</p>
            <p className="text-gray-500">Year: {car.year}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400"
        >
          Prev
        </button>

        <span className="text-xl font-medium">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
