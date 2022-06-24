import React from 'react';
import {
  ModalDiv,
  Overlay,
  ModalHeader,
  ModalMain,
  ModalButtonsDiv,
  ModalButtonX,
  ModalButton,
  ModalHeaderDiv,
} from './Modal.style';

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  title?: string;
  id?: number;
  isValidate?: boolean;
}

function Modal({
  isValidate,
  setIsOpen,
  isOpen,
  onCancel,
  onSubmit,
  children,
  title,
}: ModalProps) {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <>
          <Overlay></Overlay>
          <ModalDiv>
            <ModalHeader>
              <ModalHeaderDiv> {title} </ModalHeaderDiv>
              <ModalButtonX onClick={closeModal}>X</ModalButtonX>
            </ModalHeader>
            <ModalMain>{children}</ModalMain>
            <ModalButtonsDiv>
              <ModalButton type='button' category='submit' onClick={onSubmit}  disabled={!isValidate} >
                Submit
              </ModalButton>
              <ModalButton
                type='button'
                category='cancel'
                onClick={onCancel}
               
              >
                Cancel
              </ModalButton>
            </ModalButtonsDiv>
          </ModalDiv>
        </>
      )}
    </>
  );
}

export default Modal;
