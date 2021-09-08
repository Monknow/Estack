import * as React from "react";
import styled from "styled-components";
import {useState, useContext} from "react";
import ContextoAuth from "../../context/ContextoAuth";
import ContextoEdicion from "../../context/ContextoEdicion";
import {getFirestore, doc, updateDoc} from "firebase/firestore";
import useOpciones from "../../hooks/useOpciones";
import OpcionesDisponibles from "../3-cells/OpcionesDisponibles";
import OpcionesAñadidas from "./OpcionesAñadidas";
import Subtitulo from "../1-atoms/Subtitulo";
import SeccionStackEstilizado from "../1-atoms/SeccionStackEstilizado";
import SeccionStackSkeleton from "../1-atoms/SeccionStackSkeleton";
import Boton from "../1-atoms/Boton";
import slugify from "slugify";
import slugifyConfig from "../../data/slugifyConfig";

const SeccionStackEnvoltura = styled.div`
	flex-grow: 2;
	flex-basis: 500px;

	margin: 0px 30px 30px 30px;

	& > div > div {
		width: 100%;
	}
`;

const SeccionStack = ({seccion, opciones, eliminarSeccion}) => {
	const {profile} = useContext(ContextoAuth);
	const sePuedeEditar = useContext(ContextoEdicion);

	const [opcionParaAñadir, setOpcionParaAñadir] = useState(null);
	const [opcionParaEliminar, setOpcionParaEliminar] = useState(null);

	const db = getFirestore();
	const slugifiedSeccion = slugify(seccion, slugifyConfig);
	const userRef = doc(db, "users", profile.email);
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
				<SeccionStackEstilizado>
					{sePuedeEditar ? (
						<div>
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
						</div>
					) : (
						<div>
							<Subtitulo>{seccion}</Subtitulo>
							<OpcionesAñadidas opciones={opcionesAñadidas}></OpcionesAñadidas>
						</div>
					)}
				</SeccionStackEstilizado>
			) : (
				<SeccionStackSkeleton />
			)}
		</SeccionStackEnvoltura>
	);
};

export default SeccionStack;
