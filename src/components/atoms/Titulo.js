import * as React from "react";
import styled from "styled-components";

const TituloEstilizado = styled.h1`
    font-family: "ibm_plex_sans_thaisemibold";
    font-size: 3rem;

    text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};

    color: ${(props) => (props.claro ? "#fff" : "#091e42")};

    @media (max-width: 600px) {
        text-align: center;
    }
`;

const Titulo = ({ children, claro, textAlign }) => {
    return (
        <TituloEstilizado textAlign={textAlign} claro={claro}>
            {children}
        </TituloEstilizado>
    );
};

export default Titulo;
