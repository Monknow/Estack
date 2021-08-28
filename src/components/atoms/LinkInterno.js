import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const LinkInternoEstilizado = styled(Link)`
    text-decoration: none;

    color: #2667ff;

    &:visited {
        color: #222387;
    }
`;

const LinkInterno = ({ to, children }) => {
    return <LinkInternoEstilizado to={to}>{children}</LinkInternoEstilizado>;
};

export default LinkInterno;
