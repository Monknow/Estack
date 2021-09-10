import * as React from "react";
import {URlProvider} from "./src/context/ContextoURL";
import {AuthProvider} from "./src/context/ContextoAuth";
import {DatosUsuarioProvider} from "./src/context/ContextoDatosUsuario";
import EstilosGlobales from "./src/context/EstilosGlobales";
import NavBar from "./src/components/3-cells/NavBar";
import Footer from "./src/components/2-molecules/Footer";

export const wrapPageElement = ({element, props}) => {
	return (
		<URlProvider {...props}>
			<EstilosGlobales></EstilosGlobales>
			<AuthProvider>
				<DatosUsuarioProvider {...props}>
					<NavBar></NavBar>
					{element}
					<Footer></Footer>
				</DatosUsuarioProvider>
			</AuthProvider>
		</URlProvider>
	);
};
