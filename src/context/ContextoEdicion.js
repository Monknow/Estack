import * as React from "react";
import ContextoAuth from "../context/ContextoAuth";
import {createContext, useEffect, useState, useContext} from "react";
import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";

const ContextoEdicion = createContext(false);

export default ContextoEdicion;

const EdicionProvider = ({location, children}) => {
	const {isLoading, profile, isLoggedIn} = useContext(ContextoAuth);

	const [datosUsuario, setDatosUsuario] = useState(null);
	const [sePuedeEditar, setSePuedeEditar] = useState(false);

	const db = getFirestore();

	useEffect(() => {
		const cargarUsuario = async () => {
			const usuariosRef = collection(db, "users");
			const usuarioQuery = query(usuariosRef, where("slug", "==", location.pathname));

			const usuariosQuerySnap = await getDocs(usuarioQuery);

			usuariosQuerySnap.forEach((usuario) => {
				if (usuario.exists()) {
					setDatosUsuario(usuario.data());
				} else {
					// usuario.data() will be undefined in this case
					console.error("No such document!");
				}
			});
		};

		cargarUsuario();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [db]);

	useEffect(() => {
		if (!isLoading && isLoggedIn && datosUsuario && profile.email === datosUsuario?.email) {
			setSePuedeEditar(true);
		}
	}, [location, isLoading, profile, datosUsuario]);

	return <ContextoEdicion.Provider value={sePuedeEditar}>{children}</ContextoEdicion.Provider>;
};

export {EdicionProvider};
