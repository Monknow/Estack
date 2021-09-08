import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";

const LogoEstilizado = styled.div`
    width: clamp(25px, 8vw, 35px);
`;

const Logo = () => {
    return (
        <LogoEstilizado>
            <StaticImage src="../../assets/svg/logo.svg" alt="estack logo" />
        </LogoEstilizado>
    );
};

export default Logo;
