import styled from "styled-components";

export const EditFormStyle = styled.div`
display: flex;
justify-content: end;
`

export const DivTaskForm = styled.div`
font-size: 20px;
font-weight: 500;
text-align: center;
`

export const ErrorDivForm = styled.div`
color: red;
font-size: 20px;
font-weight: 500;
text-align: center;
`

export const InputTaskForm = styled.input`
font-family: 'Indie Flower', cursive;
font-size: 16px;
font-weight: 600;
padding: .7em;
margin: .5em;
border: 2px solid ;
`

export const ButtonTaskForm = styled.button<{category:string}>`
font-family: 'Indie Flower', cursive;
border-radius: 3px;
border: 2px solid palevioletred;
font-size: 17px;
width: 90px;
height: 50px;
font-weight: 600;
color: white;
transition-duration: 0.4s;
margin: .1em;
background-color: ${props => props.category === 'new_task' ? 'green' 
: props.category === 'delete_task' ? 'red' 
: props.category === 'edit_task' ? 'orange' : 'black'};


&:hover {
  background-color: ${props => props.category === 'new_task' ? 'white' 
: props.category === 'delete_task' ? 'yellow' 
: props.category === 'edit_task' ? 'olive' : 'black'};
  color: black;
  opacity: .9;
}
`

