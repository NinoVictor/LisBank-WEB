import React, {FC, ReactNode, useReducer } from "react";
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface Props {
    toggleTheme: () => void;
    useDefaultTheme: boolean;
    children: ReactNode;
}

const Layout: FC<Props> = ({ toggleTheme, useDefaultTheme, children }) =>{
    return (
        <div>
            <CssBaseline />
            <Header title=""></Header>
            <Navigation></Navigation>
            <main>
                {children}
            </main>
            <footer>
                <Footer></Footer>
            </footer>

        </div>
    )
}

export default Layout;