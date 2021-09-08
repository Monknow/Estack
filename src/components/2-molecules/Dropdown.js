import * as React from "react";
import styled from "styled-components";
import Opcion from "../1-atoms/Opcion";
import Boton from "../1-atoms/Boton";

const DropdownEstilizado = styled.div`
	box-sizing: border-box;
	padding: clamp(5px, 2vw, 10px);

	width: clamp(300px, 70vw, 800px);
	height: auto;

	background-color: #fff;
	box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);

	font-family: "ibm_plex_sans_thairegular";

	& > * {
		margin: 0px 8px;
	}

	@media (max-width: 600px) {
		width: 96vw;
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

const Dropdown = ({
	opciones,
	refPopper,
	stylesPopper,
	attributesPopper,
	añadirOpciones,
	opcionesParaAñadir,
	manejarClickDeOpcion,
	setInputAbierto,
}) => {
	return (
		<div>
			<DropdownEstilizado ref={refPopper} style={stylesPopper.popper} {...attributesPopper.popper}>
				<Boton secundario onClick={() => setInputAbierto(false)}>
					x
				</Boton>
				{opciones.size !== 0 ? (
					<ContenidoDropdown>
						{/*Se utiliza el operador spread para convertir "opciones" de set a array*/}
						<div>
							{[...opciones].map((opcion) => {
								const clickeado = opcionesParaAñadir.has(opcion);

								return (
									<Opcion
										key={opcion}
										onClick={() => manejarClickDeOpcion(opcion)}
										clickeado={clickeado}
										pointer>
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
			</DropdownEstilizado>
		</div>
	);
};

export default Dropdown;
