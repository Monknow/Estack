import * as React from "react";
import {Helmet} from "react-helmet";
import styled from "styled-components";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore, doc, getDoc} from "@firebase/firestore";
import {navigate} from "gatsby";
import AuthForm from "../components/3-cells/AuthForm";

const LoginEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	height: 100vh;
`;

const LoginPage = () => {
	const db = getFirestore();

	const loginUsuario = async (email, contraseña, nombre, username, levantarMensajeDeError, levantarCargando) => {
		try {
			const auth = getAuth();

			levantarCargando(true);
			await signInWithEmailAndPassword(auth, email, contraseña).then(async ({user}) => {
				if (user) {
					const usuarioRef = doc(db, "users", email);
					const usuarioSnap = await getDoc(usuarioRef);

					if (usuarioSnap.exists()) {
						const slugUsuario = usuarioSnap.data().slug;
						navigate(`/stack/${slugUsuario}`);
					} else {
						console.error("The document doesn't exist");
						navigate("/");
					}
				}
			});
		} catch (error) {
			levantarCargando(false);
			console.log(error);
			levantarMensajeDeError(error.message);
		}
	};

	return (
		<LoginEstilizado>
			<Helmet>
				<title>Log in</title>
			</Helmet>
			<AuthForm titulo="Log in" manejarSubmit={loginUsuario} tipo="login"></AuthForm>
		</LoginEstilizado>
	);
};

export default LoginPage;
