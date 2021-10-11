import * as React from "react";
import {useState, useEffect} from "react";
import styled, {keyframes} from "styled-components";
import InputTexto from "../../components/1-atoms/InputTexto";
import Boton from "../../components/1-atoms/Boton";
import {ConfiguracionBusqueda} from "../../components/2-molecules/ConfiguracionBusqueda";
import FilterSVG from "../../assets/svg/iconmonstr-filter-1.inline.svg";

const BarraDeBusquedaEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: row wrap;
	gap: clamp(10px, 6vw, 20px);

	width: 100%;
`;

const detailsDropdown = keyframes`
	from {
		height: 0px;
		opacity:0;
	}
	to{
		height: max-content;

		opacity: 1;
	}
`;

const DropdownConfiguracion = styled.details`
	&[open] .dropdown-contenido {
		animation: ${detailsDropdown} 150ms ease;
	}
`;

const FilterBoton = styled.summary`
	padding: clamp(2px, 2.5vw, 8px);
	border: 2px solid #e8e8e8;
	border-radius: 4px;

	font-family: "ibm_plex_sans_thaibold";
	font-size: 1rem;

	width: 24px;
	aspect-ratio: 1/1;

	background-color: #fff;
	color: #091e42;

	cursor: pointer;

	list-style: none;
	&:hover,
	&:active {
		background-color: #e8e8e8;
	}

	&::marker {
		display: none;
	}

	svg {
		margin-bottom: -5px;
		fill: #091e42;
	}
`;

const InputTextoRecortado = styled(InputTexto)`
	flex-basis: clamp(100px, 70vw, 700px);
`;

export const BarraDeBusqueda = ({setConfiguracion, elevarInputValue}) => {
	const [inputValue, setInputValue] = useState("");
	const [configuracionAbierta, setConfiguracionAbierta] = useState(false);

	useEffect(() => {
		elevarInputValue(inputValue);
	}, [inputValue]);

	const handleBlur = (e) => {
		const currentTarget = e.currentTarget;

		// Check the newly focused element in the next tick of the event loop
		setTimeout(() => {
			// Check if the new activeElement is a child of the original container
			if (!currentTarget.contains(document.activeElement)) {
				setConfiguracionAbierta(false);
			}
		}, 0);
	};

	return (
		<BarraDeBusquedaEstilizado>
			<DropdownConfiguracion tabIndex="1" open={configuracionAbierta} onBlur={handleBlur}>
				<FilterBoton
					onClick={(event) => {
						event.preventDefault();
						setConfiguracionAbierta(!configuracionAbierta);
					}}>
					<FilterSVG />
				</FilterBoton>
				<ConfiguracionBusqueda className="dropdown-contenido" setConfiguracion={setConfiguracion} />
			</DropdownConfiguracion>
			<InputTextoRecortado
				placeholder="username..."
				value={inputValue}
				onChange={(event) => {
					setInputValue(event.target.value.toLowerCase());
				}}
			/>
			<Boton type="submit">Search</Boton>
		</BarraDeBusquedaEstilizado>
	);
};
