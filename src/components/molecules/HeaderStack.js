import * as React from "react";
import styled from "styled-components";
import Titulo from "../atoms/Titulo";
import Boton from "../atoms/Boton";
import CopiarTexto from "../molecules/CopiarTexto";

import { Link } from "gatsby";

const HeaderStackEstilizado = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;

    & > * {
        margin: 20px 0px;
    }
`;

const Botones = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & > * {
        margin: 0px 20px;
    }
`;

const HeaderStack = ({ datosUsuario }) => {
    return (
        <HeaderStackEstilizado>
            <Titulo>{datosUsuario.username}'s stack</Titulo>
            <Botones>
                <Link to={`/users/${datosUsuario.slug}`}>
                    <Boton>See your link</Boton>
                </Link>
                <CopiarTexto
                    textoACopiar={`estacksharer.com/users/${datosUsuario.slug}`}
                />
            </Botones>
        </HeaderStackEstilizado>
    );
};

export default HeaderStack;
