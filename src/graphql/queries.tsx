import { gql } from "@apollo/client";

export const GET_ALL_POKEMON_LIST = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            results {
                url
                name
                image
            }
        }
    }
`;

export const GET_POKEMON_DETAIL = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            name
            height
            weight
            sprites{
                front_default
            }
            stats {
                stat {
                    name
                }
                base_stat
            }
            abilities {
                ability {
                    name
                }
            }
            moves {
                move {
                    name
                    url
                }
            }
            types {
                type {
                    name
                }
            }
        }
    }
`;