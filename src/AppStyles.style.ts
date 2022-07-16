import styled from "styled-components";

export const LoginDiv = styled.div<{isHidden:boolean}>`
font-weight: 500;
font-size: 22px;
padding: 1rem;
font-family: 'Indie Flower', cursive;
display: ${({isHidden}) => isHidden ? 'none' : 'block'};
`

export const HeaderForm = styled.form`
display: flex;
justify-content: space-between;
`