import { useState, useEffect } from "react";
import axios from "axios";

// Pokemon interface to type our data
interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
}

// Average weight of an animal cracker in grams
const ANIMAL_CRACKER_WEIGHT = 2;

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch a random Pokemon
  const fetchRandomPokemon = async () => {
    setLoading(true);
    setError(null);

    try {
      // There are approximately 898 Pokemon in the National Pokedex
      const randomId = Math.floor(Math.random() * 898) + 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      setPokemon(response.data);
    } catch (err) {
      setError("Failed to catch that Pokémon! Try again?");
      console.error("Error fetching Pokemon:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate weight in animal crackers
  const calculateAnimalCrackerWeight = (weightInHectograms: number): number => {
    // Pokemon weight is in hectograms (1hg = 100g)
    const weightInGrams = weightInHectograms * 10;
    return weightInGrams / ANIMAL_CRACKER_WEIGHT;
  };

  // Determine if the Pokemon would be helpful changing a tire
  const isTireChangeHelper = (
    pokemon: Pokemon
  ): { helpful: boolean; reason: string } => {
    // Logic to determine if a Pokemon would be helpful changing a tire

    // Very small Pokemon aren't helpful
    if (pokemon.height < 3) {
      return {
        helpful: false,
        reason: "Too small to lift or move a tire effectively",
      };
    }

    // Very heavy Pokemon might be good at lifting things
    if (pokemon.weight > 1000) {
      return {
        helpful: true,
        reason: "Strong enough to lift a car without a jack!",
      };
    }

    // Pokemon with high attack or physical stats
    const attackStat = pokemon.stats.find(
      (stat) => stat.stat.name === "attack"
    );
    if (attackStat && attackStat.base_stat > 100) {
      return {
        helpful: true,
        reason: "Strong enough to loosen tough lug nuts and lift the tire",
      };
    }

    // Fire type Pokemon could heat rusted lug nuts
    if (pokemon.types.some((type) => type.type.name === "fire")) {
      return { helpful: true, reason: "Can heat and loosen rusted lug nuts" };
    }

    // Psychic Pokemon could use telekinesis
    if (pokemon.types.some((type) => type.type.name === "psychic")) {
      return {
        helpful: true,
        reason: "Could use psychic powers to remove lug nuts and lift the tire",
      };
    }

    // Water types might not be very helpful
    if (pokemon.types.some((type) => type.type.name === "water")) {
      return {
        helpful: false,
        reason: "Might cause rust or electrical issues with the car",
      };
    }

    // Ghost types can't physically interact with objects very well
    if (pokemon.types.some((type) => type.type.name === "ghost")) {
      return {
        helpful: false,
        reason: "Difficulty physically interacting with the tire and tools",
      };
    }

    // Default response
    return {
      helpful: Math.random() > 0.5,
      reason:
        "Could probably help in some way, but not specialized for the task",
    };
  };

  // Fetch a Pokemon on first load
  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  // Format name with first letter uppercase
  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="pokemon-card bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <div className="animate-bounce mb-4">
            <div className="w-16 h-16 bg-pokemon-red rounded-full"></div>
          </div>
          <p className="text-gray-600">Catching a Pokémon...</p>
        </div>
      ) : error ? (
        <div className="text-center p-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchRandomPokemon} className="pokemon-button">
            Try Again
          </button>
        </div>
      ) : pokemon ? (
        <div>
          <div className="bg-gradient-to-r from-pokemon-blue to-pokemon-red p-6 text-center">
            <img
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="w-48 h-48 mx-auto drop-shadow-lg"
            />
            <h2 className="text-2xl font-bold text-white mt-4">
              {formatName(pokemon.name)}
            </h2>
            <div className="flex justify-center mt-2 gap-2">
              {pokemon.types.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-white text-pokemon-blue"
                >
                  {formatName(type.type.name)}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-gray-500 text-sm">
                    {formatName(stat.stat.name)}
                  </p>
                  <p className="font-bold text-lg">{stat.base_stat}</p>
                </div>
              ))}
            </div>

            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold text-pokemon-blue mb-2">Weight Facts</h3>
              <p className="mb-1">
                <span className="font-medium">Official Weight:</span>{" "}
                {pokemon.weight / 10} kg
              </p>
              <p className="mb-1">
                <span className="font-medium">In Animal Crackers:</span>{" "}
                {calculateAnimalCrackerWeight(pokemon.weight).toLocaleString()}{" "}
                crackers
              </p>
              <p className="text-xs text-gray-500">
                (Based on average animal cracker weight of{" "}
                {ANIMAL_CRACKER_WEIGHT}g)
              </p>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg mb-6">
              <h3 className="font-bold text-pokemon-blue mb-2">
                Tire Change Assistant?
              </h3>
              {(() => {
                const tireHelp = isTireChangeHelper(pokemon);
                return (
                  <div
                    className={`p-3 rounded-lg ${
                      tireHelp.helpful ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <p className="font-bold mb-1">
                      {tireHelp.helpful ? "Yes! 👍" : "Not really 👎"}
                    </p>
                    <p>{tireHelp.reason}</p>
                  </div>
                );
              })()}
            </div>

            <button
              onClick={fetchRandomPokemon}
              className="pokemon-button w-full"
            >
              Get Another Pokémon
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-12">
          <p className="text-gray-600 mb-4">No Pokémon found</p>
          <button onClick={fetchRandomPokemon} className="pokemon-button">
            Catch a Pokémon
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
