import { PokemonResponseDto } from '../../backend/src/pokemon/dto/pokemon-response.dto'

import PokemonSearch from './components/pokemon/PokemonSearch';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <PokemonSearch />
    </div>
  );
}

export default App;