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
background: orangered;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`

export const ModalMain = styled.main`
padding: 20px;
`