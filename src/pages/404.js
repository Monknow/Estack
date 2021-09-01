import * as React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Titulo from "../components/atoms/Titulo";
import Ilustracion from "../components/atoms/Ilustracion";
import illustration404svg from "../assets/svg/404-error-amico.svg";
import Boton from "../components/atoms/Boton";
import { Link } from "gatsby";

const NotFoundPageEstilizado = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;

    min-height: 100vh;

    & > * {
        margin-bottom: 30px;
    }
`;

const IlustracionGrande = styled(Ilustracion)`
    width: clamp(100px, 90vw, 800px);
`;

// markup
const NotFoundPage = () => {
    return (
        <NotFoundPageEstilizado>
            <Helmet>
                <title>Page not found</title>
            </Helmet>
            <Titulo>Page not found. Well this is akward 😬</Titulo>
            <Link to="/">
                <Boton>Go back</Boton>
            </Link>
            <IlustracionGrande
                svg={illustration404svg}
                alt="404 code illustration"></IlustracionGrande>
        </NotFoundPageEstilizado>
    );
};

export default NotFoundPage;
