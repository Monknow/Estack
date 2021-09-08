import * as React from "react";
import styled from "styled-components";
import EsqueletoRectangular from "./EsqueletoRectangular";

const TextoBiografiaEstilizado = styled.span`
	display: block;

	width: clamp(100px, 90vw, 600px);
	margin: 0px clamp(20px, 10vw, 40px);

	font-size: 1.4em;
	text-align: center;

	color: #091e42;
`;

const TextoBiografia = ({children, esqueleto}) => {
	return (
		<span>
			{esqueleto ? (
				<EsqueletoRectangular width="clamp(300px, 90vw, 600px)" height="clamp(100px, 30vw, 200px)" />
			) : (
				<TextoBiografiaEstilizado>{children}</TextoBiografiaEstilizado>
			)}
		</span>
	);
};

export default TextoBiografia;
