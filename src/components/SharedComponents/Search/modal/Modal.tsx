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
  headerTitle?: string;
  headerTitle1?: string;
  id?: number;
  isDisable?: boolean;
}

function Modal({
  id,
  isDisable,
  setIsOpen,
  isOpen,
  onCancel,
  onSubmit,
  children,
  headerTitle,
  headerTitle1,
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
              <ModalHeaderDiv>{headerTitle}</ModalHeaderDiv>
              <ModalButtonX onClick={closeModal}>X</ModalButtonX>
            </ModalHeader>
            <ModalMain>{children}</ModalMain>
            <ModalButtonsDiv>
              <ModalButton
                type='button'
                category='submit'
                onClick={onSubmit}
                disabled={isDisable}
                
              >
                Submit
              </ModalButton>
              <ModalButton type='button' category='cancel' onClick={onCancel}>
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
