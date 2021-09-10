import * as React from "react";
import styled from "styled-components";
import {getFirestore, doc} from "firebase/firestore";
import {useContext, useState} from "react";
import ContextoDatosUsuario from "../../context/ContextoDatosUsuario";
import datosSeccionesStack from "../../data/datosSeccionesStack";
import SeccionStack from "../2-molecules/SeccionStack";
import NuevaSeccion from "../4-organs/NuevaSeccion";
import Titulo from "../1-atoms/Titulo";

import useOpciones from "../../hooks/useOpciones";

const StackEstilizadoEnvoltura = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	margin: 60px 0px 120px 0px;
`;
const StackEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;
`;

const SeccionesStack = styled.div`
	display: flex;
	align-items: stretch;
	justify-content: center;
	flex-flow: row wrap;
	gap: 30px;

	box-sizing: border-box;
	padding: 30px;
`;

const Stack = () => {
	const {datos, cargando, sePuedeEditar} = useContext(ContextoDatosUsuario);

	const [opcionParaAñadir, setOpcionParaAñadir] = useState(null);
	const [opcionParaEliminar, setOpcionParaEliminar] = useState(null);

	const opcionesKeys = Array.from(datosSeccionesStack.keys());

	const db = getFirestore();
	const usuarioRef = doc(db, "users", datos.email);

	const {opcionesAñadidas, opcionesDisponibles, empezarAGuardar} = useOpciones(
		opcionParaAñadir,
		opcionParaEliminar,
		opcionesKeys,
		usuarioRef,
		"stackSections"
	);

	return (
		<StackEstilizadoEnvoltura>
			{empezarAGuardar && (
				<StackEstilizado>
					<Titulo esqueleto={cargando}>Stack</Titulo>
					<SeccionesStack>
						{[...opcionesAñadidas].map((seccion) => {
							const valorSeccion = datosSeccionesStack.get(seccion);

							return (
								<SeccionStack
									key={seccion}
									seccion={seccion}
									opciones={valorSeccion}
									eliminarSeccion={setOpcionParaEliminar}></SeccionStack>
							);
						})}

						{sePuedeEditar && (
							<NuevaSeccion
								opciones={opcionesDisponibles}
								añadirOpcion={setOpcionParaAñadir}
								eliminarSeccion={setOpcionParaEliminar}
							/>
						)}
					</SeccionesStack>
				</StackEstilizado>
			)}
		</StackEstilizadoEnvoltura>
	);
};

export default Stack;
