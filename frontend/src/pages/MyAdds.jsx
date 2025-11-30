import { useEffect, useState } from "react";

export default function MyAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyAds();
  }, []);

  const loadMyAds = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      // Decode token → get userId
      const payload = JSON.parse(atob(token.split(".")[1]));
      const ownerId = payload.id;

      const res = await fetch(
        `http://localhost:5000/only/get/car/of/user/${ownerId}`
      );

      const data = await res.json();
      console.log('data'    ,data);
      setAds(data.cars || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Ads</h1>

      {ads.length === 0 ? (
        <p className="text-gray-600">You have not posted any ads yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ads.map((car) => (
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
      )}
    </div>
  );
}
