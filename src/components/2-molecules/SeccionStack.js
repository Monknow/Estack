import * as React from "react";
import styled from "styled-components";
import {useState, useContext, useEffect} from "react";
import ContextoDatosUsuario from "../../context/ContextoDatosUsuario";
import {getFirestore, doc, updateDoc} from "firebase/firestore";
import useOpciones from "../../hooks/useOpciones";
import OpcionesDisponibles from "../3-cells/OpcionesDisponibles";
import OpcionesAñadidas from "./OpcionesAñadidas";
import Subtitulo from "../1-atoms/Subtitulo";
import EstilosBasicosSeccionStack from "../1-atoms/EstilosBasicosSeccionStack";
import SeccionStackEsqueleto from "../1-atoms/SeccionStackEsqueleto";
import Boton from "../1-atoms/Boton";
import slugify from "slugify";
import slugifyConfig from "../../data/slugifyConfig";

const SeccionStackEnvoltura = styled.div`
	flex-shrink: 2;
	flex-grow: 2;
	flex-basis: 400px;
`;

const SeccionStackEstilizada = styled(EstilosBasicosSeccionStack)`
	display: flex;
	align-items: flex-start;
	justify-content: center;
`;

const ContenidoSeccion = styled.div`
	width: 100%;

	& > * {
		margin: 10px 0px;
	}
`;

const SeccionStack = ({seccion, opciones, eliminarSeccion}) => {
	const {datos, sePuedeEditar} = useContext(ContextoDatosUsuario);

	const [opcionParaAñadir, setOpcionParaAñadir] = useState(null);
	const [opcionParaEliminar, setOpcionParaEliminar] = useState(null);

	const db = getFirestore();
	const slugifiedSeccion = slugify(seccion, slugifyConfig);
	const userRef = doc(db, "users", datos.email);
	const seccionStackRef = doc(userRef, "stack", slugifiedSeccion);

	const {opcionesAñadidas, opcionesDisponibles, empezarAGuardar} = useOpciones(
		opcionParaAñadir,
		opcionParaEliminar,
		opciones,
		seccionStackRef,
		"options",
		seccion
	);

	const eliminarSeccionEnFirestore = async () => {
		if (sePuedeEditar) {
			eliminarSeccion(seccion);
			await updateDoc(seccionStackRef, {options: []});
		}
	};

	return (
		<SeccionStackEnvoltura>
			{empezarAGuardar ? (
				<SeccionStackEstilizada>
					{sePuedeEditar ? (
						<ContenidoSeccion>
							<Boton secundario onClick={eliminarSeccionEnFirestore}>
								x
							</Boton>
							<Subtitulo>{seccion}</Subtitulo>
							<OpcionesDisponibles
								opciones={opcionesDisponibles}
								añadirOpcion={setOpcionParaAñadir}
								eliminarSeccion={setOpcionParaEliminar}></OpcionesDisponibles>
							<OpcionesAñadidas
								opciones={opcionesAñadidas}
								eliminarOpcion={setOpcionParaEliminar}></OpcionesAñadidas>
						</ContenidoSeccion>
					) : (
						<ContenidoSeccion>
							<Subtitulo>{seccion}</Subtitulo>
							<OpcionesAñadidas opciones={opcionesAñadidas}></OpcionesAñadidas>
						</ContenidoSeccion>
					)}
				</SeccionStackEstilizada>
			) : (
				<SeccionStackEsqueleto />
			)}
		</SeccionStackEnvoltura>
	);
};

export default SeccionStack;
