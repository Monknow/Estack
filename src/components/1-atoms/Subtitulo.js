import * as React from "react";
import styled from "styled-components";
import EsqueletoRectangular from "./EsqueletoRectangular";

const SubtituloEstilizado = styled.h2`
	font-family: "ibm_plex_sans_thaisemibold";
	font-size: 1.8rem;

	text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};

	color: ${(props) => (props.claro ? "#fff" : "#091e42")};

	@media (max-width: 600px) {
		text-align: center;
	}
`;

const Subtitulo = (props) => {
	const {esqueleto} = props;

	return (
		<span>
			{esqueleto ? (
				<EsqueletoRectangular width="clamp(100px, 14vw, 200px)" height="clamp(20px, 8vw, 40px)" />
			) : (
				<SubtituloEstilizado {...props}></SubtituloEstilizado>
			)}
		</span>
	);
};

export default Subtitulo;
