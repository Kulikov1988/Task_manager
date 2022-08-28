import styled, { css } from 'styled-components';

export type Variant = 'edit' | 'create' | 'remove';

const edit = css`
  margin: 2rem 6rem;
  font-family: 'Indie Flower', cursive;
  padding: 0.6em 1.3em;
  font-size: 18px;
  font-weight: 900;
  border-radius: 0.4em;
  border: 3px solid black;
  box-shadow: 0.1em 0.1em;
  background-color: antiquewhite;
  &:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em;
  }
`;

const create = css`
  margin: 2rem 6rem;
  font-family: 'Indie Flower', cursive;
  padding: 0.6em 1.3em;
  font-size: 18px;
  font-weight: 900;
  border-radius: 0.4em;
  border: 3px solid black;
  box-shadow: 0.1em 0.1em;
  background-color: #40f00b;
  &:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em;
  }
`;

const remove = css`
  margin: 2rem 6rem;
  font-family: 'Indie Flower', cursive;
  padding: 0.6em 1.3em;
  font-size: 18px;
  font-weight: 900;
  border-radius: 0.4em;
  border: 3px solid black;
  box-shadow: 0.1em 0.1em;
  background-color: #876538;
  &:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em;
  }
`;

export const Button = styled.button<{ variant: Variant }>`
  ${({ variant }) => {
    if (variant === "edit") {
      return edit ;
    } else if (variant === "create") {
      return create
    } else if (variant === "remove") {
      return remove
    }
  }}
`;
