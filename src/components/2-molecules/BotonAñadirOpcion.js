import * as React from "react";
import Boton from "../1-atoms/Boton";

const BotonAñadirOpcion = ({children, refReference, setInputAbierto, inputAbierto, customOnClick}) => {
	return (
		<div>
			{children ? (
				<div
					type="button"
					ref={refReference}
					role="button"
					tabIndex="0"
					onClick={() => {
						if (customOnClick) {
							customOnClick();
						}
						setInputAbierto(!inputAbierto);
					}}
					onKeyDown={(event) => {
						event.key = "Enter" ? setInputAbierto(!inputAbierto) : () => {};
					}}>
					{children}
				</div>
			) : (
				<div ref={refReference}>
					<Boton
						type="button"
						onClick={() => {
							if (customOnClick) {
								customOnClick();
							}
							setInputAbierto(!inputAbierto);
						}}>
						add
					</Boton>
				</div>
			)}
		</div>
	);
};

export default BotonAñadirOpcion;
