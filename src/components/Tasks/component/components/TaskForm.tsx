import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store';
import { useNavigate } from 'react-router-dom';
import { ButtonTaskForm, DivTaskForm, EditFormStyle } from './TaskForm.style';
import EditTaskForm from './editForm/EditTaskForm';

export type InputType = 'title' | 'description';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
}

function TaskForm() {
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

  const openEditModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditOpen(true);
  };

  return (
    <>
      <EditFormStyle>
        <DivTaskForm>
          <b>Hello {userName}, it is your tasks:</b>
        </DivTaskForm>
        <DivTaskForm>
          <ButtonTaskForm category='new_task' onClick={openEditModal}>
            Create a new task
          </ButtonTaskForm>
        </DivTaskForm>
        <EditTaskForm setIsEditOpen={setIsEditOpen} isEditOpen={isEditOpen} />
      </EditFormStyle>
    </>
  );
}

export default TaskForm;
