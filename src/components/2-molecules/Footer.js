import * as React from "react";
import styled from "styled-components";
import TransicionPagina from "../1-atoms/TransicionPagina";

const FooterEstilizado = styled.footer`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	padding-bottom: 60px;

	height: 30vh;
	background-color: #3b28cc;

	font-family: "ibm_plex_sans_thaisemibold";
	font-size: 1.1rem;

	color: #fff;

	& > * {
		margin: 20px 0px;
	}
`;

const LinkAtribucion = styled.a`
	text-decoration: none;

	color: #fff;
`;

const Footer = ({children}) => {
	return (
		<div>
			<TransicionPagina oscuro></TransicionPagina>
			<FooterEstilizado>
				<LinkAtribucion href="https://storyset.com/people">Illustrations by Storyset</LinkAtribucion>
				<span>Created by Juan Rodríguez</span>
				<span>All rights reserved ©</span>
			</FooterEstilizado>
		</div>
	);
};

export default Footer;
