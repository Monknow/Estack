import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { auth } from "gatsby-theme-firebase";
import { navigate } from "gatsby";
import AuthForm from "../components/organisms/AuthForm";

const LoginEstilizado = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;
`;

const LoginPage = () => {
    const loginUsuario = async (
        email,
        contraseña,
        nombre,
        username,
        levantarMensajeDeError,
        levantarCargando
    ) => {
        try {
            levantarCargando(true);
            await auth
                .signInWithEmailAndPassword(email, contraseña)
                .then(() => {
                    navigate("/stack");
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
            <AuthForm
                titulo="Log in"
                manejarSubmit={loginUsuario}
                tipo="login"></AuthForm>
        </LoginEstilizado>
    );
};

export default LoginPage;
