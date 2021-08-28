import * as React from "react";
import styled from "styled-components";

const BotonEliminarEstilizado = styled.button`
    margin: 0px 6px;
    border: 0px solid;
    border-radius: 4px;

    width: 20px;
    height: 20px;

    font-family: "ibm_plex_sans_thaibold";
    font-size: 1rem;

    background-color: #3b28cc;
    color: #fff;

    cursor: pointer;

    &:hover {
        background-color: #222387;
    }
`;

const BotonEliminar = ({ eliminarOpcion, opcion }) => {
    return (
        <BotonEliminarEstilizado
            onClick={() => {
                eliminarOpcion(opcion);
            }}
            type="button">
            x
        </BotonEliminarEstilizado>
    );
};

export default BotonEliminar;
