import * as React from "react";
import styled from "styled-components";
import EsqueletoRectangular from "./EsqueletoRectangular";

const BotonEstilizado = styled.button`
	padding: clamp(2px, 2.5vw, 8px) clamp(2px, 6vw, 30px);
	border: 2px solid ${(props) => (props.secundario ? "#e8e8e8" : "#3b28cc")};
	border-radius: 4px;

	width: max-content;
	height: clamp(30px, 8vw, 40px);

	font-family: "ibm_plex_sans_thaibold";
	font-size: 1rem;

	background-color: ${(props) => (props.secundario ? "#fff" : "#3b28cc")};
	color: ${(props) => (props.secundario ? "#091E42" : "#fff")};

	cursor: pointer;

	&:hover,
	&:active {
		background-color: ${(props) => (props.secundario ? "#e8e8e8" : "#222387")};
	}
`;

const Boton = (props) => {
	const {esqueleto} = props;

	return (
		<span>
			{esqueleto ? (
				<EsqueletoRectangular width="clamp(80px, 15vw, 120px)" height="clamp(30px, 8vw, 40px)" />
			) : (
				<BotonEstilizado {...props}></BotonEstilizado>
			)}
		</span>
	);
};

export default Boton;
