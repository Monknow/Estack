import * as React from "react";
import {useEffect, useState, useContext, createContext} from "react";
import ContextoAuth from "./ContextoAuth";
import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";

const ContextoPerfilUsuario = createContext({cargando: true, datos: null, sePuedeEditar: false});

export default ContextoPerfilUsuario;

const DatosUsuarioProvider = ({location, children}) => {
	const {profile, isLoading, isLoggedIn} = useContext(ContextoAuth);

	const [datosUsuario, setDatosUsuario] = useState(null);
	const [cargando, setCargando] = useState(true);
	const [sePuedeEditar, setSePuedeEditar] = useState(false);

	const db = getFirestore();

	useEffect(() => {
		const cargarUsuario = async () => {
			if (!isLoading) {
				const usuariosRef = collection(db, "users");

				const pathnameSlug = location.pathname.replace(/\/stack\//, "");

				const usuarioQuery = query(usuariosRef, where("slug", "==", pathnameSlug));

				const usuariosQuerySnap = await getDocs(usuarioQuery);

				usuariosQuerySnap.forEach((usuario) => {
					if (usuario.exists()) {
						setDatosUsuario(usuario.data());
						setCargando(!usuario.data());
					} else {
						// usuario.data() will be undefined in this case
						console.error("No such document!");
					}
				});
			}
		};

		cargarUsuario();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [db, isLoading, location]);

	useEffect(() => {
		if (!isLoading && isLoggedIn && datosUsuario && profile.email === datosUsuario.email) {
			setSePuedeEditar(true);
		}
	}, [location, isLoading, isLoggedIn, profile, datosUsuario]);

	return (
		<ContextoPerfilUsuario.Provider value={{cargando: cargando, datos: datosUsuario, sePuedeEditar: sePuedeEditar}}>
			{children}
		</ContextoPerfilUsuario.Provider>
	);
};

export {DatosUsuarioProvider};
