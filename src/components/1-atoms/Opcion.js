import * as React from "react";
import styled from "styled-components";

const OpcionInputEstilizada = styled.p`
	display: inline-block;
	margin: 8px;
	border-radius: 4px;
	padding: 10px 5px;

	text-align: center;

	font-size: 1.3rem;

	user-select: none;
	background-color: #efecff;
	background-color: ${(props) => (props.clickeado ? "rgba(59, 40, 204, 0.5)" : "#efecff")};

	cursor: ${(props) => (props.pointer ? "pointer" : "default")};
`;

const OpcionInput = (props) => {
	return <OpcionInputEstilizada {...props}></OpcionInputEstilizada>;
};

export default OpcionInput;
