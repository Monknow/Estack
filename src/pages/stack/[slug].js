import * as React from "react";
import StackTemplate from "../../templates/stackTemplate";
import {DatosUsuarioProvider} from "../../context/ContextoDatosUsuario";

const UsersPage = ({slug}) => {
	return (
		<DatosUsuarioProvider slug={slug}>
			<StackTemplate></StackTemplate>
		</DatosUsuarioProvider>
	);
};

export default UsersPage;
