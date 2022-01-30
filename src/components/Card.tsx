import { css } from '@emotion/css';
import Link from 'next/link';
import * as React from 'react';
import { PokemonList } from '../interfaces/PokemonList';

const PokemonCard: React.FC<{
    data: PokemonList[],
    myPokemon: boolean,
    pokemonNickname?: string,
    totalOwned: number
}> = ({ data, myPokemon, pokemonNickname, totalOwned }) => {

    return (
        <div className={css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 1px;
        `}>
            {data?.map(Q =>
                <Link href={'/pokomon/' + Q.name} key={Q.name}>
                    <a className="card">
                        <div className="cardPicture">
                            <img src={Q.image} width={144} height={114} />
                        </div>
                        <div className="bottomCard">
                            {myPokemon && <div>{pokemonNickname}</div>}
                            <div className={css`
                                    text-transform: capitalize;
                                `}>{Q.name}</div>
                            <div>Owned: {totalOwned}</div>
                        </div>
                    </a>
                </Link>
            )}
        </div>
    );
}

export default PokemonCard;
