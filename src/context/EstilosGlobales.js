import { createGlobalStyle } from "styled-components";
import "../assets/fonts/fonts.css";

const EstilosGlobales = createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
  }

  html{
    font-size: clamp(10px, 3vw, 16px);
  }

  body{
    font-family: "ibm_plex_sans_thairegular";
    
    background-color: #EFECFF;
  }
`;

export default EstilosGlobales;
