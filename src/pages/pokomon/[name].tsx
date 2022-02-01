import { useQuery } from "@apollo/client";
import { css } from "@emotion/css";
import { Alert, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Skeleton, TextField } from "@mui/material";
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
    const [pokemonDetail, setPokemonDetail] = useState<PokemonData>();
    const [myPokemon, setMyPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [onError, setOnError] = useState('');
    const [catched, setCatched] = useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [totalOwned, setTotalOwned] = useState(0);
    const [nickname, setNickname] = useState('');
    const [isUniqueNickname, setIsUniqueNickname] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        alert('You release the pokemon!');
    };

    const { data, error, loading } = useQuery(GET_POKEMON_DETAIL, {
        variables: {
            "name": router.query.name
        }
    });

    useEffect(() => {
        if (localStorage.length !== 0) {
            const storageData = JSON.parse(localStorage.getItem('my-pokemon') || '');
            setMyPokemon(storageData);
        }
    }, [catched]);

    useEffect(() => {
        setPokemonDetail(data?.pokemon);
        const check = myPokemon.filter((Q: any) => Q.name == router.query.name);
        setTotalOwned(check.length);
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

    function catchPokomon() {
        if (Math.random() > 0.5) {
            handleOpen();
        } else {
            alert(`Failed to catch wild ${pokemonDetail?.name}`)
        }
    }

    function saveToMyPokemon() {
        const uniqueNickname = myPokemon.find((Q: any) => Q.nickname === nickname);
        if (uniqueNickname) {
            return setIsUniqueNickname(true);
        }
        setCatched(true);
        const catchedPokemon = [...myPokemon, {
            name: pokemonDetail?.name,
            nickname: nickname,
            image: pokemonDetail?.sprites.front_default
        }]
        localStorage.setItem('my-pokemon', JSON.stringify(catchedPokemon));
        setNickname('');
        setIsUniqueNickname(false);
        setOpenModal(false);
    }

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
                                <div className="detailTypes" key={Q.type.name}>{Q.type.name}</div>
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
                        `}>{totalOwned}</div>
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
                        <button className="row row-center catchBtn" onClick={() => catchPokomon()}>
                            <Image src={pokobol} width={20} height={20} />
                            <div className="catchText">Catch!</div>
                        </button>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div>
                        <div className="detailTitle">Statistics</div>
                        {pokemonDetail?.stats.map((Q, index) =>
                            <div className="row row-between" key={index}>
                                <div className="statsName">{Q.stat.name}</div>
                                <div className="statsNumber">{Q.base_stat}</div>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="detailTitle">Abilities</div>
                        <div className="row">
                            {pokemonDetail?.abilities.map((Q, index) =>
                                <div className="detailAbilities" key={index}>{Q.ability.name}</div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="detailTitle">Moves</div>
                        {pokemonDetail?.moves.map((Q, index) =>
                            <div className="row row-between" key={index}>
                                <div className="detailMoveName">{Q.move.name}</div>
                                <Link href={Q.move.url}>
                                    <a className="detailMoveUrl">Move Detail</a>
                                </Link>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
            <Dialog open={openModal} onClose={handleClose}>
                <DialogTitle>You got {pokemonDetail?.name}</DialogTitle>
                <DialogContent>
                    {!isUniqueNickname ?
                        <DialogContentText>
                            You must give your pokomon a nickname to add to your pokemon list.
                        </DialogContentText>
                        :
                        <DialogContentText>
                            Nickname must be unique!
                        </DialogContentText>
                    }
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nickname"
                        fullWidth
                        variant="standard"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Release</Button>
                    <Button onClick={saveToMyPokemon}>Add to my pokomon</Button>
                </DialogActions>
            </Dialog>
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