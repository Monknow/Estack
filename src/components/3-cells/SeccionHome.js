import * as React from "react";
import styled from "styled-components";
import TextoPrincipal from "../2-molecules/TextoPrincipal";
import Ilustracion from "../1-atoms/Ilustracion";

const SeccionHomeEstilizada = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-flow: ${(props) => (props.align === "left" ? "row" : "row-reverse")} wrap;

	min-height: clamp(500px, 70vh, 800px);

	background-color: ${(props) => (props.oscuro ? "#3B28CC" : "#EFECFF")};

	& > * {
		margin: 20px;
	}
`;

const SeccionHome = ({titulo, subtitulo, parrafo, align, oscuro, svg, alt}) => {
	return (
		<SeccionHomeEstilizada oscuro={oscuro} align={align}>
			<TextoPrincipal
				titulo={titulo}
				subtitulo={subtitulo}
				parrafo={parrafo}
				textAlign={align}
				claro={oscuro ? true : false}></TextoPrincipal>
			<Ilustracion svg={svg} alt={alt} oscuro={oscuro}></Ilustracion>
		</SeccionHomeEstilizada>
	);
};

export default SeccionHome;
