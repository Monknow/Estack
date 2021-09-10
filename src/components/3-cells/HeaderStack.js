import * as React from "react";
import {useContext} from "react";
import ContextoDatosUsuario from "../../context/ContextoDatosUsuario";
import ContextoURL from "../../context/ContextoURL";
import styled from "styled-components";
import Titulo from "../1-atoms/Titulo";
import CopiarTexto from "../2-molecules/CopiarTexto";
import Biografia from "../2-molecules/Biografia";

const HeaderStackEnvoltura = styled.div``;

const HeaderStackEstilizado = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column nowrap;

	& > * {
		margin-top: 40px;
	}
`;

const InfoUsuario = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;
`;

const HeaderStack = () => {
	const {datos, cargando} = useContext(ContextoDatosUsuario);
	const {origin} = useContext(ContextoURL);
	console.log(`${origin}/stack/${datos.slug}`);

	return (
		<HeaderStackEnvoltura>
			<HeaderStackEstilizado>
				<CopiarTexto esqueleto={cargando} textoACopiar={`${origin}/stack/${datos.slug}`} />
				<InfoUsuario>
					<Titulo esqueleto={cargando}>{datos.username}'s stack</Titulo>
					<Biografia esqueleto={cargando}></Biografia>
				</InfoUsuario>
			</HeaderStackEstilizado>
		</HeaderStackEnvoltura>
	);
};

export default HeaderStack;
