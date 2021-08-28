import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import firebase from "firebase";
import { useContext, useEffect, useState } from "react";
import ContextoAuth from "../../context/ContextoAuth";
import opciones from "../../data/opciones";
import InputStack from "../molecules/InputStack";
import Titulo from "../atoms/Titulo";
import Boton from "../atoms/Boton";
import Cargando from "../atoms/Cargando";

const StackEstilizado = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;

    margin-bottom: 40vh;

    & > h1 {
        margin: 30px;
    }
`;

const StackHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;

    & > * {
        margin: 20px 0px;
    }
`;

const LinkEstilizado = styled(Link)`
    width: min-content;
`;

const InputsStack = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-flow: row wrap;
`;

const Stack = () => {
    const { isLoading, profile } = useContext(ContextoAuth);
    const [datosUsuario, setDatosUsuario] = useState(null);
    const db = firebase.firestore();

    useEffect(() => {
        const cargarOpcionesDeFirestore = async () => {
            if (!isLoading && profile) {
                const usuarioRef = db.collection("users").doc(profile.email);
                await usuarioRef.get().then((usuario) => {
                    if (usuario.exists) {
                        setDatosUsuario(usuario.data());
                    } else {
                        // usuario.data() will be undefined in this case
                        console.log("No such document!");
                    }
                });
            }
        };
        cargarOpcionesDeFirestore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, profile]);

    return (
        <StackEstilizado>
            {datosUsuario ? (
                <div>
                    <StackHeader>
                        <Titulo>{datosUsuario.username}'s stack</Titulo>
                        <LinkEstilizado to={`/users/${datosUsuario.slug}`}>
                            <Boton>See your link</Boton>
                        </LinkEstilizado>
                    </StackHeader>
                    <InputsStack>
                        {Array.from(opciones).map(([key, value]) => {
                            return (
                                <InputStack
                                    key={key}
                                    seccion={value.title}
                                    opciones={value.options}></InputStack>
                            );
                        })}
                    </InputsStack>
                </div>
            ) : (
                <Cargando />
            )}
        </StackEstilizado>
    );
};

export default Stack;
