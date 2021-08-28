import * as React from "react";
import styled from "styled-components";
import Opcion from "../atoms/Opcion";

const OpcionesDisponiblesEstilizadas = styled.div`
    position: absolute;
    z-index: 99;

    border: 4px;

    font-size: 20px;

    background-color: #fff;
    box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);
`;

const DropdownOpcionesInput = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin: 8px;

    width: clamp(100px, 40vw, 300px);
`;

const TextoCuandoNoHayOpciones = styled.p`
    margin: 8px;
    border-radius: 4px;
    padding: 8px;
    background-color: #efecff;
`;

const OpcionesDisponibles = ({
    opciones,
    toggleInputAbierto,
    añadirOpcion,
    inputAbierto,
}) => {
    const manejarClickDeOpcion = (opcion) => {
        toggleInputAbierto();
        añadirOpcion(opcion);
    };

    return (
        <OpcionesDisponiblesEstilizadas>
            {inputAbierto && (
                <div>
                    {opciones.size !== 0 ? (
                        <DropdownOpcionesInput>
                            {[...opciones].map((opcion) => {
                                return (
                                    <Opcion
                                        key={opcion}
                                        opcion={opcion}
                                        manejarClick={manejarClickDeOpcion}>
                                        {opcion}
                                    </Opcion>
                                );
                            })}
                        </DropdownOpcionesInput>
                    ) : (
                        <TextoCuandoNoHayOpciones>
                            Impressive!
                        </TextoCuandoNoHayOpciones>
                    )}
                    {/* Se utiliza el operador spread para convertir "opciones" de set a array*/}
                </div>
            )}
        </OpcionesDisponiblesEstilizadas>
    );
};

export default OpcionesDisponibles;
