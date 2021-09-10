import * as React from "react";
import styled from "styled-components";
import {useContext, useState, useEffect} from "react";
import ContextoDatosUsuario from "../../context/ContextoDatosUsuario";
import {getFirestore, doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import {usePopper} from "react-popper";
import slugify from "slugify";
import slugifyConfig from "../../data/slugifyConfig";
import Boton from "../1-atoms/Boton";
import Icono from "../1-atoms/Icono";
import InputConTextoFijado from "../1-atoms/InputConTextoFijado";
import RedSocialEsqueleto from "../1-atoms/RedSocialEsqueleto";

const RedSocialEstilizada = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;

	& svg {
		cursor: pointer;
	}
`;

const FormularioDeSufijoLink = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-flow: column nowrap;

	box-sizing: border-box;
	padding: 20px;
	border-radius: 4px;

	height: clamp(140px, 20vw, 300px);
	width: clamp(340px, 50vw, 500px);

	background-color: #fff;
	color: #091e42;
	box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);
`;

const RedSocial = ({keyRedSocial, valorRedSocial, eliminarOpcion, empezarAGuardar}) => {
	const {datos, sePuedeEditar} = useContext(ContextoDatosUsuario);

	const [sufijoLink, setSufijoLink] = useState("");
	const [cargando, setCargando] = useState(true);
	const [redSocialTieneLinkAdjunto, setRedSocialTieneLinkAdjunto] = useState(false);

	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);

	const slugifiedRedSocial = slugify(keyRedSocial, slugifyConfig);

	const db = getFirestore();

	const {styles, attributes} = usePopper(referenceElement, popperElement, {
		placement: "bottom",
		modifiers: [
			{
				name: "offset",
				enabled: true,
				options: {
					offset: [0, 10],
				},
			},
		],
	});

	useEffect(() => {
		let mounted = true;
		const cargarDatosDeFirestore = async () => {
			if (mounted && datos) {
				const usuarioRef = doc(db, "users", datos.email);
				const socialRef = doc(usuarioRef, "social", slugifiedRedSocial);

				const socialSnap = await getDoc(socialRef);

				if (socialSnap.exists()) {
					setRedSocialTieneLinkAdjunto(!!socialSnap.data()?.sufijoLink);
					setSufijoLink(socialSnap.data().sufijoLink);
				} else {
					await setDoc(socialRef, {title: keyRedSocial, uid: slugifiedRedSocial, sufijoLink: ""});
				}
				setCargando(false);
			}
		};
		cargarDatosDeFirestore();

		return () => {
			mounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const enviarSufijoLinkAFirestore = async (sufijoLinkParaEnviar) => {
		try {
			if (sePuedeEditar && datos) {
				const usuarioRef = doc(db, "users", datos.email);
				const socialRef = doc(usuarioRef, "social", slugifiedRedSocial);

				await updateDoc(socialRef, {sufijoLink: sufijoLinkParaEnviar});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<RedSocialEstilizada>
			{sePuedeEditar && (
				<div ref={setReferenceElement}>
					<Boton
						esqueleto={!sufijoLink}
						secundario
						onClick={() => {
							setSufijoLink("");
							enviarSufijoLinkAFirestore("");
							setRedSocialTieneLinkAdjunto(!!sufijoLink);
							eliminarOpcion(keyRedSocial);
						}}>
						x
					</Boton>
				</div>
			)}
			{empezarAGuardar && redSocialTieneLinkAdjunto ? (
				<a target="_blank" rel="noreferrer" href={`${valorRedSocial.prefijoLink}${sufijoLink}`}>
					<Icono IconoSVG={valorRedSocial.icono} />
				</a>
			) : (
				<RedSocialEsqueleto />
			)}
			{!cargando && sePuedeEditar && !redSocialTieneLinkAdjunto && (
				<FormularioDeSufijoLink
					onSubmit={(evento) => {
						evento.preventDefault();
						enviarSufijoLinkAFirestore(sufijoLink);
						setRedSocialTieneLinkAdjunto(!!sufijoLink);
					}}
					ref={setPopperElement}
					style={styles.popper}
					{...attributes.popper}>
					<label>Add a link for your {keyRedSocial}</label>

					<InputConTextoFijado
						textoFijado={valorRedSocial.prefijoLink}
						elevarValorInput={setSufijoLink}
						value={sufijoLink}
					/>
					<Boton type="submit">Submit</Boton>
				</FormularioDeSufijoLink>
			)}
		</RedSocialEstilizada>
	);
};

export default RedSocial;
