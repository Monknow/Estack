import * as React from "react";
import styled from "styled-components";
import {useContext} from "react";
import ContextoAuth from "../../context/ContextoAuth";
import NavLinks from "../2-molecules/NavLinks";

const NavBarEstilizado = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 0px clamp(5px, 3vw, 20px);

	height: clamp(60px, 6vh, 90px);
`;

const NavBar = () => {
	const {isLoading} = useContext(ContextoAuth);

	return <NavBarEstilizado>{!isLoading && <NavLinks></NavLinks>}</NavBarEstilizado>;
};

export default NavBar;
