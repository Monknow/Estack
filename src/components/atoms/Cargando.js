import * as React from "react";
import styled, { keyframes } from "styled-components";

const CargandoEstilizado = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;

    width: 100%;

    font-family: "ibm_plex_sans_thaisemibold";
`;

const CargandoSVG = styled.svg`
    margin: 10px 0px 25px 0px;
`;

const CuadradoFondo = styled.rect``;

const animacionRectanguloLargo = keyframes`
    from {
        width: 74px;
    }

    to {
        width: 36px;
    }     
`;

const RectanguloLargo = styled.rect`
    animation: ${animacionRectanguloLargo} 500ms alternate
        cubic-bezier(0.77, 0, 0.18, 1) infinite;
`;

const animacionRectanguloCorto = keyframes`
    from {
        width: 36px;
    }

    to {
        width: 74px;
    }     
`;

const RectanguloCorto = styled.rect`
    animation: ${animacionRectanguloCorto} 500ms alternate
        cubic-bezier(0.77, 0, 0.18, 1) infinite;
`;

const Cargando = () => {
    return (
        <CargandoEstilizado>
            <CargandoSVG
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <CuadradoFondo width="100" height="100" fill="#E5E5E5" />
                <CuadradoFondo width="100" height="100" rx="6" fill="#3B28CC" />
                <RectanguloLargo
                    x="13"
                    y="66"
                    width="74"
                    height="18"
                    rx="4"
                    fill="#EFECFF"
                />
                <RectanguloLargo
                    x="13"
                    y="16"
                    width="74"
                    height="18"
                    rx="4"
                    fill="#EFECFF"
                />
                <RectanguloCorto
                    x="13"
                    y="41"
                    width="36"
                    height="18"
                    rx="4"
                    fill="#EFECFF"
                />
            </CargandoSVG>
            <p>{`Loading...`}</p>
        </CargandoEstilizado>
    );
};

export default Cargando;
