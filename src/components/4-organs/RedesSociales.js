import * as React from "react";
import styled from "styled-components";
import {getFirestore, doc} from "firebase/firestore";
import {useContext, useState} from "react";
import ContextoEdicion from "../../context/ContextoEdicion";
import ContextoAuth from "../../context/ContextoAuth";
import useOpciones from "../../hooks/useOpciones";
import datosRedesSociales from "../../data/datosRedesSociales";
import RedSocial from "../2-molecules/RedSocial";
import OpcionesDisponibles from "../3-cells/OpcionesDisponibles";
import Icono from "../1-atoms/Icono";
import AñadirIconoSVG from "../../assets/svg/iconmonstr-plus-2.inline.svg";
import Subtitulo from "../1-atoms/Subtitulo";
import RedSocialEsqueleto from "../1-atoms/RedSocialEsqueleto";

const RedesSocialesEnvoltorio = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	margin-top: 20px;
`;

const RedesSocialesEstilizadas = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-flow: column nowrap;

	& > * {
		margin-top: 20px;
	}

	& > h2 {
		margin: 40px 0px 20px 0px;
	}
`;

const BurbujasRedes = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;

	& > * {
		margin: 0px 10px;
	}
`;

const RedesSociales = ({redesSociales}) => {
	const {profile, isLoading} = useContext(ContextoAuth);
	const sePuedeEditar = useContext(ContextoEdicion);

	const [opcionParaAñadir, setOpcionParaAñadir] = useState(null);
	const [opcionParaEliminar, setOpcionParaEliminar] = useState(null);

	const db = getFirestore();
	const usuarioRef = !isLoading ? doc(db, "users", profile.email) : null;

	const datosRedesSocialesKeys = Array.from(datosRedesSociales.keys());

	const {opcionesAñadidas, opcionesDisponibles, empezarAGuardar} = useOpciones(
		opcionParaAñadir,
		opcionParaEliminar,
		datosRedesSocialesKeys,
		usuarioRef,
		"socialMedia"
	);

	const redesSocialesArray = sePuedeEditar ? opcionesAñadidas : redesSociales;

	return (
		<RedesSocialesEnvoltorio>
			<RedesSocialesEstilizadas>
				<Subtitulo esqueleto={!empezarAGuardar}>Social Media</Subtitulo>

				<BurbujasRedes>
					{[...redesSocialesArray].map((keyRedSocial) => {
						/* Se utiliza el operador spread para convertir "opcionesAñadidas" de set a array*/

						const valorRedSocial = datosRedesSociales.get(keyRedSocial);

						return (
							<RedSocial
								key={keyRedSocial}
								keyRedSocial={keyRedSocial}
								valorRedSocial={valorRedSocial}
								eliminarOpcion={setOpcionParaEliminar}
								empezarAGuardar={empezarAGuardar}
							/>
						);
					})}
					{sePuedeEditar && (
						<OpcionesDisponibles
							opciones={opcionesDisponibles}
							añadirOpcion={setOpcionParaAñadir}
							eliminarSeccion={setOpcionParaEliminar}>
							{empezarAGuardar ? <Icono IconoSVG={AñadirIconoSVG} secundario /> : <RedSocialEsqueleto />}
						</OpcionesDisponibles>
					)}
				</BurbujasRedes>
			</RedesSocialesEstilizadas>
		</RedesSocialesEnvoltorio>
	);
};

export default RedesSociales;
