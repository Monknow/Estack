import * as React from "react";
import {Helmet} from "react-helmet";
import styled from "styled-components";
import validator from "validator";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {navigate} from "gatsby";

import uniqueSlug from "unique-slug";
import AuthForm from "../components/3-cells/AuthForm";

const SigninEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	min-height: 100vh;
`;

const SigninPage = () => {
	const crearUsuarioEnFireStore = async (
		email,
		contraseña,
		nombre,
		username,
		levantarMensajeDeError,
		levantarCargando
	) => {
		const uid = uniqueSlug();

		try {
			const db = getFirestore();
			const auth = getAuth();

			levantarCargando(true);

			await createUserWithEmailAndPassword(auth, email, contraseña).then(async ({user}) => {
				if (user) {
					await updateProfile(user, {displayName: username});
				}
			});

			const usuarioRef = doc(db, "users", email);

			await setDoc(usuarioRef, {
				username: username.toLowerCase(),
				name: nombre,
				email: email,
				uid: uid,
				slug: `${username}-${uid}`,
				bio: "",
				stackSections: [],
				socialMedia: [],
			}).then(() => {
				navigate(`/stack/${username}-${uid}`);
			});
		} catch (error) {
			levantarCargando(false);
			console.error("Error adding document: ", error);
			levantarMensajeDeError(error.message);
		}
	};

	const verificarUsuario = (email, contraseña, nombre, username, levantarMensajeDeError, levantarCargando) => {
		const credencialesSonValidas =
			validator.isEmail(email) &&
			validator.isStrongPassword(contraseña) &&
			validator.isLowercase(username) &&
			username.length >= 4 &&
			nombre.length > 0;

		switch (true) {
			case credencialesSonValidas:
				crearUsuarioEnFireStore(email, contraseña, nombre, username, levantarMensajeDeError, levantarCargando);
				break;
			case validator.isEmail(email) === false:
				levantarMensajeDeError("Email is not valid");
				break;
			case validator.isStrongPassword(contraseña) === false:
				levantarMensajeDeError(
					"Password must be 8 characters or more, with at least 1 lowercase, 1 uppercase, 1 number and 1 symbol"
				);
				break;
			case validator.isLowercase(username) === false:
				levantarMensajeDeError("Username must be in lower cases");
				break;
			case username.length < 4:
				levantarMensajeDeError("Username must be 4 characters or more");
				break;
			case nombre.length === 0:
				levantarMensajeDeError("Name field is empty");
				break;
			default:
				levantarMensajeDeError("Unkown error. Try later");
		}
	};

	return (
		<SigninEstilizado>
			<Helmet>
				<title>Sign in</title>
			</Helmet>
			<AuthForm titulo="Sign in" manejarSubmit={verificarUsuario} tipo="signin"></AuthForm>
		</SigninEstilizado>
	);
};

export default SigninPage;
