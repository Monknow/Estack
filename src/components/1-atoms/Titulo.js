import * as React from "react";
import styled from "styled-components";
import EsqueletoRectangular from "./EsqueletoRectangular";

const TituloEstilizado = styled.h1`
	font-family: "ibm_plex_sans_thaisemibold";
	font-size: 3rem;

	text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};

	color: ${(props) => (props.claro ? "#fff" : "#091e42")};

	@media (max-width: 600px) {
		text-align: center;
	}
`;

const Titulo = ({children, claro, textAlign, esqueleto}) => {
	return (
		<span>
			{esqueleto ? (
				<EsqueletoRectangular width="clamp(100px, 20vw, 300px)" height="clamp(40px, 10vw, 60px)" />
			) : (
				<TituloEstilizado textAlign={textAlign} claro={claro}>
					{children}
				</TituloEstilizado>
			)}
		</span>
	);
};

export default Titulo;
