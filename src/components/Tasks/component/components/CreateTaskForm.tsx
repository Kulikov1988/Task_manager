import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store';
import { useNavigate } from 'react-router-dom';
import { ButtonTaskForm, DivTaskForm } from './TaskForm.style';
import EditTaskForm from './editForm/EditTaskForm';
import { ModalButtonsDiv } from '../../../SharedComponents/Search/modal/Modal.style';

export type InputType = 'title' | 'description';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
}

function CreateTaskForm() {
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { userName, isAuth } = useSelector(
    (state: AppState) => state.authReducer
  );

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  });

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  return (
    <>
      <DivTaskForm>
        <b>Hello {userName}, it is your tasks:</b>
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
