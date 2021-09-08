import styled from "styled-components";

const SeccionStackEstilizado = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-flow: column nowrap;

	min-height: 250px;
	height: 100%;

	box-sizing: border-box;
	padding: 20px;
	border-radius: 4px;

	background-color: #fff;
	color: #091e42;
	box-shadow: 0 0 1.5rem 0 rgba(0, 0, 0, 0.25);

	& > * {
		margin-bottom: 20px;
	}

	@media (max-width: 600px) {
		align-items: center;
	}
`;

export default SeccionStackEstilizado;
