import PokemonCard from '../components/Card'
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Layout from '../components/Layout';
import { Backdrop, CircularProgress } from '@mui/material';
import { GET_ALL_POKEMON_LIST } from '../graphql/queries';

export const Index: React.FC<{}> = () => {

  const { loading, data, error } = useQuery(GET_ALL_POKEMON_LIST, {
    variables: {
      "limit": 25,
      "offset": 0
    }
  });

  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onError, setOnError] = useState('');

  useEffect(() => {
    setPokemonData(data?.pokemons?.results);
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setOnError(error.message);
      alert(onError);
    }
  }, [data]);

  return (
    <div>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <PokemonCard data={pokemonData || []} myPokemon={false} totalOwned={0}></PokemonCard>
    </div>
  )
}

export default function HomePage() {
  return (
    <Layout title='Pokomon Homepage'>
      <Index></Index>
    </Layout>
  )
}
