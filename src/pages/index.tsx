import type { NextPage } from 'next'
import PokemonCard from '../components/Card'
import { css } from '@emotion/css';
import { GET_ALL_POKEMON_LIST } from '../graphql/queries/getAllPokemonList';
import { useEffect, useState } from 'react';
import { PokemonList } from '../interfaces/PokemonList';
import { useQuery } from '@apollo/client';

const Home: NextPage = () => {

  const { loading, data, error } = useQuery(GET_ALL_POKEMON_LIST, {
    variables: {
      "limit": 9,
      "offset": 0
    }
  });

  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    setPokemonData(data?.pokemons?.results)
  }, [data]);

  return (
    <div className={css`
      margin: 0 auto;
      max-width: 960px;
    `}>
      <PokemonCard data={pokemonData || []} myPokemon={false} totalOwned={0}></PokemonCard>
    </div>
  )
}

export default Home
