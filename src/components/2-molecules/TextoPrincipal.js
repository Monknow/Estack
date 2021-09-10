import * as React from "react";
import styled from "styled-components";
import Titulo from "../1-atoms/Titulo";
import Subtitulo from "../1-atoms/Subtitulo";
import Parrafo from "../1-atoms/Parrafo";

const TextoPrincipalEstilizado = styled.header`
	display: flex;
	align-items: ${(props) => (props.align === "right" ? "flex-end" : "flex-start")};
	justify-content: center;
	flex-flow: column nowrap;

	width: clamp(100px, 70vw, 500px);

	& > * {
		margin: clamp(5px, 2vw, 10px) 0px;
	}

	& > p {
		font-size: 1.5rem;
	}

	@media (max-width: 600px) {
		align-items: center;
		text-align: center;
	}
`;

const TextoPrincipal = ({titulo, subtitulo, parrafo, claro, textAlign}) => {
	return (
		<TextoPrincipalEstilizado align={textAlign}>
			<Titulo claro={claro} textAlign={textAlign}>
				{titulo}
			</Titulo>
			<Subtitulo claro={claro} textAlign={textAlign}>
				{subtitulo}
			</Subtitulo>
			<Parrafo claro={claro} textAlign={textAlign}>
				{parrafo}
			</Parrafo>
		</TextoPrincipalEstilizado>
	);
};

export default TextoPrincipal;
