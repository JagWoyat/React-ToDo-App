import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap');

    *, *::before, *::after {
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }

    body {
        margin:0px;
        padding-top: 70px;
    }
`;

export default GlobalStyle;
