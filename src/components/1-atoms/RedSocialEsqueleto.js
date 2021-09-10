import * as React from "react";
import styled, {keyframes} from "styled-components";

const cargando = keyframes`
    to {
        background-position:
            250% 0 /* animacion */,
            0 0, /* redSocial */ 
            0 0; /* card bg */
        ;
    }
`;

const largoDelEsqueleto = "clamp(42px, 10vw, 58px)";

const RedSocialEsqueletoEstilizado = styled.div`
	margin: 10px;

	width: ${largoDelEsqueleto};
	height: ${largoDelEsqueleto};

	background-repeat: no-repeat;
	background-image: 
        /* layer 2: animacion */ linear-gradient(
			45deg,
			rgba(0, 0, 0, 0) 0,
			#efecff 50%,
			rgba(0, 0, 0, 0) 100%
		),
		/* layer 1: redSocial */
			radial-gradient(circle calc(${largoDelEsqueleto} / 2) at center, #e5e5e5 99%, transparent 0),
		/* layer 0: card bg */ linear-gradient(#efecff 100%, transparent 0);

	// prettier-ignore
	background-size: 
        300px 100% /* animacion */,
        ${largoDelEsqueleto} ${largoDelEsqueleto}/* redSocial */ ,
        100% 100%; /* card bg */

	// prettier-ignore
	background-position: 
        -150% 0 /* animacion */,
        0 0, /* redSocial */ 
        0 0; /* card bg */

	animation: ${cargando} 3s infinite;
`;

const RedSocialEsqueleto = () => {
	return <RedSocialEsqueletoEstilizado />;
};

export default RedSocialEsqueleto;
