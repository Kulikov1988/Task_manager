import styled from "styled-components";

export const Button = styled.button`
  
  margin: 2rem 6rem;
  background: #FBCA1F;
  font-family: inherit;
  padding: .6em 1.3em;
  font-size: 18px;
  font-weight: 900;
  border-radius: .4em;
  border: 3px solid black;
  box-shadow: .1em .1em;
  
 &:hover {
  transform: translate(-0.05em, -0.05em);
  box-shadow: 0.15em 0.15em;
 }
 &:active {
  color: purple;
 }
`