import { css } from '@emotion/css';
import Image from 'next/image';
import Link from "next/link";
import React from "react";
import logo from '../assets/logo-pokomon.png';

const Navbar: React.FC<{}> = () => {
    return (
        <div className={css`
                padding-top: 13px;
                padding-bottom: 13px;
                background-color: #1730BF;
            `}>
            <div className={css`
                margin: 0 auto;
                max-width: 960px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            `}>
                <Link href='/'>
                    <Image src={logo} className={css`
                        cursor: pointer;
                    `} width={138} height={38} />
                </Link>
                <Link href='/my-pokomon'>
                    <button className={css`
                        border-radius: 30px;
                        color: black;
                        background-color: #F5F5F5;
                        border: none;
                        height: 2rem;
                        width: 8rem;
                        font-weight: bold;
                        cursor: pointer;
                        &:hover {
                            background-color: #EDC74C;
                        }
                    `} >My Pokomon</button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;