import * as React from "react";
import {useState} from "react";
import styled from "styled-components";
import {navigate} from "gatsby-link";
import InputTexto from "../1-atoms/InputTexto";
import Boton from "../1-atoms/Boton";

const LogInShortcutEstilizado = styled.form`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-flow: row wrap;

	width: clamp(100px, 70vw, 500px);

	& > * {
		margin: 10px 10px 10px 0px;
	}

	@media (max-width: 600px) {
		justify-content: center;
	}
`;

const LogInShortcut = () => {
	const [valorInput, setValorInput] = useState("");

	return (
		<LogInShortcutEstilizado
			onSubmit={(event) => {
				event.preventDefault();
				navigate(`/signin?email=${valorInput}`);
			}}>
			<InputTexto
				onChange={(evento) => setValorInput(evento.target.value)}
				value={valorInput}
				placeholder="Email"
				type="text"
			/>
			<Boton type="submit">Sign in</Boton>
		</LogInShortcutEstilizado>
	);
};

export default LogInShortcut;
