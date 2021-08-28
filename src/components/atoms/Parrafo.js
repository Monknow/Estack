import * as React from "react";
import styled from "styled-components";

const ParrafoEstilizado = styled.p`
    font-family: "ibm_plex_sans_thairegular";
    font-size: 1.2rem;

    width: clamp(80px, 100%, 700px);

    text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};

    color: ${(props) => (props.claro ? "#fff" : "#091e42")};

    @media (max-width: 600px) {
        text-align: center;
    }
`;

const Parrafo = ({ children, claro, textAlign }) => {
    return (
        <ParrafoEstilizado textAlign={textAlign} claro={claro}>
            {children}
        </ParrafoEstilizado>
    );
};

export default Parrafo;
