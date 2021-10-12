import * as React from "react";
import styled from "styled-components";
import {useContext, useState, useEffect} from "react";
import ContextoAuth from "../context/ContextoAuth";
import {Helmet} from "react-helmet";
import {getFirestore, collection, collectionGroup, query, where, getDocs} from "firebase/firestore";
import {navigate} from "gatsby";
import Titulo from "../components/1-atoms/Titulo";
import {ResultadoBusqueda} from "../components/2-molecules/ResultadoBusqueda";
import {BarraDeBusqueda} from "../components/3-cells/BarraDeBusqueda";
import Cargando from "../components/1-atoms/Cargando";

const IndexPageEstilizada = styled.div`
	display: flex;
	align-items: center;
	flex-flow: column nowrap;
	gap: clamp(20px, 20vw, 35px);

	box-sizing: border-box;
	padding: clamp(40px, 30vw, 100px) clamp(20px, 10vw, 40px) clamp(20px, 10vw, 40px) clamp(20px, 10vw, 40px);

	min-height: 100vh;
	width: 100%;
`;

const FormularioBusqueda = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;
	gap: clamp(10px, 6vw, 20px);

	width: 100%;
`;

const IndexPage = () => {
	const {isLoggedIn, isLoading} = useContext(ContextoAuth);

	const [inputValue, setInputValue] = useState("");
	const [cargando, setCargando] = useState(true);
	const [iniciarBusquedaDeUsuarios, setIniciarBusquedaDeUsuarios] = useState(false);
	const [iniciarBusqueda, setIniciarBusqueda] = useState(false);
	const [configuracion, setConfiguracion] = useState({seccionesStack: []});
	const [resultados, setResultados] = useState([]);
	const [correosPorOpciones, setCorreosPorOpciones] = useState([]);

	const db = getFirestore();

	const visitado = localStorage.getItem("visited");

	if (!visitado) {
		localStorage.setItem("visited", "true");
		navigate("/home");
	}

	useEffect(() => {
		if (!isLoading && !isLoggedIn) {
			navigate("/login");
		}
	}, [isLoggedIn, isLoading]);

	const searchQuery = async (event) => {
		event.preventDefault();
		setResultados([]);
		setIniciarBusquedaDeUsuarios(false);
		setIniciarBusqueda(true);
		setCargando(true);
		setCorreosPorOpciones([]);

		if (configuracion.seccionesStack.length !== 0) {
			const opcionDeStackQuery = query(
				collectionGroup(db, "stack"),
				where("options", "array-contains-any", configuracion.seccionesStack)
			);

			const opcionDeStackSnap = await getDocs(opcionDeStackQuery);

			if (!opcionDeStackSnap.empty) {
				let resultadosArray = [];
				opcionDeStackSnap.forEach((resultado) => {
					resultadosArray = [...resultadosArray, resultado.data().userEmail];
				});
				console.log(resultadosArray);
				setCorreosPorOpciones(resultadosArray);
			}
		}
		setIniciarBusquedaDeUsuarios(true);
	};

	useEffect(() => {
		const cargarUsuarios = async () => {
			const usuariosRef = collection(db, "users");

			let queryFilters = [];

			if (correosPorOpciones.length !== 0) {
				queryFilters = [...queryFilters, where("email", "in", correosPorOpciones)];
			}

			if (inputValue.length !== 0) {
				queryFilters = [...queryFilters, where("username", "==", inputValue)];
			}

			if (queryFilters.length !== 0) {
				const usuariosQuery = query(usuariosRef, ...queryFilters);

				const usuariosSnap = await getDocs(usuariosQuery);

				if (usuariosSnap) {
					if (!usuariosSnap.empty) {
						let resultadosArray = [];
						usuariosSnap.forEach((resultado) => {
							resultadosArray = [...resultadosArray, resultado.data()];
						});

						setResultados(resultadosArray);
					}
				}
			}
			setCargando(false);
		};

		if (iniciarBusquedaDeUsuarios) {
			cargarUsuarios();
		}
	}, [correosPorOpciones, db, iniciarBusquedaDeUsuarios]);

	return (
		<IndexPageEstilizada>
			{visitado ? (
				<>
					<Helmet>
						<title>eStack Sharer</title>
					</Helmet>
					<Titulo>Looking for a developer?</Titulo>
					<FormularioBusqueda onSubmit={searchQuery}>
						<BarraDeBusqueda setConfiguracion={setConfiguracion} elevarInputValue={setInputValue} />

						{iniciarBusqueda && (
							<>
								{cargando ? (
									<Cargando />
								) : (
									<>
										{resultados.length !== 0 ? (
											<>
												{resultados.map((resultadoDatos) => {
													return (
														<ResultadoBusqueda
															datos={resultadoDatos}
															key={resultadoDatos.slug}
														/>
													);
												})}
											</>
										) : (
											<>
												<Titulo>No results found for your search</Titulo>
											</>
										)}
									</>
								)}
							</>
						)}
					</FormularioBusqueda>
				</>
			) : (
				<Cargando />
			)}
		</IndexPageEstilizada>
	);
};

export default IndexPage;
