import * as React from "react";
import {useState, useRef, useEffect} from "react";
import styled from "styled-components";

const InputTextoEnvoltura = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: 4px;
	border: 1px solid #aaa;
	padding-left: 5px;

	height: clamp(30px, 8vw, 40px);

	font-family: "ibm_plex_sans_thaisemibold";
	font-size: 1rem;

	outline: 0;
	box-shadow: ${(props) => (props.inputEnFocus ? "0 0 0 0.2rem rgba(59, 40, 204, 0.5)" : "none")};
`;

const InputTextoSimple = styled.input`
	flex-shrink: 2;
	flex-basis: auto;

	border: none;
	padding-left: 0px;

	font-family: "ibm_plex_sans_thaisemibold";
	color: #091e42;
	font-size: 1rem;

	&:focus,
	&:active {
		outline: 0;
		box-shadow: none;
	}
`;

const InputConTextoFijado = ({textoFijado, elevarValorInput, value}) => {
	const [inputEnFocus, setInputEnFocus] = useState(false);

	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<InputTextoEnvoltura inputEnFocus={inputEnFocus}>
			<p
				onClick={() => {
					inputRef.current.focus();
				}}>
				{textoFijado}
			</p>
			<InputTextoSimple
				ref={inputRef}
				onFocus={() => {
					setInputEnFocus(true);
				}}
				onBlur={() => {
					setInputEnFocus(false);
				}}
				type="text"
				onChange={(evento) => elevarValorInput(evento.target.value)}
				value={value}
			/>
		</InputTextoEnvoltura>
	);
};
export default InputConTextoFijado;
