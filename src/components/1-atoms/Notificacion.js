import * as React from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notificar = (tipo, mensaje, promesa) => {
	console.log(tipo);

	switch (tipo) {
		case undefined:
			toast(mensaje, {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			break;
		case "promise":
			toast.promise(promesa, {
				pending: mensaje.pending,
				success: mensaje.success,
				error: mensaje.error,
			});
			break;
		default:
			toast[tipo](mensaje, {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			break;
	}
};

export {notificar};

const Notificacion = () => {
	return <ToastContainer limit={3} />;
};

export default Notificacion;
