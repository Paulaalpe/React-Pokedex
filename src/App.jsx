import './App.css';
import { useState } from "react";
import Axios from 'axios';

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    height: "",
    weight: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (res) => {
        setPokemon({
          name: pokemonName,
          number: res.data.id,
          species: res.data.species.name,
          image: res.data.sprites.front_default,
          height: res.data.height,
          weight: res.data.weight,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
					type: res.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  return (
    <div className="App">
      <div className='TitleSection'> 
        <h1>Pokédex</h1>
        <input 
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }} 
          value={pokemonName.toLowerCase()}

        />
        <div>
          {pokemonName &&  <button onClick={searchPokemon}>Search Pokémon</button>}       
        </div>
      </div>
      <div className='DisplaySection'>
        {!pokemonChosen ? (
          <p>Please, write the name of a Pokémon!!!!!</p>
        ) : (
          <>
              <h2>{pokemon.name}</h2>
              <h4>NUMBER: {pokemon.number}</h4>
              <h4>SPECIES: {pokemon.species}</h4>
              <h4>HEIGHT: {pokemon.height}</h4>
              <h4>WEIGHT: {pokemon.weight}</h4>
              <img 
                src={pokemon.image}
                alt={pokemon.name} />
              <div className='CardDetails'>
                  <h5>HP: {pokemon.hp}</h5>
                  <h5>Attack: {pokemon.attack}</h5>
                  <h5>Defense: {pokemon.defense}</h5>
                  <h5>Speed: {pokemon.speed}</h5>
                  <h5>Type: {pokemon.type}</h5>
              </div>
                

          </>
        )}
      </div>
    </div>
  );
}

export default App;
