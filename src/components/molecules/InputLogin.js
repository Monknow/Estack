import * as React from "react";
import styled from "styled-components";
import InputTexto from "../atoms/InputTexto";

const InputLoginEstilizado = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-flow: column nowrap;

    margin-bottom: 20px;

    width: 100%;
`;

const LabelInput = styled.label`
    margin-bottom: 5px;

    font-size: 0.8rem;

    color: grey;
`;

const InputTextoLargo = styled(InputTexto)`
    width: 100%;
`;

const InputLogin = ({
    labelTexto,
    inputPlaceholder,
    elevarValorInput,
    type,
    value,
}) => {
    return (
        <InputLoginEstilizado>
            <LabelInput>{labelTexto}</LabelInput>
            <InputTextoLargo
                elevarValorInput={elevarValorInput}
                placeholder={inputPlaceholder}
                type={type}
                value={value}></InputTextoLargo>
        </InputLoginEstilizado>
    );
};

export default InputLogin;
