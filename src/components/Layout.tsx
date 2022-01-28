import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC<{}> = ({ children }) => {
    return (
        <div>
            <Head>
                <meta charSet="utf-8"></meta>
                <meta name="viewport" content="width=divice-width ,initial-scale=1"></meta>
                <title>Pokomon</title>
            </Head>
            <header>
                <Navbar></Navbar>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout;