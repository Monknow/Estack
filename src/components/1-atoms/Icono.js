import * as React from "react";
import styled from "styled-components";

const medidaDelLadoIconoEnvultura = "clamp(26px, 7vw, 42px)";

const IconoEnvoltura = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	margin: 10px;
	padding: 5px;
	border: 3px solid ${(props) => (props.secundario ? "#e8e8e8" : "#3b28cc")};
	border-radius: 50%;

	height: ${medidaDelLadoIconoEnvultura};
	width: ${medidaDelLadoIconoEnvultura};

	fill: ${(props) => (props.secundario ? "#091e42" : "#3b28cc")};
	background-color: ${(props) => (props.secundario ? "#fff" : "none")};

	transition: all 200ms ease;

	&:hover {
		fill: ${(props) => (props.secundario ? "#091e42" : "#fff")};
		background-color: ${(props) => (props.secundario ? "#e8e8e8" : "#3b28cc")};
	}
`;

const Icono = ({IconoSVG, secundario}) => {
	return (
		<IconoEnvoltura secundario={secundario}>
			<IconoSVG />
		</IconoEnvoltura>
	);
};

export default Icono;
