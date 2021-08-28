import * as React from "react";
import styled from "styled-components";

const BotonEstilizado = styled.button`
    padding: clamp(2px, 2.5vw, 8px) clamp(2px, 6vw, 30px);
    border: 0px solid;
    border-radius: 4px;

    width: max-content;
    height: clamp(30px, 8vw, 40px);

    font-family: "ibm_plex_sans_thaisemibold";
    font-size: 1rem;

    background-color: #3b28cc;
    color: #fff;

    cursor: pointer;

    &:hover {
        background-color: #222387;
    }
`;

const Boton = ({ children, onClick, type }) => {
    return (
        <BotonEstilizado onClick={onClick ? onClick : undefined} type={type}>
            {children}
        </BotonEstilizado>
    );
};

export default Boton;
