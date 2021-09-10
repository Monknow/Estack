import * as React from "react";
import styled from "styled-components";
import EstilosBasicosSeccionStack from "../1-atoms/EstilosBasicosSeccionStack";
import OpcionesDisponibles from "../3-cells/OpcionesDisponibles";
import Subtitulo from "../1-atoms/Subtitulo";

const NuevaSeccionEstilizada = styled(EstilosBasicosSeccionStack)`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: clamp(150px, 30vw, 250px);

	cursor: pointer;
`;

const NuevaSeccion = ({opciones, añadirOpcion, eliminarSeccion}) => {
	return (
		<NuevaSeccionEstilizada>
			<OpcionesDisponibles opciones={opciones} añadirOpcion={añadirOpcion} eliminarSeccion={eliminarSeccion}>
				<Subtitulo>Add section +</Subtitulo>
			</OpcionesDisponibles>
		</NuevaSeccionEstilizada>
	);
};

export default NuevaSeccion;
