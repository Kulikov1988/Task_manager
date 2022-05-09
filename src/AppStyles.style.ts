import styled from "styled-components";

export const LoginDiv = styled.div<{isHidden:boolean}>`
font-weight: 400;
padding: 1rem;
font-family: 'Courier New', Courier, monospace;
display: ${({isHidden}) => isHidden ? 'none' : 'block'};
`