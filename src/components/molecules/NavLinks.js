import * as React from "react";
import { navigate, Link } from "gatsby";
import { useContext } from "react";
import { auth } from "gatsby-theme-firebase";
import ContextoAuth from "../../context/ContextoAuth";
import styled from "styled-components";
import LinkNav from "../atoms/LinkNav";
import Boton from "../atoms/Boton";
import Logo from "../atoms/Logo";

const NavLinksEstilizados = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100vw;

    & a {
        margin: 0px 10px;
    }

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: max-content;
    }
`;

const LinksUsuarioAutorizado = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: max-content;

    & > * {
        margin: 0px 10px;
    }
`;

const NavLinks = () => {
    const { isLoading, isLoggedIn, profile } = useContext(ContextoAuth);

    const manejarClickLogOut = async () => {
        await auth.signOut();
        navigate("/");
    };

    return (
        <NavLinksEstilizados>
            <div>
                <Link to="/">
                    <Logo />
                </Link>
                <Link to="/stack">
                    <Boton>Stack </Boton>
                </Link>
            </div>
            <div>
                {!isLoading && isLoggedIn ? (
                    <LinksUsuarioAutorizado>
                        <p>{profile.displayName}</p>
                        <LinkNav to="/" onClick={manejarClickLogOut}>
                            Sign Out
                        </LinkNav>
                    </LinksUsuarioAutorizado>
                ) : (
                    <div>
                        <LinkNav to="/login">Log in</LinkNav>
                        <LinkNav to="/signin">
                            <Boton type="button">Sign in</Boton>
                        </LinkNav>
                    </div>
                )}
            </div>
        </NavLinksEstilizados>
    );
};

export default NavLinks;
