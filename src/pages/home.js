import * as React from "react";
import {Helmet} from "react-helmet";
import Portada from "../components/3-cells/Portada";
import SeccionHome from "../components/3-cells/SeccionHome";
import TransicionPagina from "../components/1-atoms/TransicionPagina";
import seccionesHome from "../data/seccionesHome";

const HomePage = () => {
	return (
		<div>
			<Helmet>
				<title>eStack Sharer</title>
			</Helmet>
			<Portada></Portada>
			{seccionesHome.map((seccion, index) => {
				const oscuro = index === 0 || index % 2 === 0 ? true : false;
				const align = index === 0 || index % 2 === 0 ? "right" : "left";

				return (
					<div key={seccion.titulo}>
						<TransicionPagina oscuro={oscuro}></TransicionPagina>
						<SeccionHome
							titulo={seccion.titulo}
							subtitulo={seccion.subtitulo}
							parrafo={seccion.parrafo}
							align={align}
							oscuro={oscuro}
							svg={seccion.svg}
							alt={seccion.alt}></SeccionHome>
					</div>
				);
			})}
		</div>
	);
};

export default HomePage;
