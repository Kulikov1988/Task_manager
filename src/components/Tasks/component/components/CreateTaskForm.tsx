import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../store';
import { ButtonTaskForm, DivTaskForm } from './TaskForm.style';
import EditTaskForm from './editForm/EditTaskForm';
import { ModalButtonsDiv } from '../../../SharedComponents/Search/modal/Modal.style';
import { auth, onAuthStateChanged } from '../../../../firebase';
import { login, logout } from '../../../../slices/authReducer';
import { useNavigate } from 'react-router-dom';

export type InputType = 'title' | 'description';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
}

function CreateTaskForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { userName } = useSelector(
    (state: AppState) => state.authReducer
  );

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            userEmail: userAuth.email,
            // @ts-ignore
            userId: userAuth.uid,
            // @ts-ignore
            tokenId: userAuth.accessToken,
            userName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
        navigate('/login');
      }
    });
  }, );

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  return (
    <>
      <DivTaskForm>
        <b>Hellow {userName}, it is your tasks:</b>
        <ModalButtonsDiv>
          <ButtonTaskForm
            type='button'
            category='new_task'
            onClick={openEditModal}
          >
            Create a new task
          </ButtonTaskForm>
        </ModalButtonsDiv>
      </DivTaskForm>

      <EditTaskForm setIsEditOpen={setIsEditOpen} isEditOpen={isEditOpen} />
    </>
  );
}

export default CreateTaskForm;
