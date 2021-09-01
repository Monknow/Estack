import * as React from "react";
import styled from "styled-components";
import {useState, useContext, useEffect} from "react";
import ContextoAuth from "../../context/ContextoAuth";
import useOpciones from "../../hooks/useOpciones";
import {getFirestore, doc, getDoc, updateDoc, setDoc} from "firebase/firestore";
import slugify from "slugify";
import slugifyConfig from "../../data/slugifyConfig";
import OpcionesDisponibles from "./OpcionesDisponibles";
import OpcionesAñadidas from "./OpcionesAñadidas";
import Subtitulo from "../atoms/Subtitulo";
import Boton from "../atoms/Boton";

const InputStackEnvolturaEstilizado = styled.div`
	flex-grow: 2;
	flex-basis: 500px;

	min-height: 200px;

	margin: 10px;
	padding: 20px;
	border-radius: 4px;

	background-color: #fff;
	color: #091e42;
	box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);
`;

const InputStackEstilizado = styled.div`
	& > * {
		margin: 10px 0px;
	}
`;

const EnvolturaBotonAñadir = styled.div`
	display: flex;

	margin: 20px 0px;

	@media (max-width: 600px) {
		justify-content: center;
	}
`;

const InputStack = ({seccion, opciones, eliminarSeccion}) => {
	const {isLoading, profile} = useContext(ContextoAuth);

	const [inputAbierto, setInputAbierto] = useState(false);
	const [empezarAGuardar, setEmpezarAGuardar] = useState(false);
	const [opcionesAñadidas, setOpcionesAñadidas] = useState(new Set());
	const [opcionesDisponibles, setOpcionesDisponibles] = useState(new Set());
	const [opcionParaAñadirPrueba, setOpcionParaAñadirPrueba] = useState(null);
	const [opcionParaEliminarPrueba, setOpcionParaEliminarPrueba] = useState(null);

	const db = getFirestore();
	const slugifiedSeccion = slugify(seccion, slugifyConfig);

	const toggleInputAbierto = () => {
		setInputAbierto(!inputAbierto);
	};

	const añadirOpcion = async (opcionParaAñadir) => {
		setOpcionParaAñadirPrueba(opcionParaAñadir);
		if (typeof opcionParaAñadir === "string") {
			setOpcionesAñadidas(opcionesAñadidas.add(opcionParaAñadir));

			const arraySinOpcionParaAñadir = [...opcionesDisponibles].filter(
				(opcionDisponible) => opcionDisponible !== opcionParaAñadir
			);

			setOpcionesDisponibles(new Set(arraySinOpcionParaAñadir));
		} else if (typeof opcionParaAñadir === "object") {
			const opcionesAñadidasActualizadas = new Set([...opcionesAñadidas, ...opcionParaAñadir]);
			setOpcionesAñadidas(opcionesAñadidasActualizadas);

			const opcionesDisponiblesSinOpcionesAñadidas = await opciones.sort().filter((opcion) => {
				return !opcionesAñadidasActualizadas.has(opcion);
			});

			setOpcionesDisponibles(new Set(opcionesDisponiblesSinOpcionesAñadidas));
		}
	};

	const eliminarOpcion = (opcionParaEliminar) => {
		setOpcionParaEliminarPrueba(opcionParaEliminar);
		const opcionesDisponiblesSet = opcionesDisponibles.add(opcionParaEliminar);

		const opcionesDisponiblesAlfabeticamente = [...opcionesDisponiblesSet].sort();

		setOpcionesDisponibles(new Set(opcionesDisponiblesAlfabeticamente));

		const arraySinOpcionParaEliminar = [...opcionesAñadidas].filter(
			(opcionAñadida) => opcionAñadida !== opcionParaEliminar
		);

		setOpcionesAñadidas(new Set(arraySinOpcionParaEliminar));
	};

	useEffect(() => {
		const cargarStackDesdeFirestore = async () => {
			if (!isLoading && profile && slugifiedSeccion) {
				const usuarioRef = doc(db, "users", profile.email);
				const seccionStackRef = doc(usuarioRef, "stack", slugifiedSeccion);

				const seccionStackSnap = await getDoc(seccionStackRef);

				if (seccionStackSnap.exists()) {
					const seccionStackFirestore = seccionStackSnap.data().options;

					añadirOpcion(new Set(seccionStackFirestore));
				} else {
					setOpcionesDisponibles(opciones);
				}
				setEmpezarAGuardar(true);
			}
		};

		cargarStackDesdeFirestore();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, profile, slugifiedSeccion]);

	useEffect(() => {
		const actualizarStack = async () => {
			if (!isLoading && profile && empezarAGuardar) {
				const usuarioRef = doc(db, "users", profile.email);
				const seccionStackRef = doc(usuarioRef, "stack", slugifiedSeccion);

				const seccionStackSnap = await getDoc(seccionStackRef);

				if (seccionStackSnap.exists()) {
					await updateDoc(seccionStackRef, {
						options: [...opcionesAñadidas],
					});
				} else {
					await setDoc(seccionStackRef, {
						title: seccion,
						uid: slugifiedSeccion,
						options: [...opcionesAñadidas],
					});
				}
			}
		};
		actualizarStack();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opcionesAñadidas, opcionesDisponibles, empezarAGuardar]);

	return (
		<InputStackEnvolturaEstilizado>
			<Boton secundario onClick={() => eliminarSeccion(seccion)}>
				x
			</Boton>
			{empezarAGuardar ? (
				<InputStackEstilizado>
					<Subtitulo>{seccion}</Subtitulo>
					<EnvolturaBotonAñadir>
						<Boton onClick={toggleInputAbierto}>Add +</Boton>
					</EnvolturaBotonAñadir>
					<OpcionesDisponibles
						opciones={opcionesDisponibles}
						toggleInputAbierto={toggleInputAbierto}
						añadirOpcion={añadirOpcion}
						inputAbierto={inputAbierto}></OpcionesDisponibles>

					<OpcionesAñadidas opciones={opcionesAñadidas} eliminarOpcion={eliminarOpcion}></OpcionesAñadidas>
				</InputStackEstilizado>
			) : (
				<div></div>
			)}
		</InputStackEnvolturaEstilizado>
	);
};

export default InputStack;
