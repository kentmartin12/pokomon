import { gql, useQuery } from "@apollo/client";

export const GET_ALL_POKEMON_LIST = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            results {
                id
                url
                name
                image
            }
        }
    }
`;