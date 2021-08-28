import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const OpcionInputEstilizada = styled.p`
    display: inline-block;
    width: max-content;

    margin: 8px;
    border-radius: 4px;
    padding: 5px;
    background-color: #efecff;

    cursor: ${(props) => (props.pointer ? "pointer" : "default")};
`;

const OpcionInput = ({ children, manejarClick, opcion }) => {
    const [cursorPointer, setCursorPointer] = useState(false);

    useEffect(() => {
        if (manejarClick) {
            setCursorPointer(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const accionOnClick = () => {
        if (manejarClick) {
            manejarClick(opcion);
        }
    };

    return (
        <OpcionInputEstilizada pointer={cursorPointer} onClick={accionOnClick}>
            {children}
        </OpcionInputEstilizada>
    );
};

export default OpcionInput;
