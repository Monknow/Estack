import * as React from "react";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import ContextoAuth from "../../context/ContextoAuth";
import firebase from "firebase";
import useSlugify from "../../hooks/useSlugify";
import OpcionesDisponibles from "./OpcionesDisponibles";
import OpcionesAñadidas from "./OpcionesAñadidas";
import BotonAñadir from "../atoms/BotonAñadir";
import Subtitulo from "../atoms/Subtitulo";

const InputStackEnvolturaEstilizado = styled.div`
    flex-grow: 2;
    flex-basis: 500px;

    min-height: 200px;

    margin: 10px;
    padding: 20px;
    border-radius: 4px;

    background-color: #fff;
    color: #091e42;
    box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);
`;

const InputStackEstilizado = styled.div`
    & > * {
        margin: 10px 0px;
    }
`;

const EnvolturaBotonAñadir = styled.div`
    display: flex;

    margin: 20px 0px;

    @media (max-width: 600px) {
        justify-content: center;
    }
`;

const InputStack = ({ seccion, opciones }) => {
    const { isLoading, profile } = useContext(ContextoAuth);

    const [inputAbierto, setInputAbierto] = useState(false);
    const [empezarAGuardar, setEmpezarAGuardar] = useState(false);
    const [opcionesAñadidas, setOpcionesAñadidas] = useState(new Set());
    const [opcionesDisponibles, setOpcionesDisponibles] = useState(new Set());

    const db = firebase.firestore();
    const slugifiedSeccion = useSlugify(seccion);

    const toggleInputAbierto = () => {
        setInputAbierto(!inputAbierto);
    };

    const añadirOpcion = async (opcionParaAñadir) => {
        if (typeof opcionParaAñadir === "string") {
            setOpcionesAñadidas(opcionesAñadidas.add(opcionParaAñadir));

            const arraySinOpcionParaAñadir = [...opcionesDisponibles].filter(
                (opcionDisponible) => opcionDisponible !== opcionParaAñadir
            );

            setOpcionesDisponibles(new Set(arraySinOpcionParaAñadir));
        } else if (typeof opcionParaAñadir === "object") {
            const opcionesDisponiblesSinOpcionesAñadidas = await opciones
                .sort()
                .filter((opcion) => {
                    if (opcionParaAñadir.has(opcion) === false) {
                        return true;
                    } else {
                        return false;
                    }
                });

            setOpcionesDisponibles(
                new Set(opcionesDisponiblesSinOpcionesAñadidas)
            );

            setOpcionesAñadidas(opcionParaAñadir);
        }
    };

    const eliminarOpcion = (opcionParaEliminar) => {
        const opcionesDisponiblesSet =
            opcionesDisponibles.add(opcionParaEliminar);

        const opcionesDisponiblesAlfabeticamente = [
            ...opcionesDisponiblesSet,
        ].sort();

        setOpcionesDisponibles(new Set(opcionesDisponiblesAlfabeticamente));

        const arraySinOpcionParaEliminar = [...opcionesAñadidas].filter(
            (opcionAñadida) => opcionAñadida !== opcionParaEliminar
        );

        setOpcionesAñadidas(new Set(arraySinOpcionParaEliminar));
    };

    useEffect(() => {
        const cargarOpcionesDeFirestore = async () => {
            if (!isLoading && profile) {
                const stackRef = db
                    .collection("users")
                    .doc(profile.email)
                    .collection("stack")
                    .doc(slugifiedSeccion);

                await stackRef.get().then((stack) => {
                    if (stack.exists) {
                        const seccionStackFirestore = stack.data().options;

                        añadirOpcion(new Set(seccionStackFirestore));
                        setEmpezarAGuardar(true);
                    } else {
                        // usuario.data() will be undefined in this case
                        console.log("No such document!");
                    }
                });
            }
        };
        cargarOpcionesDeFirestore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        const actualizarStack = async () => {
            if (!isLoading && profile && empezarAGuardar) {
                const stackRef = db
                    .collection("users")
                    .doc(profile.email)
                    .collection("stack")
                    .doc(slugifiedSeccion);

                await stackRef.update({
                    options: [...opcionesAñadidas],
                });
            }
        };
        actualizarStack();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opcionesAñadidas, opcionesDisponibles, empezarAGuardar]);

    return (
        <InputStackEnvolturaEstilizado>
            {empezarAGuardar ? (
                <InputStackEstilizado>
                    <Subtitulo>{seccion}</Subtitulo>
                    <EnvolturaBotonAñadir>
                        <BotonAñadir
                            toggleInputAbierto={
                                toggleInputAbierto
                            }></BotonAñadir>
                    </EnvolturaBotonAñadir>
                    <OpcionesDisponibles
                        onBlur={toggleInputAbierto}
                        opciones={opcionesDisponibles}
                        toggleInputAbierto={toggleInputAbierto}
                        añadirOpcion={añadirOpcion}
                        inputAbierto={inputAbierto}></OpcionesDisponibles>

                    <OpcionesAñadidas
                        opciones={opcionesAñadidas}
                        eliminarOpcion={eliminarOpcion}></OpcionesAñadidas>
                </InputStackEstilizado>
            ) : (
                <div></div>
            )}
        </InputStackEnvolturaEstilizado>
    );
};

export default InputStack;
