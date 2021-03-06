import {createGlobalStyle} from "styled-components";
import "../assets/fonts/fonts.css";

const EstilosGlobales = createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
  }

  html{
    font-size: clamp(10px, 2vw, 14px);
  }

  body{
    overflow-x: hidden;
    font-family: "ibm_plex_sans_thairegular";
    
    background-color: #EFECFF;
  }
`;

export default EstilosGlobales;
