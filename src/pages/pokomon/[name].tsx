import { useQuery } from "@apollo/client";
import { css } from "@emotion/css";
import { Backdrop, CircularProgress, Grid, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { GET_POKEMON_DETAIL } from "../../graphql/queries";
import { PokemonData } from "../../interfaces/PokemonData";
import pokobol from '../../assets/pokobol.png';
import Image from "next/image";
import Link from "next/link";

const Detail: React.FC<{}> = () => {

    const router = useRouter();
    const { data, error, loading } = useQuery(GET_POKEMON_DETAIL, {
        variables: {
            "name": router.query.name
        }
    });

    const [pokemonDetail, setPokemonDetail] = useState<PokemonData>();
    const [isLoading, setIsLoading] = useState(false);
    const [onError, setOnError] = useState('');

    useEffect(() => {
        setPokemonDetail(data?.pokemon);
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
            <Grid container spacing={2} className={css`
            margin-top: 19px;
        `}>
                <Grid item xs={4}>
                    <div className={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                `}>
                        {isLoading ?
                            <Skeleton animation="wave" variant="rectangular"></Skeleton> :
                            <div>
                                <img className="detailPicture" src={pokemonDetail?.sprites.front_default} alt={pokemonDetail?.name} />
                            </div>}
                        <div className="detailName">{pokemonDetail?.name}</div>
                        <div className="row">
                            {pokemonDetail?.types.map(Q =>
                                <div className="detailTypes">{Q.type.name}</div>
                            )}
                        </div>
                        <div className="row">
                            <div className={css`
                            font-size: 1rem;
                            margin-right: 5px;
                            margin-bottom: 12px;
                        `}>Owned:</div>
                            <div className={css`
                            font-size: 1rem;
                            font-weight: 600;
                        `}>0</div>
                        </div>
                        <div className="row">
                            <div className="detailHeightAndWeight">Weight:</div>
                            <div className={css`
                            font-size: 1rem;
                        `}>{(pokemonDetail?.weight ?? 0) / 10} kg</div>
                        </div>
                        <div className="row">
                            <div className="detailHeightAndWeight">Height:</div>
                            <div className={css`
                            font-size: 1rem;
                        `}>{(pokemonDetail?.height ?? 0) / 10} m</div>
                        </div>
                        <button className="row row-center catchBtn">
                            <Image src={pokobol} width={20} height={20} />
                            <div className="catchText">Catch!</div>
                        </button>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div>
                        <div className="detailTitle">Statistics</div>
                        {pokemonDetail?.stats.map(Q =>
                            <div className="row row-between">
                                <div className="statsName">{Q.stat.name}</div>
                                <div className="statsNumber">{Q.base_stat}</div>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="detailTitle">Abilities</div>
                        <div className="row">
                            {pokemonDetail?.abilities.map(Q =>
                                <div className="detailAbilities">{Q.ability.name}</div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="detailTitle">Moves</div>
                        {pokemonDetail?.moves.map(Q =>
                            <div className="row row-between">
                                <div className="detailMoveName">{Q.move.name}</div>
                                <Link href={Q.move.url}>
                                    <a className="detailMoveUrl">Move Detail</a>
                                </Link>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default function PokomonDetailPage() {
    return (
        <Layout title="Pokomon Detail">
            <Detail></Detail>
        </Layout>
    );
}