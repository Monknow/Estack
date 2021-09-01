import * as React from "react";
import styled from "styled-components";
import {getFirestore, doc, getDoc, collection, getDocs, updateDoc} from "firebase/firestore";
import {useContext, useEffect, useState} from "react";
import ContextoAuth from "../../context/ContextoAuth";
import opciones from "../../data/opciones";
import OpcionesDisponibles from "../molecules/OpcionesDisponibles";
import OpcionesAñadidas from "../molecules/OpcionesAñadidas";
import InputStack from "../molecules/InputStack";
import Boton from "../atoms/Boton";
import NuevaSeccion from "../atoms/NuevaSeccions";
import Cargando from "../atoms/Cargando";
import HeaderStack from "../molecules/HeaderStack";
import slugify from "slugify";
import slugifyConfig from "../../data/slugifyConfig";

const StackEstilizadoEnvoltura = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	margin-bottom: 40vh;

	width: 100%;
`;
const StackEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;
	width: 100%;

	& > h1 {
		margin: 30px;
	}
`;

const InputsStack = styled.div`
	display: flex;
	align-items: stretch;
	justify-content: stretch;
	flex-flow: row wrap;

	width: 100%;
`;

const Stack = () => {
	const opcionesKeys = Array.from(opciones.keys());

	const {isLoading, profile} = useContext(ContextoAuth);

	const [inputAbierto, setInputAbierto] = useState(false);
	const [datosUsuario, setDatosUsuario] = useState(null);
	const [empezarAGuardar, setEmpezarAGuardar] = useState(false);
	const [seccionesAñadidas, setSeccionesAñadidas] = useState(new Set());
	const [seccionesDisponibles, setSeccionesDisponibles] = useState(new Set(opcionesKeys));

	const db = getFirestore();
	const usuarioRef = doc(db, "users", profile.email);

	const toggleInputAbierto = () => {
		setInputAbierto(!inputAbierto);
	};

	const añadirSeccion = async (seccionParaAñadir) => {
		if (typeof seccionParaAñadir === "string") {
			setSeccionesAñadidas(seccionesAñadidas.add(seccionParaAñadir));

			const seccionesDisponiblesSinLaSeccionParaAñadir = [...seccionesDisponibles].filter(
				(seccionDisponible) => seccionDisponible !== seccionParaAñadir
			);

			setSeccionesDisponibles(new Set(seccionesDisponiblesSinLaSeccionParaAñadir));
		} else if (typeof seccionParaAñadir === "object") {
			const seccionesAñadidasActualizadas = new Set([...seccionesAñadidas, ...seccionParaAñadir]);

			setSeccionesAñadidas(seccionesAñadidasActualizadas);

			//Eliminar seccion que se quiere añadir del array de secciones disponibles
			const seccionesDisponiblesSinLasSeccionesParaAñadir = await opcionesKeys.sort().filter((key) => {
				return !seccionesAñadidasActualizadas.has(key);
			});

			setSeccionesDisponibles(new Set(seccionesDisponiblesSinLasSeccionesParaAñadir));
		}
	};

	const eliminarSeccion = async (seccionParaEliminar) => {
		const seccionDisponibleSet = seccionesDisponibles.add(seccionParaEliminar);

		const seccionesDisponiblesAlfabeticamente = [...seccionDisponibleSet].sort();

		setSeccionesDisponibles(new Set(seccionesDisponiblesAlfabeticamente));

		const arrayDeSeccionesAñadidasSinLaSeccionParaEliminar = [...seccionesAñadidas].filter(
			(seccionAñadida) => seccionAñadida !== seccionParaEliminar
		);

		setSeccionesAñadidas(new Set(arrayDeSeccionesAñadidasSinLaSeccionParaEliminar));

		const seccionStackRef = doc(usuarioRef, "stack", slugify(seccionParaEliminar, slugifyConfig));
		await updateDoc(seccionStackRef, {
			options: [],
		});
	};

	useEffect(() => {
		const cargarStackDeFirestore = async () => {
			if (!isLoading && profile) {
				const usuarioSnap = await getDoc(usuarioRef);

				if (usuarioSnap.exists()) {
					const datosUsuario = usuarioSnap.data();

					setSeccionesAñadidas(new Set(datosUsuario.stackSections));
					setDatosUsuario(datosUsuario);
				} else {
					// usuario.data() will be undefined in this case
					console.log("No such document!");
				}

				setEmpezarAGuardar(true);
			}
		};

		cargarStackDeFirestore();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, profile]);

	useEffect(() => {
		const actualizarStack = async () => {
			if (!isLoading && profile && empezarAGuardar) {
				await updateDoc(usuarioRef, {
					stackSections: [...seccionesAñadidas],
				});
			}
		};
		actualizarStack();
	}, [seccionesAñadidas, seccionesDisponibles]);

	return (
		<StackEstilizadoEnvoltura>
			{datosUsuario && empezarAGuardar ? (
				<StackEstilizado>
					<HeaderStack datosUsuario={datosUsuario} />
					<InputsStack>
						{[...seccionesAñadidas].map((seccion) => {
							const valorSeccion = opciones.get(seccion);

							return (
								<InputStack
									key={seccion}
									seccion={seccion}
									opciones={valorSeccion}
									eliminarSeccion={eliminarSeccion}></InputStack>
							);
						})}
						<NuevaSeccion toggleInputAbierto={toggleInputAbierto}>
							<OpcionesDisponibles
								opciones={seccionesDisponibles}
								toggleInputAbierto={toggleInputAbierto}
								añadirOpcion={añadirSeccion}
								inputAbierto={inputAbierto}></OpcionesDisponibles>
						</NuevaSeccion>
					</InputsStack>
				</StackEstilizado>
			) : (
				<Cargando />
			)}
		</StackEstilizadoEnvoltura>
	);
};

export default Stack;
