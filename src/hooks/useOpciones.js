import {useState, useEffect, useContext} from "react";
import ContextoDatosUsuario from "../context/ContextoDatosUsuario";
import {getDoc, updateDoc, setDoc} from "firebase/firestore";
import slugify from "slugify";
import slugifyConfig from "../data/slugifyConfig";

const useOpciones = (opcionParaAñadir, opcionParaEliminar, opciones, docRef, pathArray, titulo) => {
	const {datos, cargando} = useContext(ContextoDatosUsuario);

	const [opcionesAñadidas, setOpcionesAñadidas] = useState(new Set());
	const [opcionesDisponibles, setOpcionesDisponibles] = useState(new Set([...opciones]));
	const [empezarAGuardar, setEmpezarAGuardar] = useState(false);

	const añadirOpcion = async (opcionParaAñadir) => {
		if (typeof opcionParaAñadir === "string") {
			setOpcionesAñadidas(opcionesAñadidas.add(opcionParaAñadir));

			const arraySinOpcionParaAñadir = [...opcionesDisponibles].filter(
				(opcionDisponible) => opcionDisponible !== opcionParaAñadir
			);

			setOpcionesDisponibles(new Set(arraySinOpcionParaAñadir));
		} else if (opcionParaAñadir instanceof Set || Array.isArray(opcionParaAñadir)) {
			const opcionesAñadidasActualizadas = new Set([...opcionesAñadidas, ...opcionParaAñadir]);
			setOpcionesAñadidas(opcionesAñadidasActualizadas);

			const opcionesDisponiblesSinOpcionesAñadidas = await opciones.sort().filter((opcion) => {
				return !opcionesAñadidasActualizadas.has(opcion);
			});

			setOpcionesDisponibles(new Set(opcionesDisponiblesSinOpcionesAñadidas));
		}
	};

	useEffect(() => {
		añadirOpcion(opcionParaAñadir);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opcionParaAñadir]);

	const eliminarOpcion = (opcionParaEliminar) => {
		if (opcionParaEliminar) {
			const opcionesDisponiblesSet = opcionesDisponibles.add(opcionParaEliminar);

			const opcionesDisponiblesAlfabeticamente = [...opcionesDisponiblesSet].sort();

			setOpcionesDisponibles(new Set(opcionesDisponiblesAlfabeticamente));

			const arraySinOpcionParaEliminar = [...opcionesAñadidas].filter(
				(opcionAñadida) => opcionAñadida !== opcionParaEliminar
			);

			setOpcionesAñadidas(new Set(arraySinOpcionParaEliminar));
		}
	};

	useEffect(() => {
		if (opcionesAñadidas.has(opcionParaEliminar)) {
			eliminarOpcion(opcionParaEliminar);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opcionParaEliminar]);

	useEffect(() => {
		const cargarDatosDesdeFirestore = async () => {
			if (!cargando && datos) {
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					const opcionesDeFirestore = docSnap.data()[pathArray];

					añadirOpcion(new Set(opcionesDeFirestore));
				}
				setEmpezarAGuardar(true);
			}
		};

		cargarDatosDesdeFirestore();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cargando, datos]);

	useEffect(() => {
		const actualizarOpcionesEnFirestore = async () => {
			if (!cargando && datos && empezarAGuardar) {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					await updateDoc(docRef, {
						[pathArray]: [...opcionesAñadidas],
					});
				} else if (titulo) {
					await setDoc(docRef, {
						title: titulo,
						uid: slugify(titulo, slugifyConfig),
						userEmail: datos.email,
						options: [...opcionesAñadidas],
					});
				}
			}
		};
		actualizarOpcionesEnFirestore();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opcionesAñadidas, empezarAGuardar]);

	return {opcionesAñadidas, opcionesDisponibles, empezarAGuardar};
};

export default useOpciones;
