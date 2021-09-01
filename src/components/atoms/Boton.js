import * as React from "react";
import styled from "styled-components";

const BotonEstilizado = styled.button`
	padding: clamp(2px, 2.5vw, 8px) clamp(2px, 6vw, 30px);
	border: 0px solid;
	border-radius: 4px;

	width: max-content;
	height: clamp(30px, 8vw, 40px);

	font-family: "ibm_plex_sans_thaibold";
	font-size: 1rem;

	background-color: ${(props) => (props.secundario ? "none" : "#3b28cc")};
	color: ${(props) => (props.secundario ? "#091E42" : "#fff")};

	cursor: pointer;

	&:hover,
	&:active,
	&:focus {
		background-color: ${(props) => (props.secundario ? "#ddd" : "#222387")};
	}
`;

const Boton = ({children, onClick, type, secundario, className}) => {
	return (
		<BotonEstilizado
			secundario={secundario}
			className={className}
			onClick={onClick ? onClick : undefined}
			type={type ? type : "button"}>
			{children}
		</BotonEstilizado>
	);
};

export default Boton;
