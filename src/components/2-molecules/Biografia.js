import * as React from "react";
import styled from "styled-components";
import {useContext, useState, useEffect} from "react";
import ContextoAuth from "../../context/ContextoAuth";
import {getFirestore, doc, getDoc, updateDoc} from "@firebase/firestore";
import IconoEditarSVG from "../../assets/svg/iconmonstr-pencil-9.inline.svg";
import TextArea from "../1-atoms/TextArea";
import TextoBiografia from "../1-atoms/TextoBiografia";
import Boton from "../1-atoms/Boton";

const BiografiaEstilizada = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;
`;

const EditarBiografiaEstilizada = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;

	& > * {
		margin: 10px 0px;
	}
`;

const SinEditarBiografiaEstilizada = styled.p`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-flow: column nowrap;

	margin: 20px 0px;

	text-align: center;

	& svg {
		width: clamp(10px, 6vw, 20px);
		height: clamp(10px, 6vw, 20px);

		fill: #091e42;
	}

	& button {
		padding: 5px clamp(2px, 6vw, 30px) 0px clamp(2px, 6vw, 30px);
	}

	& > * {
		margin-top: 20px;
	}
`;

const Biografia = ({esqueleto, edicion, texto}) => {
	const {profile, isLoading} = useContext(ContextoAuth);

	const [biografia, setBiografia] = useState(texto);
	const [editarbiografia, setEditarBiografia] = useState(edicion);

	const db = getFirestore();

	useEffect(() => {
		let mounted = true;
		const cargarDatosDeFirestore = async () => {
			if (!texto && !isLoading && mounted) {
				const usuarioRef = doc(db, "users", profile.email);

				const usuarioSnap = await getDoc(usuarioRef);

				if (usuarioSnap.exists()) {
					setBiografia(usuarioSnap.data().bio);
					if (usuarioSnap.data().bio.length === 0) {
						setEditarBiografia(true);
					}
				} else {
					await updateDoc(usuarioRef, {bio: ""});
				}
			}
		};
		cargarDatosDeFirestore();

		return () => {
			mounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile, isLoading]);

	const enviarBiografiaAFirestore = async () => {
		try {
			if (edicion && !isLoading && profile) {
				const usuarioRef = doc(db, "users", profile.email);

				await updateDoc(usuarioRef, {bio: biografia});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<BiografiaEstilizada>
			{editarbiografia ? (
				<EditarBiografiaEstilizada
					onSubmit={(evento) => {
						evento.preventDefault();
						enviarBiografiaAFirestore(biografia);
						setEditarBiografia(false);
					}}>
					<TextArea
						placeholder="I am a developer who likes..."
						maxLength={120}
						value={biografia}
						onChange={(evento) => {
							setBiografia(evento.target.value);
						}}
					/>
					<Boton type="submit">Save</Boton>
				</EditarBiografiaEstilizada>
			) : (
				<SinEditarBiografiaEstilizada>
					<TextoBiografia esqueleto={esqueleto}>{biografia}</TextoBiografia>
					{edicion && (
						<Boton
							secundario
							esqueleto={esqueleto}
							onClick={() => {
								setEditarBiografia(true);
							}}>
							<IconoEditarSVG />
						</Boton>
					)}
				</SinEditarBiografiaEstilizada>
			)}
		</BiografiaEstilizada>
	);
};

export default Biografia;
