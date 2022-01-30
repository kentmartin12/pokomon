export interface PokemonData {
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    types: [
        {
            type: {
                name: string;
            }
        }
    ];
    stats: [
        {
            stat: {
                name: string;
            }
            base_stat: number;
        }
    ];
    abilities: [
        {
            ability: {
                name: string;
            }
        }
    ];
    moves: [
        {
            move: {
                name: string;
                url: string;
            }
        }
    ];
}