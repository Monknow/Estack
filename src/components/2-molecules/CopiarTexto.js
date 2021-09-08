import * as React from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Boton from "../1-atoms/Boton";

const CopiarTexto = ({textoACopiar, esqueleto}) => {
	const copiarLinkAlPortapapeles = async () => {
		await navigator.clipboard
			.writeText(textoACopiar)
			.then(() => {
				const notificarDeCopiar = () =>
					toast.success("Copied to the clipboard!", {
						position: "bottom-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				notificarDeCopiar();
			})
			.catch(() => {
				const notificarDeError = () =>
					toast.error("Error while trying to copy", {
						position: "bottom-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				notificarDeError();
			});
	};

	return (
		<div>
			<Boton esqueleto={esqueleto} secundario onClick={copiarLinkAlPortapapeles}>
				Copy Link
			</Boton>
			<ToastContainer limit={3} />
		</div>
	);
};

export default CopiarTexto;
