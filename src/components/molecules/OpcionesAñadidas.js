import * as React from "react";
import styled from "styled-components";
import Boton from "../atoms/Boton";

const OpcionesAñadidasEstilizadas = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-flow: row wrap;
`;

const OpcionAñadida = styled.div`
	flex-grow: 2;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	margin: 5px;

	width: 200px;

	font-size: 18px;

	@media (max-width: 400px) {
		width: 100%;
	}
`;

const BotonEliminar = styled(Boton)`
	margin: 0px 10px;
	padding: 5px;

	width: 30px;
	height: 30px;
`;

const OpcionesAñadidas = ({opciones, eliminarOpcion}) => {
	return (
		<OpcionesAñadidasEstilizadas>
			{/* Se utiliza el operador spread para convertir "opciones" de set a array*/}
			{[...opciones].map((opcion) => {
				return (
					<OpcionAñadida key={opcion}>
						<BotonEliminar secundario onClick={() => eliminarOpcion(opcion)}>
							x
						</BotonEliminar>
						<p>{opcion}</p>
					</OpcionAñadida>
				);
			})}
		</OpcionesAñadidasEstilizadas>
	);
};

export default OpcionesAñadidas;
