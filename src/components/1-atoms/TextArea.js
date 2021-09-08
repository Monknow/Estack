import * as React from "react";
import styled from "styled-components";

const TextAreaEstilizada = styled.textarea`
	border-radius: 4px;
	border: 1px solid #aaa;
	padding: 12px;

	min-height: clamp(70px, 20vw, 120px);
	width: clamp(170px, 90vw, 600px);
	resize: none;

	font-family: "ibm_plex_sans_thairegular";
	font-size: 1.4em;

	color: #091e42;

	&:focus,
	&:active {
		outline: 0;
		box-shadow: 0 0 0 0.2rem rgba(59, 40, 204, 0.5);
	}
`;

const TextArea = (props) => {
	return <TextAreaEstilizada {...props}></TextAreaEstilizada>;
};

export default TextArea;
