import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`

${reset}

body {
    /* display: flex;
    justify-content: center;
    align-items: center; */
    width: 100%;
    font-family: "Noto Sans KR", sans-serif;
    background-color: #2a3652;
    &::-webkit-scrollbar {
      display: none;
  }
}
`;

export default GlobalStyle;
