import { css } from '@emotion/css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PokemonCard from '../../components/Card';
import Layout from '../../components/Layout';

export const Index: React.FC<{}> = () => {
    const [myPokemon, setMyPokemon] = useState([]);

    useEffect(() => {
        if (localStorage.length !== 0) {
            const storageData = JSON.parse(localStorage.getItem('my-pokemon') || '');
            setMyPokemon(storageData);
        }
    }, []);

    return (
        <div>
            {myPokemon.length === 0 &&
                <div className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                `}>
                    <h2>You don't have any Pokomon yet...</h2>
                    <Link href="/">
                        <button className='catchBtn'>Catch Now!</button>
                    </Link>
                </div>
            }
            {myPokemon.length !== 0 && <PokemonCard data={myPokemon || []} isMyPokemon={true}></PokemonCard>}
        </div>
    );
}

export default function MyPokemonPage() {
    return (
        <Layout title='My Pokemon'>
            <Index></Index>
        </Layout>
    )
}