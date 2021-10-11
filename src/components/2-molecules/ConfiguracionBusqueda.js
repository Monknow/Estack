import * as React from "react";
import {useState, useEffect} from "react";
import styled from "styled-components";
import datosSeccionesStack from "../../data/datosSeccionesStack";

const ConfiguracionBusquedaEstilizado = styled.fieldset`
	position: absolute;

	border: none;
	border-radius: 4px;
	padding: 20px 10px;
	width: clamp(100px, calc(96vw - 20px), 700px);

	font-size: 1.1rem;

	background-color: #ffffffb8;
	color: #091e42;

	@media only screen and (max-width: 600px) {
		& {
			transform: translateX(calc(-50% + 20px));
		}
	}
`;

const DetallesDeCheckboxes = styled.details`
	margin: 10px 10px 10px 30px;
	width: 100%;
`;

const Leyenda = styled.h3`
	font-family: "ibm_plex_sans_thaimedium";
`;

const CheckBoxes = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-flow: row wrap;
	gap: 10px;

	padding: 10px;
`;

const OpcionesSeccionStack = styled.div`
	flex-basis: 100px;

	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
`;

const CheckBox = styled.input``;

export const ConfiguracionBusqueda = ({setConfiguracion}) => {
	const [seccionesStack, setSeccionesStack] = useState(new Set());

	const eliminarSeccionStackDeSet = (elementoParaEliminar) => {
		const nuevoArray = [...seccionesStack].filter((seccionStack) => {
			return seccionStack !== elementoParaEliminar;
		});
		return new Set(nuevoArray);
	};

	const manejarInputCheckbox = (evento) => {
		const valorCheckbox = evento.target.value;

		if (seccionesStack.has(valorCheckbox)) {
			setSeccionesStack(eliminarSeccionStackDeSet(valorCheckbox));
		} else {
			setSeccionesStack(new Set(seccionesStack.add(valorCheckbox)));
		}
	};

	useEffect(() => {
		setConfiguracion({seccionesStack: [...seccionesStack]});
	}, [seccionesStack, setConfiguracion]);

	return (
		<ConfiguracionBusquedaEstilizado>
			<Leyenda>With skills on...</Leyenda>
			{Array.from(datosSeccionesStack.keys()).map((seccionStack) => {
				return (
					<DetallesDeCheckboxes key={seccionStack}>
						<summary>
							<label htmlFor={seccionStack}>{seccionStack}</label>
						</summary>
						<CheckBoxes>
							{datosSeccionesStack.get(seccionStack).map((opcionStack) => {
								return (
									<OpcionesSeccionStack key={opcionStack}>
										<CheckBox
											type="checkbox"
											name={opcionStack}
											value={opcionStack}
											onChange={manejarInputCheckbox}
										/>
										<label htmlFor={opcionStack}>{opcionStack}</label>
									</OpcionesSeccionStack>
								);
							})}
						</CheckBoxes>
					</DetallesDeCheckboxes>
				);
			})}
		</ConfiguracionBusquedaEstilizado>
	);
};
