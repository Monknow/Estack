import * as React from "react";
import {Helmet} from "react-helmet";
import {useContext, useEffect} from "react";
import {navigate} from "gatsby";
import {getFirestore, doc, getDoc} from "firebase/firestore";
import ContextoAuth from "../context/ContextoAuth";
import HeaderStack from "../components/3-cells/HeaderStack";
import RedesSociales from "../components/4-organs/RedesSociales";
import Stack from "../components/5-organisms/Stack";
import Cargando from "../components/1-atoms/Cargando";
import styled from "styled-components";

const AppPageEstilizado = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	min-height: 100vh;
`;

const AppPage = () => {
	const {isLoading, isLoggedIn} = useContext(ContextoAuth);
	const db = getFirestore();

	useEffect(() => {
		if (!isLoading && !isLoggedIn) {
			navigate("/login?message=To see your stack you must be logged");
		} else if (!isLoading && isLoggedIn) {
		}
	}, [isLoading, isLoggedIn]);

	return (
		<AppPageEstilizado>
			<Helmet>
				<title>Your stack</title>
			</Helmet>
			{!isLoading ? (
				<div>
					<HeaderStack />
					<RedesSociales />
					<Stack />
				</div>
			) : (
				<Cargando />
			)}
		</AppPageEstilizado>
	);
};

export default AppPage;
