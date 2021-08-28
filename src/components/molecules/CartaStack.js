import * as React from "react";
import styled from "styled-components";
import Opcion from "../atoms/Opcion";
import Subtitulo from "../atoms/Subtitulo";

const CartaStackEstilizada = styled.div`
    flex-grow: 2;
    flex-basis: 300px;

    max-height: 500px;

    margin: 10px;
    padding: 20px;
    border-radius: 4px;

    background-color: #fff;
    color: #091e42;
    box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);

    & > * {
        margin: 10px 0px 20px 0px;
    }
`;

const OpcionesDelStack = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

const CartaStack = ({ titulo, opciones }) => {
    return (
        <CartaStackEstilizada>
            <Subtitulo>{titulo}</Subtitulo>
            <OpcionesDelStack>
                {opciones.map((opcion) => {
                    return (
                        <div key={opcion}>
                            <Opcion>{opcion}</Opcion>
                        </div>
                    );
                })}
            </OpcionesDelStack>
        </CartaStackEstilizada>
    );
};

export default CartaStack;
