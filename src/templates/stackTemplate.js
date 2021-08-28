import * as React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import { useState, useEffect, useContext } from "react";
import ContextoAuth from "../context/ContextoAuth";
import firebase from "firebase";
import Titulo from "../components/atoms/Titulo";
import Boton from "../components/atoms/Boton";
import CartasStack from "../components/organisms/CartasStack";
import Cargando from "../components/atoms/Cargando";

const StackTemplateEstilizado = styled.div``;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;

    & > * {
        margin: 20px 0px;
    }
`;

const StackTemplate = ({ slug }) => {
    const [datosUsuarioPagina, setDatosUsuarioPagina] = useState([]);
    const [datosStackUsuarioPagina, setDatosStackUsuarioPagina] = useState([]);
    const { isLoggedIn, profile } = useContext(ContextoAuth);
    console.log(datosUsuarioPagina);

    const db = firebase.firestore();

    useEffect(() => {
        const cargarStack = async (emailUsuario) => {
            const stackUsuarioRef = db
                .collection("users")
                .doc(emailUsuario)
                .collection("stack");

            await stackUsuarioRef.get().then((querySnapshot) => {
                let stackArray = [];

                querySnapshot.forEach((seccionStack) => {
                    if (seccionStack.exists) {
                        stackArray = [...stackArray, seccionStack.data()];
                    } else {
                        // usuario.data() will be undefined in this case
                        console.log("No such document!");
                    }
                });
                setDatosStackUsuarioPagina(stackArray);
            });
        };
        const cargarUsuario = async () => {
            const usuarioRef = db.collection("users");
            const usuarioQuery = usuarioRef.where("slug", "==", slug);

            await usuarioQuery.get().then((querySnapshot) => {
                querySnapshot.forEach((usuario) => {
                    if (usuario.exists) {
                        setDatosUsuarioPagina(usuario.data());
                        cargarStack(usuario.data().email);
                    } else {
                        // usuario.data() will be undefined in this case
                        console.log("No such document!");
                    }
                });
            });
        };

        cargarUsuario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [db]);

    return (
        <StackTemplateEstilizado>
            {datosStackUsuarioPagina && datosUsuarioPagina ? (
                <div>
                    <Helmet>
                        <title>
                            {`${datosUsuarioPagina.username}'s stack`}
                        </title>
                    </Helmet>
                    <Header>
                        <Titulo textAlign="center">
                            {datosUsuarioPagina.username}'s stack
                        </Titulo>
                        {isLoggedIn &&
                            profile?.email === datosUsuarioPagina.email && (
                                <Link to="/stack">
                                    <Boton>Edit</Boton>
                                </Link>
                            )}
                    </Header>
                    <CartasStack stack={datosStackUsuarioPagina}></CartasStack>
                </div>
            ) : (
                <Cargando></Cargando>
            )}
        </StackTemplateEstilizado>
    );
};

export default StackTemplate;
