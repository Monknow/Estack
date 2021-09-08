import * as React from "react";
import {useContext} from "react";
import styled from "styled-components";
import ContextoAuth from "../../context/ContextoAuth";
import Titulo from "../1-atoms/Titulo";
import Boton from "../1-atoms/Boton";
import {Link} from "gatsby";

const HeaderUsuarioStackEstilizado = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;

	margin-top: 120px;

	& > * {
		margin: 20px 0px;
	}
`;

const HeaderUsuarioStack = ({datosUsuarioPagina}) => {
	const {isLoggedIn, profile} = useContext(ContextoAuth);

	return (
		<HeaderUsuarioStackEstilizado>
			<Titulo textAlign="center" esqueleto={!datosUsuarioPagina}>
				{datosUsuarioPagina?.username}'s stack
			</Titulo>
			{isLoggedIn && profile?.email === datosUsuarioPagina?.email && (
				<Link to="/stack">
					<Boton>Edit</Boton>
				</Link>
			)}
		</HeaderUsuarioStackEstilizado>
	);
};

export default HeaderUsuarioStack;
