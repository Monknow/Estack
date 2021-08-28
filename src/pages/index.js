import * as React from "react";
import Portada from "../components/organisms/Portada";
import SeccionHome from "../components/organisms/SeccionHome";
import TransicionPagina from "../components/atoms/TransicionPagina";
import seccionesHome from "../data/seccionesHome";

const IndexPage = () => {
    return (
        <div>
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

export default IndexPage;
