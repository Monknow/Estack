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

    width: clamp(100px, 70vw, 500px);
`;

const IlustracionEstilizada = styled.img`
    margin: 30px 60px;

    width: clamp(100px, 80%, 500px);
`;

const Ilustracion = ({ svg, alt, oscuro, className }) => {
    return (
        <Blob oscuro={oscuro} className={className}>
            <IlustracionEstilizada src={svg} alt={alt} />
        </Blob>
    );
};

export default Ilustracion;
