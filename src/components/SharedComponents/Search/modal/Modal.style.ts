import styled from "styled-components";

export const Overlay = styled.div`
width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`
export const ModalDiv = styled.div`
position: fixed;
  z-index: 20;
  background: #fff;
  width: 500px;

  /* Center the modal */
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`
export const ModalHeader = styled.header`
background-color: #61c7e7;
  padding: 2px 20px;
  display: flex;
  /* justify-content: space-between; */
  position: relative;
  text-align: center;
`

export const ModalHeaderDiv = styled.div`
padding: 10px;
position: relative;
left: 140px;
font-size: 22px;
font-weight: 700;
`

export const ModalButtonX = styled.button`

position: relative;
  top: 1%;
  left: 94%;
  
`

export const ModalMain = styled.main`
display: inline-block;
padding: 20px;

`

export const ModalButtonsDiv = styled.div`
display: flex;
justify-content: end;
background-color: aliceblue;
color: antiquewhite;
padding: 20px;

`

export const ModalButton = styled.button<{category:string}>`
font-weight: 600;
font-size: 16px;
border-radius: 6px;
padding: 6px;
margin-left: 13px;

color: ${props => props.category === 'cancel' ? 'rgba(174, 193, 46, 0.9)' 
: props.category === 'submit' ? 'rgba(255, 255, 255, 0.78)' 
: props.category === 'edit_task' ? 'orange' : 'black'};
background-color: ${props => props.category === 'cancel' ? 'rgba(243, 229, 229, 0.48)' 
: props.category === 'submit' ? 'rgba(24, 56, 226, 0.78)' 
: props.category === 'edit_task' ? 'orange' : 'black'};

&:disabled {
  cursor: not-allowed;

}
`