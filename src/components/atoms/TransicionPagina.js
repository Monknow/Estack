import * as React from "react";
import styled from "styled-components";
import transicionSVGOscura from "../../assets/svg/layered-waves-haikei-oscuro.svg";
import transicionSVGClara from "../../assets/svg/layered-waves-haikei-claro.svg";

const TransicionPaginaEstilizado = styled.div`
    height: ${(props) => (props.oscuro ? "200px" : "300px")};

    background-image: ${(props) =>
        props.oscuro
            ? `url(${transicionSVGOscura})`
            : `url(${transicionSVGClara})`};
    background-repeat: no-repeat;
    background-size: cover;
`;

const TransicionPagina = ({ oscuro }) => {
    return (
        <TransicionPaginaEstilizado
            oscuro={oscuro}></TransicionPaginaEstilizado>
    );
};

export default TransicionPagina;
