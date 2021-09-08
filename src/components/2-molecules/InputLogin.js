import * as React from "react";
import styled from "styled-components";
import InputTexto from "../1-atoms/InputTexto";

const InputLoginEstilizado = styled.div`
	flex-grow: 2;
	flex-shrink: 2;

	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-flow: column nowrap;

	margin: 10px;

	width: clamp(100px, 90%, 200px);
`;
const LabelInput = styled.label`
	margin-bottom: 5px;

	font-size: 0.8rem;

	color: grey;
`;

const InputLogin = ({labelTexto, inputPlaceholder, onChange, type, value}) => {
	return (
		<InputLoginEstilizado>
			<LabelInput>{labelTexto}</LabelInput>
			<InputTexto onChange={onChange} placeholder={inputPlaceholder} type={type} value={value}></InputTexto>
		</InputLoginEstilizado>
	);
};

export default InputLogin;
