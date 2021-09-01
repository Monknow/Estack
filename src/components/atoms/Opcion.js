import * as React from "react";
import {useState, useEffect} from "react";
import styled from "styled-components";

const OpcionInputEstilizada = styled.p`
	flex-grow: 2;
	flex-shrink: 2;

	display: inline-block;
	width: max-content;

	margin: 8px;
	border-radius: 4px;
	padding: 10px 5px;

	text-align: center;

	user-select: none;
	background-color: #efecff;
	background-color: ${(props) => (props.clickeado ? "rgba(59, 40, 204, 0.5)" : "#efecff")};

	cursor: ${(props) => (props.pointer ? "pointer" : "default")};
`;

const OpcionInput = ({children, manejarClick, opcion}) => {
	const [cursorPointer, setCursorPointer] = useState(false);
	const [clickeado, setClickeado] = useState(false);

	useEffect(() => {
		if (manejarClick) {
			setCursorPointer(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const accionOnClick = () => {
		setClickeado(!clickeado);

		manejarClick(opcion);
	};

	return (
		<OpcionInputEstilizada clickeado={clickeado} pointer={cursorPointer} onClick={accionOnClick}>
			{children}
		</OpcionInputEstilizada>
	);
};

export default OpcionInput;
