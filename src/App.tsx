import { useState } from "react";
import PokemonCard from "./components/PokemonCard";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pokemon-blue to-pokemon-red py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pokemon-yellow mb-4 drop-shadow-lg">
            Pokémon Weight Calculator
          </h1>
          <p className="text-white text-xl max-w-2xl mx-auto">
            Discover how many animal crackers your favorite Pokémon weighs and
            if they'd be helpful changing a tire!
          </p>
        </header>

        <PokemonCard />

        <footer className="mt-16 text-center text-white text-sm">
          <p>Created with ❤️ for Pokémon fans everywhere</p>
          <p className="mt-2">Powered by the PokéAPI</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
