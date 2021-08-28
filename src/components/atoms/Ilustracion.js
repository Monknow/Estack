import * as React from "react";
import styled from "styled-components";
import blobOscuro from "../../assets/svg/blob-oscuro.svg";
import blobClaro from "../../assets/svg/blob-claro.svg";

const Blob = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: ${(props) =>
        props.oscuro ? `url(${blobClaro})` : `url(${blobOscuro})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

const IlustracionEstilizada = styled.img`
    margin: 30px 60px;

    width: clamp(100px, 70vw, 400px);
`;

const Ilustracion = ({ svg, alt, oscuro }) => {
    return (
        <Blob oscuro={oscuro}>
            <IlustracionEstilizada src={svg} alt={alt} />
        </Blob>
    );
};

export default Ilustracion;
