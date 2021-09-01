import * as React from "react";
import { Helmet } from "react-helmet";
import { useContext, useEffect } from "react";
import { navigate } from "gatsby";
import ContextoAuth from "../context/ContextoAuth";
import Stack from "../components/organisms/Stack";
import Cargando from "../components/atoms/Cargando";
import styled from "styled-components";

const AppPageEstilizado = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 100vh;
`;

const AppPage = () => {
    const { isLoading, isLoggedIn } = useContext(ContextoAuth);

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            console.log(isLoading, isLoggedIn);
            navigate("/login?message=To see your stack you must be logged");
        }
    }, [isLoading, isLoggedIn]);

    return (
        <AppPageEstilizado>
            <Helmet>
                <title>Your stack</title>
            </Helmet>
            {!isLoading ? <Stack></Stack> : <Cargando />}
        </AppPageEstilizado>
    );
};

export default AppPage;
