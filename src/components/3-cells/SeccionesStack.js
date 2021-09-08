import * as React from "react";
import styled from "styled-components";
import SeccionStack from "../2-molecules/SeccionStack";
import datosSeccionesStack from "../../data/datosSeccionesStack";
import Titulo from "../1-atoms/Titulo";

const SeccionesStackEnvoltura = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;

	& > span {
		margin: 20px;
	}
`;

const SeccionesStackEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: row wrap;

	width: 100vw;
`;

const SeccionesStack = ({opcionesAñadidas, eliminarSeccion}) => {
	return (
		<SeccionesStackEnvoltura>
			<Titulo esqueleto={!opcionesAñadidas}>Stack</Titulo>
			{/* Se utiliza el operador spread para convertir "opcionesAñadidas" de set a array*/}
			<SeccionesStackEstilizado>
				{opcionesAñadidas &&
					[...opcionesAñadidas].map((seccion) => {
						const valorSeccion = datosSeccionesStack.get(seccion);

						return (
							<SeccionStack
								key={seccion}
								seccion={seccion}
								opciones={valorSeccion}
								eliminarSeccion={eliminarSeccion}></SeccionStack>
						);
					})}
			</SeccionesStackEstilizado>
		</SeccionesStackEnvoltura>
	);
};

export default SeccionesStack;
