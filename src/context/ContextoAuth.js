import * as React from "react";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebaseConfig";
import { createContext } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const contextoInicial = {
    isLoading: true,
    isLoggedIn: false,
    profile: null,
};

const ContextoAuth = createContext(contextoInicial);

export default ContextoAuth;

const AuthProvider = (props) => {
    const [cargando, setCargando] = useState(true);
    const [perfilUsuario, setPerfilUsuario] = useState(null);

    const [datosContextoAuth, setDatosContextoAuth] = useState(contextoInicial);

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    useEffect(() => {
        const desuscribir = onAuthStateChanged(auth, (user) => {
            if (user) {
                setPerfilUsuario(user);
            } else {
                setPerfilUsuario(null);
            }

            setCargando(false);
        });

        // Unsubscribe to the listener when unmounting
        return () => {
            desuscribir();
        };
    }, []);

    useEffect(() => {
        setDatosContextoAuth({
            isLoading: cargando,
            isLoggedIn: !!perfilUsuario,
            profile: perfilUsuario,
        });
    }, [cargando, perfilUsuario]);

    return (
        <ContextoAuth.Provider
            value={{
                isLoading: cargando,
                isLoggedIn: !!perfilUsuario,
                profile: perfilUsuario,
            }}>
            {props.children}
        </ContextoAuth.Provider>
    );
};

export { AuthProvider };
