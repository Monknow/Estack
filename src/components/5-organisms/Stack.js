import * as React from "react";
import styled from "styled-components";
import {getFirestore, doc} from "firebase/firestore";
import {useContext, useState} from "react";
import ContextoAuth from "../../context/ContextoAuth";
import datosSeccionesStack from "../../data/datosSeccionesStack";
import SeccionesStack from "../3-cells/SeccionesStack";
import NuevaSeccion from "../4-organs/NuevaSeccion";

import useOpciones from "../../hooks/useOpciones";
import Subtitulo from "../1-atoms/Subtitulo";

const StackEstilizadoEnvoltura = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	margin: 60px 0px 120px 0px;

	width: 100%;
`;
const StackEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;
	width: 100%;

	& h2 {
		margin: 30px;
	}
`;

const Stack = () => {
	const opcionesKeys = Array.from(datosSeccionesStack.keys());

	const {profile} = useContext(ContextoAuth);

	const [opcionParaAñadir, setOpcionParaAñadir] = useState(null);
	const [opcionParaEliminar, setOpcionParaEliminar] = useState(null);

	const db = getFirestore();
	const usuarioRef = doc(db, "users", profile.email);

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
					<SeccionesStack
						opcionesAñadidas={opcionesAñadidas}
						opcionesDisponibles={opcionesDisponibles}
						eliminarSeccion={setOpcionParaEliminar}
						añadirOpcion={setOpcionParaAñadir}></SeccionesStack>
					<NuevaSeccion
						opciones={opcionesDisponibles}
						añadirOpcion={setOpcionParaAñadir}
						eliminarSeccion={opcionParaEliminar}></NuevaSeccion>
				</StackEstilizado>
			)}
		</StackEstilizadoEnvoltura>
	);
};

export default Stack;
