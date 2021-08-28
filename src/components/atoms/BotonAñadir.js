import * as React from "react";
import Boton from "./Boton";

const BotonAñadir = ({ toggleInputAbierto }) => {
    return (
        <Boton type="button" onClick={toggleInputAbierto}>
            Añadir +
        </Boton>
    );
};

export default BotonAñadir;
