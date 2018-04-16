/* tslint:disable */
import { injectGlobal } from 'styled-components';
import { BREAKPOINTS } from '../constants/constants';

export default () => {
    injectGlobal`

    body {
        margin: 2vw;
        padding: 0 !important;
        font-family: 'Roboto', sans-serif;
        
        &:after {
            content: '';
            width: 100%;
            height: 100%;
            background-image: url("https://i.imgur.com/YOsoVl7.jpg");
            background-size: 100% 100%;
            opacity: .05;
            z-index: 999;
            top: 0;
            left: 0;
            position: fixed;
            pointer-events: none;
        }
    }
    :root {
    --blue: #007bff;
--indigo: #6610f2;
--purple: #6f42c1;
--pink: #e83e8c;
--red: #dc3545;
--orange: #fd7e14;
--yellow: #ffc107;
--green: #28a745;
--teal: #20c997;
--cyan: #17a2b8;
--white: #fff;
--gray: #6c757d;
--gray-dark: #343a40;
--primary: #007bff;
--secondary: #6c757d;
--success: #28a745;
--info: #17a2b8;
--warning: #ffc107;
--danger: #dc3545;
--light: #f8f9fa;
--dark: #343a40;
    }
    
    .marginTopMd {
        @media (max-width: ${BREAKPOINTS.md}) {
            margin-top: 1rem;
        }
    }
`;
}