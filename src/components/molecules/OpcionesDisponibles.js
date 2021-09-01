import * as React from "react";
import styled from "styled-components";
import Opcion from "../atoms/Opcion";
import Boton from "../atoms/Boton";
import {useState, useEffect} from "react";

const OpcionesDisponiblesEstilizadas = styled.div``;

const Dropdown = styled.div`
	position: absolute;

	box-sizing: border-box;
	padding: clamp(5px, 2vw, 10px);

	max-width: 90vw;

	background-color: #fff;
	box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);

	& > * {
		margin: 0px 8px;
	}
`;

const ContenidoDropdown = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-flow: column nowrap;

	width: 100%;
	height: 100%;

	font-size: 20px;

	& > * {
		margin: 20px 0px;
	}
`;

const TextoCuandoNoHayOpciones = styled.p`
	margin: 8px;
	border-radius: 4px;
	padding: 8px;
	background-color: #efecff;
`;

const OpcionesDisponibles = ({opciones, toggleInputAbierto, añadirOpcion, inputAbierto}) => {
	const [opcionesParaAñadir, setOpcionesParaAñadir] = useState(new Set());

	useEffect(() => {
		setOpcionesParaAñadir(new Set([]));
	}, [inputAbierto]);

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

	const añadirOpciones = () => {
		toggleInputAbierto();
		añadirOpcion(opcionesParaAñadir);
	};

	return (
		<OpcionesDisponiblesEstilizadas>
			{inputAbierto && (
				<Dropdown>
					<Boton secundario onClick={toggleInputAbierto}>
						x
					</Boton>
					{opciones.size !== 0 ? (
						<ContenidoDropdown>
							{/* Se utiliza el operador spread para convertir "opciones" de set a array*/}
							<div>
								{[...opciones].map((opcion) => {
									return (
										<Opcion key={opcion} opcion={opcion} manejarClick={manejarClickDeOpcion}>
											{opcion}
										</Opcion>
									);
								})}
							</div>
							<Boton onClick={añadirOpciones}>Add</Boton>
						</ContenidoDropdown>
					) : (
						<TextoCuandoNoHayOpciones>Impressive!</TextoCuandoNoHayOpciones>
					)}
				</Dropdown>
			)}
		</OpcionesDisponiblesEstilizadas>
	);
};

export default OpcionesDisponibles;
