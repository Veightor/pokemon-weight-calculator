import { useState, useEffect } from "react";
import { styled } from "styled-components";
import "./App.css";
import { getRandomInt, hexToRgb } from "./utils";
import AnimalCrackerWeightChart from "./components/AnimalCrackerWeightChart";
import AnimatedHexagons from "./components/AnimatedHexagons";
import TireChangerUtilityChart from "./components/TireChangerUtilityChart";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

interface Pokemon {
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
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

// Styled components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
  color: #e0e0e0;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #0ff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5);

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #aaa;
  max-width: 600px;
  margin: 0 auto;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #ff0055, #0099ff);
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 153, 255, 0.5);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(0, 153, 255, 0.7);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.6s ease;
  }

  &:hover:before {
    left: 100%;
  }
`;

const Card = styled.div`
  background: rgba(20, 20, 30, 0.8);
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  border: 1px solid rgba(0, 255, 255, 0.1);
  z-index: 2;
  position: relative;
  backdrop-filter: blur(10px);
`;

const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const PokemonImage = styled.img`
  width: 180px;
  height: 180px;
  filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5));
  margin-bottom: 1rem;
`;

const PokemonName = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  color: #0ff;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
`;

const TypeBadge = styled.span<{ color: string }>`
  background: ${(props) => props.color};
  color: #fff;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin: 0 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 0 10px ${(props) => {
    const rgb = hexToRgb(props.color);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
  }};
`;

const PokemonTypes = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const PokemonMeasurement = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: #ddd;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #0ff;
  text-align: center;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

const ErrorText = styled.p`
  font-size: 1.2rem;
  color: #ff3366;
  text-align: center;
`;

const Section = styled.section`
  margin-top: 2rem;
  width: 100%;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #0ff;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
  padding-bottom: 0.5rem;
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #0ff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #0ff;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
  }
`;

// Type colors
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

// Back to Top Button Component
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <BackToTopButton onClick={scrollToTop} className="cyber-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </BackToTopButton>
      )}
    </>
  );
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomPokemon = async () => {
    setLoading(true);
    setError("");
    try {
      const id = getRandomInt(1, 898); // There are 898 Pokémon in the National Pokédex
      const response = await fetch(`${API_URL}${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon data");
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError("Error fetching Pokémon. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <AppContainer>
      <AnimatedHexagons />
      <Header>
        <Title>Pokémon Weight Calculator</Title>
        <Subtitle>
          Discover how many animal crackers your favorite Pokémon weighs and if
          it would be useful for changing a tire
        </Subtitle>
      </Header>

      <Card>
        <Button onClick={fetchRandomPokemon}>Generate Random Pokémon</Button>

        {loading && <LoadingText>Loading Pokémon data...</LoadingText>}
        {error && <ErrorText>{error}</ErrorText>}

        {pokemon && !loading && (
          <>
            <PokemonInfo>
              <PokemonImage
                src={
                  pokemon.sprites.other["official-artwork"].front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
              />
              <PokemonName>{pokemon.name}</PokemonName>
              <PokemonTypes>
                {pokemon.types.map((type) => (
                  <TypeBadge
                    key={type.type.name}
                    color={typeColors[type.type.name] || "#777"}
                  >
                    {type.type.name}
                  </TypeBadge>
                ))}
              </PokemonTypes>
              <PokemonMeasurement>
                Height: {pokemon.height / 10} m
              </PokemonMeasurement>
              <PokemonMeasurement>
                Weight: {pokemon.weight / 10} kg
              </PokemonMeasurement>
            </PokemonInfo>

            <Section>
              <SectionTitle>Animal Cracker Equivalence</SectionTitle>
              <AnimalCrackerWeightChart weight={pokemon.weight / 10} />
            </Section>

            <Section>
              <SectionTitle>Tire Changer Utility Assessment</SectionTitle>
              <TireChangerUtilityChart weight={pokemon.weight / 10} />
            </Section>
          </>
        )}
      </Card>
      <BackToTopButton />
    </AppContainer>
  );
}

export default App;