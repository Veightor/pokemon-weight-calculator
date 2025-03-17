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
  const [glitch, setGlitch] = useState<boolean>(false);
  const [buttonPulse, setButtonPulse] = useState<boolean>(true);

  // Function to fetch a random Pokemon
  const fetchRandomPokemon = async () => {
    setLoading(true);
    setError(null);
    setGlitch(true);
    setButtonPulse(false);

    // Reset glitch effect after a short delay
    setTimeout(() => setGlitch(false), 1000);

    try {
      // There are approximately 898 Pokemon in the National Pokedex
      const randomId = Math.floor(Math.random() * 898) + 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      setPokemon(response.data);

      // Re-enable button pulse after loading new Pokémon
      setTimeout(() => setButtonPulse(true), 2000);
    } catch (err) {
      setError("CONNECTION FAILURE: Unable to access Pokémon database");
      console.error("Error fetching Pokemon:", err);
      setTimeout(() => setButtonPulse(true), 1000);
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
  ): { helpful: boolean; reason: string; score: number } => {
    // Logic to determine if a Pokemon would be helpful changing a tire

    let score = 50; // Start with a neutral score

    // Very small Pokemon aren't helpful
    if (pokemon.height < 3) {
      score -= 30;
      if (score < 20)
        return {
          helpful: false,
          reason: "ERROR: INSUFFICIENT SIZE FOR TIRE MANIPULATION",
          score,
        };
    }

    // Very heavy Pokemon might be good at lifting things
    if (pokemon.weight > 1000) {
      score += 40;
      if (score > 80)
        return {
          helpful: true,
          reason:
            "ANALYSIS: CAPABLE OF VEHICLE ELEVATION WITHOUT MECHANICAL ASSISTANCE",
          score,
        };
    }

    // Pokemon with high attack or physical stats
    const attackStat = pokemon.stats.find(
      (stat) => stat.stat.name === "attack"
    );
    if (attackStat && attackStat.base_stat > 100) {
      score += 30;
      if (score > 70)
        return {
          helpful: true,
          reason:
            "ANALYSIS: PHYSICAL STRENGTH SUFFICIENT FOR LUG NUT REMOVAL AND TIRE LIFTING",
          score,
        };
    }

    // Fire type Pokemon could heat rusted lug nuts
    if (pokemon.types.some((type) => type.type.name === "fire")) {
      score += 25;
      if (score > 65)
        return {
          helpful: true,
          reason:
            "ANALYSIS: THERMAL CAPABILITIES IDEAL FOR LOOSENING CORRODED COMPONENTS",
          score,
        };
    }

    // Psychic Pokemon could use telekinesis
    if (pokemon.types.some((type) => type.type.name === "psychic")) {
      score += 35;
      if (score > 75)
        return {
          helpful: true,
          reason:
            "ANALYSIS: TELEKINETIC ABILITIES ENABLE NON-CONTACT MAINTENANCE PROCEDURES",
          score,
        };
    }

    // Water types might not be very helpful
    if (pokemon.types.some((type) => type.type.name === "water")) {
      score -= 15;
      if (score < 40)
        return {
          helpful: false,
          reason:
            "WARNING: POTENTIAL FOR ELECTRICAL SYSTEM DAMAGE AND OXIDATION ACCELERATION",
          score,
        };
    }

    // Ghost types can't physically interact with objects very well
    if (pokemon.types.some((type) => type.type.name === "ghost")) {
      score -= 25;
      if (score < 30)
        return {
          helpful: false,
          reason: "ERROR: CORPOREAL INTERACTION LIMITATIONS DETECTED",
          score,
        };
    }

    // Electric types can jump start a car
    if (pokemon.types.some((type) => type.type.name === "electric")) {
      score += 20;
      if (score > 60)
        return {
          helpful: true,
          reason:
            "ANALYSIS: ELECTRICAL GENERATION CAPABILITIES PROVIDE EMERGENCY POWER OPTIONS",
          score,
        };
    }

    // Default response
    return {
      helpful: score > 50,
      reason:
        score > 50
          ? "ANALYSIS: GENERAL ASSISTANCE CAPABILITIES DETECTED, EFFECTIVENESS MODERATE"
          : "WARNING: LIMITED UTILITY FOR VEHICULAR REPAIR OPERATIONS",
      score,
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

  // Type color mapping
  const getTypeColor = (type: string): string => {
    const typeColors: Record<string, string> = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
    };

    return typeColors[type] || "#777777";
  };

  // Custom button component for generating new Pokémon
  const GenerateButton = () => (
    <button
      onClick={fetchRandomPokemon}
      disabled={loading}
      className={`
        relative w-full py-4 px-6 text-xl font-bold uppercase tracking-wider
        bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-blue 
        border-2 border-cyber-yellow rounded-md shadow-neon-blue
        transition-all duration-300 overflow-hidden
        ${buttonPulse ? "animate-cyber-pulse" : ""}
        ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:shadow-neon-pink hover:scale-105"
        }
      `}
    >
      <span className="relative z-10 text-white drop-shadow-lg">
        {loading ? "PROCESSING..." : "GENERATE NEW POKÉMON"}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink opacity-30"></div>

      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="cyber-grid w-full h-full"></div>
      </div>

      {/* Pulsing rings */}
      {buttonPulse && (
        <>
          <div className="absolute inset-0 border-2 border-cyber-yellow rounded-md animate-ping opacity-20"></div>
          <div
            className="absolute inset-0 border border-cyber-blue rounded-md animate-ping opacity-10"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </>
      )}
    </button>
  );

  return (
    <div
      className={`cyber-card relative ${glitch ? "animate-cyber-glitch" : ""}`}
    >
      {/* Control button stays at the top for all states */}
      <div className="p-4 mb-4 bg-cyber-black/60 backdrop-blur-sm border-b border-cyber-blue/30">
        <GenerateButton />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <div className="w-20 h-20 border-4 border-transparent border-t-cyber-blue border-r-cyber-pink rounded-full animate-spin mb-4"></div>
          <p className="text-cyber-blue font-mono">SCANNING POKÉDEX...</p>
        </div>
      ) : error ? (
        <div className="text-center p-12">
          <div className="text-cyber-pink mb-6 font-mono">
            <p className="text-2xl font-bold mb-2">SYSTEM ERROR</p>
            <p>{error}</p>
          </div>
        </div>
      ) : pokemon ? (
        <div>
          <div className="bg-gradient-to-r from-black via-cyber-black to-black p-6 text-center relative overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute inset-0 cyber-grid opacity-20"></div>

            <div className="relative z-10">
              <div className="relative inline-block">
                <img
                  src={
                    pokemon.sprites.other["official-artwork"].front_default ||
                    pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                  className="w-56 h-56 mx-auto animate-cyber-float drop-shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 to-cyber-pink/20 pointer-events-none mix-blend-overlay"></div>
              </div>

              <div className="mt-4">
                <h2 className="text-3xl font-bold text-white">
                  <span className="mr-2 text-cyber-blue font-mono">
                    #
                    <span className="text-cyber-yellow">
                      {pokemon.id.toString().padStart(3, "0")}
                    </span>
                  </span>
                  {formatName(pokemon.name)}
                </h2>

                <div className="flex justify-center mt-3 gap-2">
                  {pokemon.types.map((type, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-bold rounded-sm uppercase tracking-wider"
                      style={{
                        backgroundColor: `${getTypeColor(type.type.name)}`,
                        color: "#000",
                      }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="bg-cyber-black rounded-md p-4 border border-cyber-blue/30">
              <h3 className="font-mono text-cyber-blue mb-3 font-bold">
                COMBAT SPECIFICATIONS
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-gray-400 text-xs uppercase">
                      {formatName(stat.stat.name)}
                    </p>
                    <div className="mt-1 bg-gray-800 rounded-full h-2">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(100, stat.base_stat / 2)}%`,
                          backgroundColor:
                            stat.base_stat > 100
                              ? "#f9f871"
                              : stat.base_stat > 70
                              ? "#05d9e8"
                              : "#ff2a6d",
                        }}
                      ></div>
                    </div>
                    <p className="font-bold text-lg mt-1 font-mono">
                      {stat.base_stat}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weight Analysis */}
            <div className="bg-cyber-black rounded-md p-4 border border-cyber-pink/30">
              <h3 className="font-mono text-cyber-pink mb-3 font-bold">
                MASS ANALYSIS
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-gray-400">WEIGHT:</span>
                  <span className="font-mono text-cyber-yellow font-bold">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-gray-400">HEIGHT:</span>
                  <span className="font-mono text-cyber-yellow font-bold">
                    {(pokemon.height / 10).toFixed(1)} m
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-gray-400">
                    ANIMAL CRACKERS:
                  </span>
                  <span className="font-mono text-cyber-yellow font-bold">
                    {calculateAnimalCrackerWeight(
                      pokemon.weight
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Tire Change Analysis */}
            <div className="bg-cyber-black rounded-md p-4 border border-cyber-green/30">
              <h3 className="font-mono text-cyber-green mb-3 font-bold">
                TIRE CHANGE UTILITY
              </h3>

              {(() => {
                const tireHelp = isTireChangeHelper(pokemon);
                return (
                  <div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            tireHelp.helpful
                              ? "bg-cyber-green"
                              : "bg-cyber-pink"
                          } animate-pulse`}
                        ></div>
                      </div>
                      <div className="font-mono font-bold text-lg">
                        {tireHelp.helpful
                          ? "POSITIVE ASSESSMENT"
                          : "NEGATIVE ASSESSMENT"}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-gray-300 font-mono text-sm">
                        {tireHelp.reason}
                      </p>
                    </div>

                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${tireHelp.score}%`,
                          backgroundColor:
                            tireHelp.score > 70
                              ? "#01c38d"
                              : tireHelp.score > 50
                              ? "#f9f871"
                              : "#ff2a6d",
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">0%</span>
                      <span className="text-xs text-gray-500">50%</span>
                      <span className="text-xs text-gray-500">100%</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-12">
          <p className="text-cyber-blue mb-4 font-mono">
            WAITING FOR POKÉMON DATA INPUT
          </p>
        </div>
      )}

      {/* Fixed floating button at the bottom for mobile - only shown when scrolling down  */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 z-50 px-4 pt-2 pb-4 bg-gradient-to-t from-cyber-black to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <GenerateButton />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
