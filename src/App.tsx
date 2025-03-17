import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import "./index.css";

interface HexagonProps {
  size: number;
  color: string;
  animationDelay: number;
  top: number;
  left: number;
}

interface Hexagon extends HexagonProps {
  id: number;
}

const FloatingHexagon = ({
  size,
  color,
  animationDelay,
  top,
  left,
}: HexagonProps) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        animationDelay: `${animationDelay}s`,
        opacity: 0.3,
      }}
    >
      <div
        className={`animate-cyber-float`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: color,
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      />
    </div>
  );
};

const CyberScanlines = () => {
  return <div className="cyber-scanline"></div>;
};

function App() {
  const [hexagons, setHexagons] = useState<Hexagon[]>([]);

  useEffect(() => {
    // Generate random hexagons for the background
    const newHexagons: Hexagon[] = [];
    const hexColors = ["#05d9e8", "#ff2a6d", "#b967ff", "#f9f871"];

    for (let i = 0; i < 20; i++) {
      newHexagons.push({
        id: i,
        size: Math.random() * 30 + 10,
        color: hexColors[Math.floor(Math.random() * hexColors.length)],
        animationDelay: Math.random() * 5,
        top: Math.random() * 100,
        left: Math.random() * 100,
      });
    }

    setHexagons(newHexagons);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-black overflow-hidden relative">
      {/* Animated grid background */}
      <div className="cyber-grid fixed inset-0"></div>

      {/* Floating hexagons */}
      {hexagons.map((hex) => (
        <FloatingHexagon
          key={hex.id}
          size={hex.size}
          color={hex.color}
          animationDelay={hex.animationDelay}
          top={hex.top}
          left={hex.left}
        />
      ))}

      {/* Scanlines effect */}
      <CyberScanlines />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4 text-cyber-blue">
            <span className="cyber-glitch-text" data-text="POKÉ">
              POKÉ
            </span>
            <span className="text-cyber-pink">CYBER</span>
            <span className="cyber-glitch-text" data-text="CALC">
              CALC
            </span>
          </h1>
          <div className="max-w-2xl mx-auto bg-cyber-black/50 backdrop-blur-sm p-4 rounded-md">
            <p className="text-xl text-cyber-yellow font-medium">
              DISCOVER YOUR POKÉMON'S WEIGHT IN ANIMAL CRACKERS AND ASSESS ITS
              TIRE-CHANGING CAPABILITIES
            </p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="lg:w-7/12">
            <PokemonCard />
          </div>

          <div className="lg:w-5/12 cyber-card p-8 animate-cyber-pulse">
            <h2 className="text-3xl font-bold mb-6 text-cyber-green">
              User Terminal
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-cyber-blue mb-2">
                  How It Works
                </h3>
                <p className="text-cyber-yellow">
                  Our advanced quantum algorithm calculates the precise animal
                  cracker equivalent of each Pokémon's weight. Click the button
                  to generate a new Pokémon and discover its hidden metrics.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-cyber-blue mb-2">
                  Tire Change Analysis
                </h3>
                <p className="text-cyber-yellow">
                  Our neural network evaluates each Pokémon's physical
                  capabilities, elemental properties, and temperament to
                  determine their effectiveness as roadside assistance
                  companions.
                </p>
              </div>

              <div className="mt-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="bg-cyber-black p-3 border border-cyber-pink rounded-md flex-1">
                    <h4 className="text-lg font-semibold text-cyber-pink mb-1">
                      System Status
                    </h4>
                    <p className="text-white font-mono">CONNECTION: SECURE</p>
                    <p className="text-white font-mono">API: OPERATIONAL</p>
                    <p className="text-white font-mono">
                      QUANTUM-CRACKERS: CALIBRATED
                    </p>
                  </div>

                  <div className="bg-cyber-black p-3 border border-cyber-blue rounded-md flex-1">
                    <h4 className="text-lg font-semibold text-cyber-blue mb-1">
                      Data Registry
                    </h4>
                    <p className="text-white font-mono">POKÉMON ENTRIES: 898</p>
                    <p className="text-white font-mono">
                      CRACKERS CALIBRATED: YES
                    </p>
                    <p className="text-white font-mono">
                      TIRE-CHANGE MODELS: ACTIVE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>
            Engineered with <span className="text-cyber-pink">❤</span> for
            Pokémon trainers on the go
          </p>
          <p className="mt-2">Powered by the PokéAPI & quantum computing</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
