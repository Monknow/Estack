import * as React from "react";
import styled from "styled-components";
import {usePopper} from "react-popper";
import {useState, useEffect, useRef} from "react";
import Dropdown from "../2-molecules/Dropdown";
import BotonAñadirOpcion from "../2-molecules/BotonAñadirOpcion";

const OpcionesDisponiblesEstilizadas = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-flow: column nowrap;

	@media (max-width: 600px) {
		align-items: center;
	}
`;

const ChildrenEstilizados = styled.div`
	cursor: pointer;
`;

const OpcionesDisponibles = ({opciones, añadirOpcion, eliminarSeccion, children}) => {
	const [opcionesParaAñadir, setOpcionesParaAñadir] = useState(new Set());
	const [inputAbierto, setInputAbierto] = useState(false);

	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);

	const {styles, attributes} = usePopper(referenceElement, popperElement, {
		placement: "bottom",
		modifiers: [
			{
				name: "offset",
				enabled: true,
				options: {
					offset: [0, 10],
				},
			},
		],
	});

	const opcionesRef = useRef(null);

	useEffect(() => {
		setOpcionesParaAñadir(new Set([]));
	}, [inputAbierto]);

	useEffect(() => {
		const manejarClickAfuera = (event) => {
			if (opcionesRef.current && !opcionesRef.current.contains(event.target)) {
				setInputAbierto(false);
			}
		};

		// Bind the event listener
		document.addEventListener("mousedown", manejarClickAfuera);

		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", manejarClickAfuera);
		};
	}, [opcionesRef]);

	const añadirOpciones = () => {
		setInputAbierto(false);
		añadirOpcion(opcionesParaAñadir);
	};

	const manejarClickDeOpcion = (opcionClick) => {
		//Si la opcion clickeada ya está en opcionesParaAñadir, quitar la opcion.
		if (opcionesParaAñadir.has(opcionClick)) {
			const opcionParaAñadirSinLaOpcionClickeada = [...opcionesParaAñadir].filter((opcion) => {
				return opcion !== opcionClick;
			});

			setOpcionesParaAñadir(new Set(opcionParaAñadirSinLaOpcionClickeada));
		} else {
			setOpcionesParaAñadir(new Set([...opcionesParaAñadir, opcionClick]));
		}
	};
	return (
		<OpcionesDisponiblesEstilizadas ref={opcionesRef}>
			<BotonAñadirOpcion
				refReference={setReferenceElement}
				setInputAbierto={setInputAbierto}
				inputAbierto={inputAbierto}
				customOnClick={() => {
					//** Al abrir el menu, se reinicia el estado de eliminar opcion. Si no ocurriera esto, al eliminar una opcion
					//** y después volverla a agregar, no se detectaria cuando se quiere volver a eliminar,
					//** ya que el estado de opcion a eliminar sigue siendo el mismo.
					if (eliminarSeccion) {
						eliminarSeccion(null);
					}
				}}>
				{children && <ChildrenEstilizados>{children}</ChildrenEstilizados>}
			</BotonAñadirOpcion>
			{inputAbierto && (
				<Dropdown
					refPopper={setPopperElement}
					stylesPopper={styles}
					attributesPopper={attributes}
					opciones={opciones}
					añadirOpciones={añadirOpciones}
					opcionesParaAñadir={opcionesParaAñadir}
					manejarClickDeOpcion={manejarClickDeOpcion}
					setInputAbierto={setInputAbierto}></Dropdown>
			)}
		</OpcionesDisponiblesEstilizadas>
	);
};

export default OpcionesDisponibles;
