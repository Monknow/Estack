import * as React from "react";
import styled from "styled-components";

const InputTextoEstilizado = styled.input`
    border-radius: 4px;
    border: 1px solid #aaa;
    padding-left: 5px;

    height: clamp(30px, 8vw, 40px);
    width: clamp(100px, 100%, 400px);

    font-family: "ibm_plex_sans_thaisemibold";
    font-size: 1rem;

    &:focus,
    &:active {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(59, 40, 204, 0.5);
    }
`;

const InputTexto = ({ placeholder, elevarValorInput, type, value }) => {
    return (
        <InputTextoEstilizado
            onChange={(evento) => {
                elevarValorInput(evento.target.value);
            }}
            type={type}
            placeholder={placeholder}
            value={value}
        />
    );
};

export default InputTexto;
