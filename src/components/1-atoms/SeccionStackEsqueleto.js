import * as React from "react";
import styled, {keyframes} from "styled-components";
import InputStackEstilizado from "./EstilosBasicosSeccionStack";

const cargando = keyframes`
    to {
        background-position:
            250% 0 /* animacion */,
            20px 170px, /* opcionSeleccionada */
            120px 170px, /* opcionSeleccionada */ 
            220px 170px,/* opcionSeleccionada */ 
            320px 170px, /* opcionSeleccionada */ 
            420px 170px, /* opcionSeleccionada */ 
            20px 100px,/* titulo */ 
            20px 20px, /* botonBorrar */ 
            0 0; /* card bg */
        ;
    }
`;

const SeccionStackSkeletonEstilizado = styled(InputStackEstilizado)`
	flex-shrink: 2;
	flex-grow: 2;
	flex-basis: 400px;
	height: 300px;

	background-repeat: no-repeat;
	background-image: 
        /* layer 7: animacion */ linear-gradient(
			45deg,
			rgba(0, 0, 0, 0) 0,
			#fff 50%,
			rgba(0, 0, 0, 0) 100%
		),
		/* layer 6: opcionSeleccionada */ linear-gradient(#e5e5e5 40px, transparent 0),
		/* layer 5: opcionSeleccionada */ linear-gradient(#e5e5e5 40px, transparent 0),
		/* layer 5: opcionSeleccionada */ linear-gradient(#e5e5e5 40px, transparent 0),
		/* layer 4: opcionSeleccionada */ linear-gradient(#e5e5e5 40px, transparent 0),
		/* layer 3: opcionSeleccionada */ linear-gradient(#e5e5e5 40px, transparent 0),
		/* layer 2: titulo */ linear-gradient(#e5e5e5 40px, transparent 0),
		/* layer 1: botonBorrar */ linear-gradient(#e5e5e5 40px, transparent 0),
		/* layer 0: card bg */ linear-gradient(#fff 100%, transparent 0);

	// prettier-ignore
	background-size: 
        300px 100% /* animacion */,
        80px 40px /* opcionSeleccionada */,  
        80px 40px /* opcionSeleccionada */,  
        80px 40px /* opcionSeleccionada */,  
        80px 40px /* opcionSeleccionada */,  
        80px 40px /* opcionSeleccionada */,  
        clamp(120px, 20vw, 180px) clamp(20px, 8vw, 40px) /* titulo */, 
        clamp(40px, 10vw, 70px) clamp(30px, 8vw, 40px) /* botonBorrar */ ,
        100% 100%; /* card bg */

	// prettier-ignore
	background-position: 
        -150% 0 /* animacion */,
        20px 170px, /* opcionSeleccionada */
        120px 170px, /* opcionSeleccionada */ 
        220px 170px,/* opcionSeleccionada */ 
        320px 170px, /* opcionSeleccionada */ 
        420px 170px, /* opcionSeleccionada */ 
        20px 100px,/* titulo */ 
        20px 20px, /* botonBorrar */ 
        0 0; /* card bg */

	animation: ${cargando} 3s infinite;
`;

const SeccionStackSkeleton = () => {
	return <SeccionStackSkeletonEstilizado />;
};

export default SeccionStackSkeleton;
