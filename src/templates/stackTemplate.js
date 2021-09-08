import * as React from "react";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import {useState, useEffect} from "react";
import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";
import HeaderUsuarioStack from "../components/2-molecules/HeaderUsuarioStack";
import SeccionesStack from "../components/3-cells/SeccionesStack";
import RedesSociales from "../components/4-organs/RedesSociales";
import Biografia from "../components/2-molecules/Biografia";
import Cargando from "../components/1-atoms/Cargando";

const StackTemplateEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	min-height: 100vh;
`;

const StackTemplate = ({slug}) => {
	const [datosUsuarioPagina, setDatosUsuarioPagina] = useState(null);

	const db = getFirestore();

	useEffect(() => {
		const cargarUsuario = async () => {
			const usuariosRef = collection(db, "users");
			const usuarioQuery = query(usuariosRef, where("slug", "==", slug));

			const usuariosQuerySnap = await getDocs(usuarioQuery);

			usuariosQuerySnap.forEach((usuario) => {
				if (usuario.exists()) {
					setDatosUsuarioPagina(usuario.data());
				} else {
					// usuario.data() will be undefined in this case
					console.error("No such document!");
				}
			});
		};

		cargarUsuario();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [db]);

	return (
		<StackTemplateEstilizado>
			{datosUsuarioPagina ? (
				<div>
					<Helmet>
						<title>{`${datosUsuarioPagina.username}'s stack`}</title>
					</Helmet>
					<HeaderUsuarioStack datosUsuarioPagina={datosUsuarioPagina}></HeaderUsuarioStack>
					<Biografia edicion={false} texto={datosUsuarioPagina.bio}></Biografia>

					<RedesSociales redesSociales={datosUsuarioPagina.socialMedia}></RedesSociales>
					<SeccionesStack opcionesAñadidas={datosUsuarioPagina.stackSections}></SeccionesStack>
				</div>
			) : (
				<Cargando />
			)}
		</StackTemplateEstilizado>
	);
};

export default StackTemplate;
