import * as React from "react";
import styled from "styled-components";
import SeccionStackEstilizado from "../1-atoms/SeccionStackEstilizado";
import OpcionesDisponibles from "../3-cells/OpcionesDisponibles";
import Subtitulo from "../1-atoms/Subtitulo";

const NuevaSeccionEstilizada = styled(SeccionStackEstilizado)`
	align-items: center;
	justify-content: center;
	cursor: pointer;

	margin: 0px 30px;
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
