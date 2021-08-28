import * as React from "react";
import { Helmet } from "react-helmet";
import { useContext, useEffect } from "react";
import { navigate } from "gatsby";
import ContextoAuth from "../context/ContextoAuth";
import Stack from "../components/organisms/Stack";
import Cargando from "../components/atoms/Cargando";

const AppPage = () => {
    const { isLoading, isLoggedIn } = useContext(ContextoAuth);

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            navigate("/login?message=To see your stack you must be logged");
        }
    }, [isLoading, isLoggedIn]);

    return (
        <div>
            <Helmet>
                <title>Your stack</title>
            </Helmet>
            {!isLoading ? <Stack></Stack> : <Cargando />}
        </div>
    );
};

export default AppPage;
