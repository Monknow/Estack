import * as React from "react";
import styled from "styled-components";
import Subtitulo from "./Subtitulo";

const NuevaSeccionEstilizada = styled.section`
	flex-grow: 2;
	flex-basis: 500px;

	display: flex;
	align-items: center;
	justify-content: center;

	min-height: 200px;

	margin: 10px;
	padding: 20px;
	border-radius: 4px;

	background-color: #fff;
	color: #091e42;
	box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);
	cursor: pointer;
`;

const NuevaSeccion = ({toggleInputAbierto, children}) => {
	return (
		<NuevaSeccionEstilizada>
			<div onClick={toggleInputAbierto}>
				<Subtitulo>New Section +</Subtitulo>
			</div>
			{children}
		</NuevaSeccionEstilizada>
	);
};

export default NuevaSeccion;
