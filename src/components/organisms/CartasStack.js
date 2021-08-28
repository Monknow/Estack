import * as React from "react";
import styled from "styled-components";
import CartaStack from "../molecules/CartaStack";

const CartasStackEstilizadas = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-flow: row wrap;

    margin-bottom: 40vh;

    & > h1 {
        margin: 30px;
    }
`;

const CartasStack = ({ stack }) => {
    return (
        <CartasStackEstilizadas>
            {stack.map((entrySeccionStack) => {
                if (entrySeccionStack.options.length !== 0) {
                    return (
                        <CartaStack
                            key={entrySeccionStack.title}
                            titulo={entrySeccionStack.title}
                            opciones={entrySeccionStack.options}></CartaStack>
                    );
                }
            })}
        </CartasStackEstilizadas>
    );
};

export default CartasStack;
