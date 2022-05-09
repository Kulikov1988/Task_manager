import styled from "styled-components";

export const DivTaskForm = styled.div`
font-size: 18px;
font-weight: 500;

`

export const InputTaskForm = styled.input`
padding: .7em;
margin: .5em;
border: 2px solid ;
`

export const ButtonTaskForm = styled.button<{category:string}>`
border-radius: 10%;
font-size: 14px;
font-weight: 540;
color: white;
margin: .5rem;
padding: .6em;
background-color: ${props => props.category === 'new_task' ? 'green' 
: props.category === 'delete_task' ? 'red' 
: props.category === 'edit_task' ? 'blue' : 'orange'};


&:hover {
  background-color: yellow;
  color: blue;
}
`

