import * as React from "react";
import styled from "styled-components";
import InputTexto from "../1-atoms/InputTexto";

const tamañoAcordeAlTipoDeInput = (tipo) => {
	const inputLargo = "90%";
	const inputCorto = "clamp(100px, 90%, 200px)";

	let largoDelResultado;

	switch (tipo) {
		case "email":
			largoDelResultado = inputLargo;
			break;
		case "password":
			largoDelResultado = inputLargo;
			break;
		case "text":
			largoDelResultado = inputCorto;

			break;
		default:
			largoDelResultado = inputCorto;
			break;
	}

	return largoDelResultado;
};

const InputLoginEstilizado = styled.div`
	flex-grow: 2;
	flex-basis: ${(props) => {
		return tamañoAcordeAlTipoDeInput(props.tipo);
	}};

	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-flow: column nowrap;

	margin: 10px;
`;
const LabelInput = styled.label`
	margin-bottom: 5px;

	font-size: 0.8rem;

	color: grey;
`;

const InputLogin = ({labelTexto, inputPlaceholder, onChange, type, value}) => {
	return (
		<InputLoginEstilizado tipo={type}>
			<LabelInput>{labelTexto}</LabelInput>
			<InputTexto onChange={onChange} placeholder={inputPlaceholder} type={type} value={value}></InputTexto>
		</InputLoginEstilizado>
	);
};

export default InputLogin;
