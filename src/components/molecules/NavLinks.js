import * as React from "react";
import { navigate, Link } from "gatsby";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
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
        const auth = getAuth();
        await signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <NavLinksEstilizados>
            <div>
                <Link to="/">
                    <Logo />
                </Link>
                {!isLoading && isLoggedIn ? (
                    <Link to="/stack">
                        <Boton>Stack</Boton>
                    </Link>
                ) : (
                    <Link to="/login?message=To see your stack you must be logged">
                        <Boton>Stack</Boton>
                    </Link>
                )}
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
