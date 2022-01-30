import { css } from "@emotion/css";
import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC<{
    title: string
}> = ({ children, title }) => {
    return (
        <div>
            <Head>
                <meta charSet="utf-8"></meta>
                <meta name="viewport" content="width=device-width ,initial-scale=1"></meta>
                <title>{title}</title>
            </Head>
            <header>
                <Navbar></Navbar>
            </header>
            <main className={css`
                margin: 0 auto;
                max-width: 960px;
            `}>
                {children}
            </main>
        </div>
    )
}

export default Layout;