import * as React from "react";
import {useEffect, useState, useContext, createContext} from "react";
import ContextoAuth from "./ContextoAuth";
import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";

const ContextoPerfilUsuario = createContext({cargando: true, datos: null, sePuedeEditar: false, error: null});

export default ContextoPerfilUsuario;

const DatosUsuarioProvider = ({location, children}) => {
	const {profile, isLoading, isLoggedIn} = useContext(ContextoAuth);

	const [datosUsuario, setDatosUsuario] = useState(null);
	const [cargando, setCargando] = useState(true);
	const [sePuedeEditar, setSePuedeEditar] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const db = getFirestore();
		setCargando(true);

		let mounted = true;

		if (mounted) {
			const cargarUsuario = async () => {
				if (!isLoading) {
					const usuariosRef = collection(db, "users");

					const pathnameSlug = location.pathname.replace(/\/stack\//, "");

					const usuarioQuery = query(usuariosRef, where("slug", "==", pathnameSlug));

					const usuariosQuerySnap = await getDocs(usuarioQuery);
					if (usuariosQuerySnap) {
						if (usuariosQuerySnap.empty) {
							setError("User not found");
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
	}, [isLoading, location]);

	useEffect(() => {
		let mounted = true;

		if (mounted && !isLoading && isLoggedIn && datosUsuario && profile.email === datosUsuario.email) {
			setSePuedeEditar(true);
		}
		return () => {
			mounted = false;
		};
	}, [location, isLoading, isLoggedIn, profile, datosUsuario]);

	return (
		<ContextoPerfilUsuario.Provider
			value={{cargando: cargando, datos: datosUsuario, sePuedeEditar: sePuedeEditar, error: error}}>
			{children}
		</ContextoPerfilUsuario.Provider>
	);
};

export {DatosUsuarioProvider};
