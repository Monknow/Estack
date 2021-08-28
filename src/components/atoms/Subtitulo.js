import * as React from "react";
import styled from "styled-components";

const SubtituloEstilizado = styled.h2`
    font-family: "ibm_plex_sans_thaisemibold";
    font-size: 1.8rem;

    text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};

    color: ${(props) => (props.claro ? "#fff" : "#091e42")};

    @media (max-width: 600px) {
        text-align: center;
    }
`;

const Subtitulo = ({ children, claro, textAlign }) => {
    return (
        <SubtituloEstilizado textAlign={textAlign} claro={claro}>
            {children}
        </SubtituloEstilizado>
    );
};

export default Subtitulo;
