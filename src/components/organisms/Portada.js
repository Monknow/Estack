import * as React from "react";
import styled from "styled-components";
import TextoPrincipal from "../molecules/TextoPrincipal";
import LogInShortcut from "../molecules/LogInShortcut";
import Ilustracion from "../atoms/Ilustracion";
import ilustracionSVG from "../../assets/svg/world-youth-skills-day-amico.svg";

const PortadaEstilizada = styled.main`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-flow: row wrap;

    margin: 0px auto;

    min-height: 96vh;
    width: calc(100vw - 50px);

    & > * {
        margin: 20px;
    }

    @media (max-width: 600px) {
        justify-content: center;
    }
`;

const Contenido = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-flow: column;

    width: clamp(300px, 90vw, 500px);

    & > * {
        margin: clamp(8px, 2vw, 16px) 0px;
    }

    @media (max-width: 600px) {
        align-items: center;
    }
`;

const Portada = () => {
    return (
        <PortadaEstilizada>
            <Contenido>
                <TextoPrincipal
                    titulo="eStack Sharer"
                    subtitulo="Share your software stack with the world"
                    parrafo="Put your goals on paper, track and share your skills, and
                achieve higher levels of efficiency. eStack Sharer gives you the
                tools to keep your abilities on point."></TextoPrincipal>
                <LogInShortcut></LogInShortcut>
            </Contenido>
            <Ilustracion
                svg={ilustracionSVG}
                alt="Illustration of people with tools"
                claro></Ilustracion>
        </PortadaEstilizada>
    );
};

export default Portada;
