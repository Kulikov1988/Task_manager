import React from 'react';
import { ModalDiv, Overlay, ModalHeader, ModalMain } from './Modal.style';

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

function Modal({setIsOpen, isOpen, ...rest} : ModalProps) {
  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <>
      <div>modal</div>
      {isOpen && (
        <>
          <Overlay ></Overlay>
          <ModalDiv>
            <ModalHeader>
              <h2>Modal Title</h2>
              <button onClick={closeModal}>&times;</button>
            </ModalHeader>
            <ModalMain>
              <p>Some content here!</p>
            </ModalMain>
          </ModalDiv>
        </>
      )}
       open modal component
            <button onClick={openModal} > Open modal</button>
    </>
  );
}

export default Modal;
