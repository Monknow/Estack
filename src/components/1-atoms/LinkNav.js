import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const LinkEstilizado = styled(Link)`
    font-family: "ibm_plex_sans_thaisemibold";

    text-decoration: none;

    color: #091e42;

    cursor: pointer;
`;

const LinkNav = ({ children, to, onClick }) => {
    return (
        <LinkEstilizado onClick={onClick ? onClick : undefined} to={to}>
            {children}
        </LinkEstilizado>
    );
};

export default LinkNav;
