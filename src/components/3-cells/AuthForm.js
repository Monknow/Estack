import * as React from "react";
import styled from "styled-components";
import {useState, useContext, useEffect} from "react";
import ContextoURL from "../../context/ContextoURL";
import Boton from "../1-atoms/Boton";
import InputLogin from "../2-molecules/InputLogin";
import Subtitulo from "../1-atoms/Subtitulo";
import LinkInterno from "../1-atoms/LinkInterno";
import Cargando from "../1-atoms/Cargando";

const AuthFormEnvoltura = styled.div`
	width: clamp(100px, 90vw, 500px);

	margin: 8vh 0px 20vh 0px;

	background-color: #fff;
	box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);
`;

const AuthFormEstilizado = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 30px;

	height: clamp(200px, auto, 700px);

	background-color: #fff;
	box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);
`;

const Contenido = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;

	width: 100%;
`;

const MensajeDeError = styled.p`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	min-height: 50px;

	box-sizing: border-box;
	border-radius: 4px 4px 0px 0px;
	padding: 10px;

	font-family: "ibm_plex_sans_thaisemibold";

	text-align: center;

	background-color: ${(props) => (props.estadoMensaje === 0 ? "rgba(59, 40, 204, 0.5)" : "#f4a4ab")};
	transition: all 100ms;
	color: #091e42;

	box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);
`;

const MensajeInferior = styled.p`
	margin-top: 20px;
`;

const Campos = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: row wrap;

	margin: 20px 0px;
`;

const AuthForm = ({titulo, manejarSubmit, tipo}) => {
	const urlDelContexto = useContext(ContextoURL);

	const [username, setUsername] = useState("");
	const [nombre, setNombre] = useState("");
	const [email, setEmail] = useState("");
	const [contraseña, setContraseña] = useState("");

	const [mensajeDeError, setMensajeDeError] = useState("");
	const [cargando, setCargando] = useState(false);

	useEffect(() => {
		const url = new URL(urlDelContexto.href);

		if (url) {
			const parametrosURl = url.searchParams;
			const emailDeURL = parametrosURl.get("email") ? parametrosURl.get("email") : "";
			setEmail(emailDeURL);
			const mensajeDeURL = parametrosURl.get("message") ? parametrosURl.get("message") : "";
			setMensajeDeError(mensajeDeURL);
		}
	}, [urlDelContexto]);

	const datosInputs = {
		signin: [
			{
				labelTexto: "Username",
				placeholder: "",
				value: username,
				elevarValorInput: setUsername,
				type: "text",
			},
			{
				labelTexto: "Full name",
				placeholder: "John Doe",
				value: nombre,
				elevarValorInput: setNombre,
				type: "text",
			},
			{
				labelTexto: "Email",
				placeholder: "email@example.com",
				value: email,
				elevarValorInput: setEmail,
				type: "email",
			},
			{
				labelTexto: "Password",
				placeholder: "",
				value: contraseña,
				elevarValorInput: setContraseña,
				type: "password",
			},
		],
		login: [
			{
				labelTexto: "Email",
				placeholder: "email@example.com",
				value: email,
				elevarValorInput: setEmail,
				type: "email",
			},
			{
				labelTexto: "Password",
				placeholder: "",
				value: contraseña,
				elevarValorInput: setContraseña,
				type: "password",
			},
		],
	};

	return (
		<AuthFormEnvoltura>
			<MensajeDeError estadoMensaje={mensajeDeError.length}>
				<span>{mensajeDeError}</span>
			</MensajeDeError>

			<AuthFormEstilizado
				onSubmit={async (event) => {
					try {
						event.preventDefault();
						setMensajeDeError("");

						await manejarSubmit(email, contraseña, nombre, username, setMensajeDeError, setCargando);
					} catch (error) {
						console.error(error);
						setCargando(false);
					}
				}}>
				{!cargando ? (
					<Contenido>
						<header>
							<Subtitulo>{titulo}</Subtitulo>
						</header>
						<Campos>
							{datosInputs[tipo] !== 0 &&
								datosInputs[tipo].map((input) => {
									return (
										<InputLogin
											key={input.labelTexto}
											labelTexto={input.labelTexto}
											inputPlaceholder={input.placeholder}
											value={input.value}
											onChange={(evento) => {
												input.elevarValorInput(evento.target.value);
											}}
											type={input.type}></InputLogin>
									);
								})}
						</Campos>
						<Boton type="submit">{titulo}</Boton>
						{tipo === "signin" ? (
							<MensajeInferior>
								Already have an account?{" "}
								<LinkInterno to={`/login${email.length !== 0 ? `?email=${email}` : ""}`}>
									Log in
								</LinkInterno>
							</MensajeInferior>
						) : (
							<MensajeInferior>
								Don't have an account?{" "}
								<LinkInterno to={`/signin${email.length !== 0 ? `?email=${email}` : ""}`}>
									Sign in
								</LinkInterno>
							</MensajeInferior>
						)}
					</Contenido>
				) : (
					<Cargando></Cargando>
				)}
			</AuthFormEstilizado>
		</AuthFormEnvoltura>
	);
};

export default AuthForm;
