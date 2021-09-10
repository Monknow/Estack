import * as React from "react";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import {Link} from "gatsby";
import Titulo from "../1-atoms/Titulo";
import Boton from "../1-atoms/Boton";
import Ilustracion from "../1-atoms/Ilustracion";
import illustration404svg from "../../assets/svg/404-error-amico.svg";

const NoEncontradoEstilizado = styled.main`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;

	min-height: 100vh;

	& > * {
		margin-bottom: 30px;
	}
`;

const IlustracionGrande = styled(Ilustracion)`
	width: clamp(100px, 90vw, 800px);
`;

const NoEncontrado = ({elementoNoEncontrado}) => {
	return (
		<NoEncontradoEstilizado>
			<Helmet>
				<title>{elementoNoEncontrado} not found</title>
			</Helmet>
			<Titulo>{elementoNoEncontrado} not found. Well this is akward 😬</Titulo>
			<Link to="/">
				<Boton>Go back</Boton>
			</Link>
			<IlustracionGrande svg={illustration404svg} alt="404 code illustration"></IlustracionGrande>
		</NoEncontradoEstilizado>
	);
};

export default NoEncontrado;
