import * as React from "react";
import {useState, useEffect, createContext} from "react";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../../firebaseConfig";
import {getAuth, onAuthStateChanged} from "firebase/auth";

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

	useEffect(() => {
		initializeApp(firebaseConfig);

		const auth = getAuth();

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

export {AuthProvider};
