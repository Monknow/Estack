import * as React from "react";
import styled from "styled-components";

const InputTextoEstilizado = styled.input`
	border-radius: 4px;
	border: 1px solid #aaa;
	padding-left: 5px;

	height: clamp(25px, 8vw, 35px);
	width: 100%;

	font-family: "ibm_plex_sans_thaisemibold";
	font-size: 1em;

	color: #091e42;

	&:focus,
	&:active {
		outline: 0;
		box-shadow: 0 0 0 0.2rem rgba(59, 40, 204, 0.5);
	}
`;

const InputTexto = (props) => {
	return <InputTextoEstilizado {...props} />;
};

export default InputTexto;
