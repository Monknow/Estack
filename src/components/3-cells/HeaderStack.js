import * as React from "react";
import {useState, useContext, useEffect} from "react";
import ContextoAuth from "../../context/ContextoAuth";
import ContextoURL from "../../context/ContextoURL";
import ContextoEdicion from "../../context/ContextoEdicion";
import {getFirestore, doc, getDoc} from "@firebase/firestore";
import styled from "styled-components";
import Titulo from "../1-atoms/Titulo";
import Boton from "../1-atoms/Boton";
import CopiarTexto from "../2-molecules/CopiarTexto";
import Biografia from "../2-molecules/Biografia";

import {Link} from "gatsby";

const HeaderStackEnvoltura = styled.div``;

const HeaderStackEstilizado = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column nowrap;

	& > * {
		margin-top: 40px;
	}
`;

const Botones = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: row wrap;

	& > * {
		margin: 5px 20px;
	}

	& button {
		width: clamp(170px, 18vw, 220px);
	}
`;

const InfoUsuario = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;
`;

const HeaderStack = () => {
	const {isLoading, profile} = useContext(ContextoAuth);
	const sePuedeEditar = useContext(ContextoEdicion);

	const [datosUsuario, setDatosUsuario] = useState(null);

	const db = getFirestore();
	const usuarioRef = doc(db, "users", profile.email);

	useEffect(() => {
		const cargarDatosDelUsuario = async () => {
			if (!isLoading && profile) {
				const usuarioSnap = await getDoc(usuarioRef);

				if (usuarioSnap.exists) {
					setDatosUsuario(usuarioSnap.data());
				} else console.error("This document doesn't exists!");
			}
		};

		cargarDatosDelUsuario();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile, isLoading]);

	return (
		<HeaderStackEnvoltura>
			<HeaderStackEstilizado>
				<Botones>
					<Link to={`/users/${datosUsuario?.slug}`}>
						<Boton esqueleto={!datosUsuario}>See your link</Boton>
					</Link>
					<CopiarTexto
						esqueleto={!datosUsuario}
						textoACopiar={`estacksharer.com/users/${datosUsuario?.slug}`}
					/>
				</Botones>
				<InfoUsuario>
					<Titulo esqueleto={!datosUsuario}>{datosUsuario?.username}'s stack</Titulo>
					<Biografia esqueleto={!datosUsuario} edicion={sePuedeEditar}></Biografia>
				</InfoUsuario>
			</HeaderStackEstilizado>
		</HeaderStackEnvoltura>
	);
};

export default HeaderStack;
