import {useState, useEffect} from "react";

const useOpciones = (opcionParaAñadir, opcionParaEliminar, opciones) => {
	const [opcionesAñadidas, setOpcionesAñadidas] = useState(new Set());
	const [opcionesDisponibles, setOpcionesDisponibles] = useState(new Set([...opciones]));

	useEffect(() => {
		const añadirOpcion = async () => {
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
		añadirOpcion();
	}, [opcionParaAñadir]);

	useEffect(() => {
		const eliminarOpcion = () => {
			if (eliminarOpcion) {
				const opcionesDisponiblesSet = opcionesDisponibles.add(opcionParaEliminar);

				const opcionesDisponiblesAlfabeticamente = [...opcionesDisponiblesSet].sort();

				setOpcionesDisponibles(new Set(opcionesDisponiblesAlfabeticamente));

				const arraySinOpcionParaEliminar = [...opcionesAñadidas].filter(
					(opcionAñadida) => opcionAñadida !== opcionParaEliminar
				);

				setOpcionesAñadidas(new Set(arraySinOpcionParaEliminar));
			}
		};
		eliminarOpcion();
	}, [opcionParaEliminar]);

	return {opcionesAñadidas, opcionesDisponibles};
};

export default useOpciones;
