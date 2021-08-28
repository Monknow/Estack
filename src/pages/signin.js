import * as React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import validator from "validator";
import firebase from "firebase";
import { auth } from "gatsby-theme-firebase";
import { navigate } from "gatsby";
import slugify from "slugify";
import uniqueSlug from "unique-slug";
import opciones from "../data/opciones";
import AuthForm from "../components/organisms/AuthForm";

const SigninEstilizado = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;

    min-height: 100vh;
`;

const SigninPage = () => {
    useEffect(() => {
        if (window) {
            window.scroll(0, 100);
        }
    });

    const crearUsuarioEnFireStore = async (
        email,
        contraseña,
        nombre,
        username,
        levantarMensajeDeError,
        levantarCargando
    ) => {
        console.log(levantarCargando);
        const db = firebase.firestore();
        const uid = uniqueSlug();

        try {
            levantarCargando(true);

            await auth
                .createUserWithEmailAndPassword(email, contraseña)
                .then(async ({ user }) => {
                    if (user) {
                        await user.updateProfile({ displayName: username });
                    }
                });

            await db
                .collection("users")
                .doc(email)
                .set({
                    username: username,
                    name: nombre,
                    email: email,
                    uid: uid,
                    slug: `${username}-${uid}`,
                });

            opciones.forEach(async (value, key) => {
                const tituloSlugified = slugify(key, {
                    replacement: "-", // replace spaces with replacement character, defaults to `-`
                    remove: undefined, // remove characters that match regex, defaults to `undefined`
                    lower: true, // convert to lower case, defaults to `false`
                    strict: true, // strip special characters except replacement, defaults to `false`
                    locale: "vi", // language code of the locale to use
                    trim: true, // trim leading and trailing replacement chars, defaults to `true`
                });

                await db
                    .collection("users")
                    .doc(email)
                    .collection("stack")
                    .doc(tituloSlugified)
                    .set({
                        title: key,
                        uid: tituloSlugified,
                        options: [],
                    })
                    .then(() => {
                        navigate("/stack");
                    });
            });
        } catch (error) {
            levantarCargando(false);
            console.error("Error adding document: ", error);
            levantarMensajeDeError(error.message);
        }
    };

    const verificarUsuario = (
        email,
        contraseña,
        nombre,
        username,
        levantarMensajeDeError,
        levantarCargando
    ) => {
        const credencialesSonValidas =
            validator.isEmail(email) &&
            validator.isStrongPassword(contraseña) &&
            username.length >= 4 &&
            nombre.length > 0;

        switch (true) {
            case credencialesSonValidas:
                crearUsuarioEnFireStore(
                    email,
                    contraseña,
                    nombre,
                    username,
                    levantarMensajeDeError,
                    levantarCargando
                );
                break;
            case validator.isEmail(email) === false:
                levantarMensajeDeError("Email is not valid");
                break;
            case validator.isStrongPassword(contraseña) === false:
                levantarMensajeDeError(
                    "Password must be 8 characters or more, with at least 1 lowercase, 1 uppercase, 1 number and 1 symbol"
                );
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
            <AuthForm
                titulo="Sign in"
                manejarSubmit={verificarUsuario}
                tipo="signin"></AuthForm>
        </SigninEstilizado>
    );
};

export default SigninPage;
