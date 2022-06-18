import React, { useState } from 'react';
import * as S from './Task.style';
import { ButtonTaskForm } from './components/TaskForm.style';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../slices/tasksReducer';
import Modal from '../../SharedComponents/Search/modal/Modal';
import EditTaskForm from './components/editForm/EditTaskForm';

export type InputType = 'title' | 'description';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
  title: string;
  description: string;
  id: number;
  key: number;
  date: Date;
}

export interface HandleClickProps {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  title: string;
  description: string;
  id: number;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

function Task(props) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  // const [title, setTitle] = useState<string>(props.title);
  // const [description, setDescription] = useState<string>(props.description);
  // const [errorMessage, setErrorMessage] = useState<string>('');

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const openEditModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteTaskOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(deleteTask({ id: props.id }));
    setIsOpen(false);
  };

  return (
    <>
      <S.TaskDiv>
        <S.TaskItem>
          <S.TaskSpan>
            {props.title} <> </>
          </S.TaskSpan>
          <S.TaskSpan>
            {props.description} <> </>
          </S.TaskSpan>
          <S.TaskSpan>{props.date.toLocaleString()}</S.TaskSpan>
        </S.TaskItem>
        <S.TaskItemButtons>
          <ButtonTaskForm onClick={openEditModal} category='edit_task'>
            Edit task
          </ButtonTaskForm>
          <ButtonTaskForm onClick={openModal} category='delete_task'>
            Delete task
          </ButtonTaskForm>
        </S.TaskItemButtons>
        <Modal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          onCancel={closeModal}
          onSubmit={deleteTaskOnClick}
          title={props.title}
        >
          Are you sure?
        </Modal>
        <EditTaskForm
          setIsEditOpen={setIsEditOpen}
          isEditOpen={isEditOpen}
          title={props.title}
          description={props.description}
          id={props.id}
        />
      </S.TaskDiv>
    </>
  );
}

export default Task;
