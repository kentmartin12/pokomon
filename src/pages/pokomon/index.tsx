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
                <Link href="/">
                    <button className='catchBtn'>Catch Now!</button>
                </Link>
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