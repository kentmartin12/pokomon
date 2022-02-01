import { css } from '@emotion/css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { PokemonList } from '../interfaces/PokemonList';

const PokemonCard: React.FC<{
    data: PokemonList[],
    isMyPokemon: boolean,
}> = ({ data, isMyPokemon }) => {
    const [myPokemon, setMyPokemon] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (localStorage.length !== 0) {
            const storageData = JSON.parse(localStorage.getItem('my-pokemon') || '');
            setMyPokemon(storageData);
            setRefresh(false);
        }
    }, [isMyPokemon, refresh]);

    function releasePokemon(pokemonNickname: string) {
        const release = myPokemon.filter((Q: any) => Q.nickname !== pokemonNickname);
        localStorage.setItem('my-pokemon', JSON.stringify(release));
        setRefresh(true);
    }

    return (
        <div className={css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 1px;
        `}>
            {!isMyPokemon ? data?.map((Q, index) =>
                <Link href={'/pokomon/' + Q.name} key={index}>
                    <a className="card">
                        <div className="cardPicture">
                            <img src={Q.image} width={144} height={114} />
                        </div>
                        <div className="bottomCard">
                            <div className={css`
                                    text-transform: capitalize;
                                `}>{Q.name}</div>
                        </div>
                    </a>
                </Link>
            ) : myPokemon.map((Q: any, index) =>
                <div className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                `}>
                    <Link href={'/pokomon/' + Q.name} key={index}>
                        <a className="card">
                            <div className="cardPicture">
                                <img src={Q.image} width={144} height={114} />
                            </div>
                            <div className="bottomCardOwned">
                                {isMyPokemon && <div className={css`
                                        text-transform: capitalize;
                                    `}>{Q.nickname}</div>}
                                <div className={css`
                                        text-transform: capitalize;
                                        opacity: 50%;
                                        font-size: 0.8rem;
                                    `}>{Q.name}</div>
                            </div>
                        </a>
                    </Link>
                    <div className='bottomCard'>
                        <button className='releaseBtn' onClick={() => releasePokemon(Q.nickname)}>Release</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PokemonCard;
