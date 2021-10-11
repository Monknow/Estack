import * as React from "react";
import {useEffect, useState, useContext, createContext} from "react";
import ContextoAuth from "./ContextoAuth";
import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";

const ContextoPerfilUsuario = createContext({cargando: true, datos: null, sePuedeEditar: false});

export default ContextoPerfilUsuario;

const DatosUsuarioProvider = ({slug, children}) => {
	const {profile, isLoading, isLoggedIn} = useContext(ContextoAuth);

	const [datosUsuario, setDatosUsuario] = useState(null);
	const [cargando, setCargando] = useState(true);
	const [sePuedeEditar, setSePuedeEditar] = useState(false);

	useEffect(() => {
		const db = getFirestore();
		setCargando(true);

		let mounted = true;

		if (mounted) {
			const cargarUsuario = async () => {
				if (!isLoading && slug) {
					const usuariosRef = collection(db, "users");

					const usuarioQuery = query(usuariosRef, where("slug", "==", slug));

					const usuariosQuerySnap = await getDocs(usuarioQuery);
					if (usuariosQuerySnap) {
						if (usuariosQuerySnap.empty) {
							setCargando(false);
						} else {
							usuariosQuerySnap.forEach((usuario) => {
								setDatosUsuario(usuario.data());
								setCargando(false);
							});
						}
					}
				}
			};

			cargarUsuario();
		}

		return () => {
			mounted = false;
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, isLoggedIn, profile]);

	useEffect(() => {
		let mounted = true;

		if (mounted && !isLoading && isLoggedIn && datosUsuario && profile.email === datosUsuario.email) {
			setSePuedeEditar(true);
		}
		return () => {
			mounted = false;
		};
	}, [isLoading, isLoggedIn, profile, datosUsuario]);

	return (
		<ContextoPerfilUsuario.Provider value={{cargando: cargando, datos: datosUsuario, sePuedeEditar: sePuedeEditar}}>
			{children}
		</ContextoPerfilUsuario.Provider>
	);
};

export {DatosUsuarioProvider};
