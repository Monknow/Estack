import * as React from "react";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import {useContext} from "react";
import ContextoDatosUsuario from "../context/ContextoDatosUsuario";
import HeaderStack from "../components/3-cells/HeaderStack";
import Stack from "../components/5-organisms/Stack";
import RedesSociales from "../components/4-organs/RedesSociales";
import Cargando from "../components/1-atoms/Cargando";
import NoEncontrado from "../components/2-molecules/NoEncontrado";

const StackTemplateEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;

	min-height: 100vh;
`;

const StackTemplate = () => {
	const {cargando, datos} = useContext(ContextoDatosUsuario);

	return (
		<StackTemplateEstilizado>
			{!cargando ? (
				<div>
					{datos ? (
						<div>
							<Helmet>
								<title>{`${datos.username}'s stack`}</title>
							</Helmet>
							<HeaderStack />
							<RedesSociales />
							<Stack />
						</div>
					) : (
						<NoEncontrado elementoNoEncontrado="User" />
					)}
				</div>
			) : (
				<div>
					<Helmet>
						<title>Loading...</title>
					</Helmet>
					<Cargando />
				</div>
			)}
		</StackTemplateEstilizado>
	);
};

export default StackTemplate;
