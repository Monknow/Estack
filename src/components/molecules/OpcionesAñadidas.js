import * as React from "react";
import styled from "styled-components";
import BotonEliminar from "../atoms/BotonEliminar";
import Opcion from "../atoms/Opcion";

const OpcionesAñadidasEstilizadas = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-flow: row wrap;
`;

const OpcionAñadida = styled.div`
    flex-grow: 2;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    margin: 5px;

    width: 200px;

    font-size: 18px;

    @media (max-width: 400px) {
        width: 100%;
    }
`;

const OpcionesAñadidas = ({ opciones, eliminarOpcion }) => {
    return (
        <OpcionesAñadidasEstilizadas>
            {/* Se utiliza el operador spread para convertir "opciones" de set a array*/}
            {[...opciones].map((opcion) => {
                return (
                    <OpcionAñadida key={opcion}>
                        <BotonEliminar
                            eliminarOpcion={eliminarOpcion}
                            opcion={opcion}></BotonEliminar>
                        <Opcion>{opcion}</Opcion>
                    </OpcionAñadida>
                );
            })}
        </OpcionesAñadidasEstilizadas>
    );
};

export default OpcionesAñadidas;
