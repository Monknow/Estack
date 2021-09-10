import * as React from "react";
import {navigate, Link} from "gatsby";
import {useContext, useEffect, useState} from "react";
import {getFirestore, doc, getDoc} from "@firebase/firestore";
import {getAuth, signOut} from "firebase/auth";
import ContextoAuth from "../../context/ContextoAuth";
import styled from "styled-components";
import LinkNav from "../1-atoms/LinkNav";
import Boton from "../1-atoms/Boton";
import Logo from "../1-atoms/Logo";

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
	const {isLoading, isLoggedIn, profile} = useContext(ContextoAuth);

	const [linkDelStackDelUsuario, setLinkDelStackDelUsuario] = useState("/");
	const db = getFirestore();

	useEffect(() => {
		const cargarUsuarioDeFirestore = async () => {
			if (!isLoading && isLoggedIn) {
				const usuarioRef = doc(db, "users", profile.email);
				const usuarioSnap = await getDoc(usuarioRef);

				if (usuarioSnap.exists()) {
					const slugUsuario = usuarioSnap.data().slug;
					setLinkDelStackDelUsuario(`/stack/${slugUsuario}`);
				} else {
					console.log("Error while loading document:", usuarioRef);
				}
			}
		};

		cargarUsuarioDeFirestore();
	}, [isLoading, isLoggedIn, profile, db]);

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
					<Link to={linkDelStackDelUsuario}>
						<Boton>Stack</Boton>
					</Link>
				) : (
					<Link to="/login?message=To edit your stack you must be logged">
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
