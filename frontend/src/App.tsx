import { PokemonResponseDto } from '../../backend/src/pokemon/dto/pokemon-response.dto'

import PokemonSearch from './components/pokemon/PokemonSearch';
import './App.css';

function App() {
  return (
    <div className="App">
      <PokemonSearch />
    </div>
  );
}

export default App;