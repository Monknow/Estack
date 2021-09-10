import * as React from "react";
import styled from "styled-components";
import Boton from "../1-atoms/Boton";
import Opcion from "../1-atoms/Opcion";

const OpcionesAñadidasEstilizadas = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-flow: row wrap;

	width: 100%;

	@media (max-width: 400px) {
		justify-content: center;
	}
`;

const OpcionAñadida = styled.div`
	flex-basis: clamp(100px, 40%, 300px);
	flex-grow: 2;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	width: max-content;

	margin: 5px;

	font-size: 18px;
`;

const BotonEliminar = styled(Boton)`
	margin: 0px 10px;
	padding: 0px;

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
						{eliminarOpcion && (
							<BotonEliminar secundario onClick={() => eliminarOpcion(opcion)}>
								x
							</BotonEliminar>
						)}
						<Opcion>{opcion}</Opcion>
					</OpcionAñadida>
				);
			})}
		</OpcionesAñadidasEstilizadas>
	);
};

export default OpcionesAñadidas;
