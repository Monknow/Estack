import * as React from "react";
import styled, {keyframes} from "styled-components";

const cargando = keyframes`
    30% {
		background-position:
            250% 0 /* animacion */,
			50% 50% /* rectangulo */ ,
			0 0 /* fondo */ ;

        ;
    }
	100%{
		background-position:
            250% 0 /* animacion */,
			50% 50% /* rectangulo */ ,
			0 0 /* fondo */ ;

        ;
	}
`;

const EsqueletoRectangularEstilizado = styled.span`
	display: block;
	width: ${(props) => (props.width ? props.width : "clamp(50px, 20vw, 100px)")};
	height: ${(props) => (props.height ? props.height : "clamp(30px, 8vw, 40px)")};

	background-repeat: no-repeat;
	background-image: 
        /* layer 2: animacion */ linear-gradient(
			45deg,
			rgba(0, 0, 0, 0) 0,
			#efecff 50%,
			rgba(0, 0, 0, 0) 100%
		),
		/* layer 1: rectangulo */ linear-gradient(#e5e5e5 80%, transparent 0),
		/* layer 0: fondo */ linear-gradient(#efecff 100%, transparent 0);

	// prettier-ignore
	background-size: 
	300px 150% /* animacion */,
	80% 80% /* rectangulo */,
	100% 100%  /* fondo */;

	// prettier-ignore
	background-position: 
        -150% 0 /* animacion */,
        50% 50% /* rectangulo */ ,
		0 0 /* fondo */ ;

	animation: ${cargando} 3s infinite;
`;

const EsqueletoRectangular = ({width, height}) => {
	return <EsqueletoRectangularEstilizado width={width} height={height} />;
};

export default EsqueletoRectangular;
