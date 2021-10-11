import * as React from "react";
import styled from "styled-components";
import {navigate} from "gatsby";
import Subtitulo from "../1-atoms/Subtitulo";

const ResultadoBusquedaEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-flow: row wrap;

	padding: clamp(10px, 10vw, 30px);
	border-radius: 4px;

	width: clamp(100px, 90vw, 500px);

	font-size: 1.1rem;

	cursor: pointer;
	background-color: #fff;
	color: #091e42;
`;

const Habilidades = styled.ul`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-flow: column wrap;
	gap: 5px;

	padding: 0px;
`;

export const ResultadoBusqueda = ({datos: {slug, username, bio, stackSections}}) => {
	return (
		<ResultadoBusquedaEstilizado onClick={() => navigate(`/stack/${slug}`)}>
			<Subtitulo>{username}</Subtitulo>
			{bio && <p>{bio}</p>}
			{stackSections && (
				<Habilidades>
					{stackSections.map((stackSection) => (
						<li key={stackSection}>{stackSection}</li>
					))}
				</Habilidades>
			)}
		</ResultadoBusquedaEstilizado>
	);
};
