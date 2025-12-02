import { useState } from "react";

function PokemonSearch() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  const searchPokemon = async () => {
    if (!query) return;

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      );

      if (!res.ok) {
        setPokemon(null);
        setError("Pokémon not found!");
        return;
      }

      const data = await res.json();
      setPokemon(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching Pokémon");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">
          Search Any Pokémon ⚡🔥
        </h1>

        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 rounded text-black"
            type="text"
            placeholder="Search Pokémon e.g. pikachu"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchPokemon}
            className="bg-yellow-500 text-black font-bold px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="text-red-400 mt-4">{error}</p>
        )}

        {pokemon && (
          <div className="bg-gray-800 mt-8 p-6 rounded-lg shadow-lg text-left">
            <img
              src={pokemon.sprites.front_default}
              alt="pokemon"
              className="w-32 mx-auto"
            />

            <h2 className="text-2xl font-bold text-center mt-2 capitalize">
              {pokemon.name}
            </h2>

            <p className="text-gray-300 mt-4">
              <strong>ID:</strong> {pokemon.id}
            </p>

            <p className="text-gray-300">
              <strong>Height:</strong> {pokemon.height}
            </p>

            <p className="text-gray-300">
              <strong>Weight:</strong> {pokemon.weight}
            </p>

            <p className="text-gray-300 mt-2">
              <strong>Type:</strong>{" "}
              {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>

            <p className="text-gray-300 mt-2">
              <strong>Abilities:</strong>{" "}
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default PokemonSearch;
