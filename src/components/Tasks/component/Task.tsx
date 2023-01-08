import React, { useState } from 'react';
import * as S from './Task.style';
import { ButtonTaskForm } from './components/TaskForm.style';
import { useDispatch } from 'react-redux';
import Modal from '../../SharedComponents/Search/modal/Modal';
import EditTaskForm from './components/editForm/EditTaskForm';
import { format } from 'date-fns';
import { deleteTask } from '../../../slices/tasksReducer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TaskProps } from './../../../slices/tasksReducer';

export type InputType = 'title' | 'description';

export interface handleInputChangeProps {
  title: string;
  description: string;
  id: any;
  date: Date;
}

function Task({
  title,
  description,
  id,
  dueDate,
  shortDescription,
  duration,
  status,
}: TaskProps) {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteTaskOnClick = () => {
    dispatch(deleteTask(id));
    setIsOpen(false);
  };

  return (
    <S.TaskDiv>
      <div>
        <img src='/src/assets/images/logo1.png' alt='' />
      </div>
      <S.TaskItem>
        <S.TaskSpan>{title}</S.TaskSpan>
        <S.TaskSpan>{description}</S.TaskSpan>
        <S.TaskSpan>{shortDescription}</S.TaskSpan>
        <S.TaskSpan>{format(new Date(dueDate), 'dd/MM/yyyy')}</S.TaskSpan>
      </S.TaskItem>
      <S.TaskItemButtons>
        <ButtonTaskForm
          type='button'
          onClick={openEditModal}
          category='edit_task'
        >
          Edit task
        </ButtonTaskForm>
        <ButtonTaskForm
          type='button'
          onClick={openModal}
          category='delete_task'
        >
          Delete task
        </ButtonTaskForm>
      </S.TaskItemButtons>
      <Modal
        id={id}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onCancel={closeModal}
        onSubmit={deleteTaskOnClick}
        headerTitle='Delete Task'
      >
        Are you sure?
      </Modal>
      <EditTaskForm
        setIsEditOpen={setIsEditOpen}
        isEditOpen={isEditOpen}
        title={title}
        description={description}
        shortDescription={shortDescription}
        status={status}
        id={id}
        date={dueDate}
      />
    </S.TaskDiv>
  );
}

export default Task;
