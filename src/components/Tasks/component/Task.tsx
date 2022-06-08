import React, { useState } from 'react';
import * as S from './Task.style';
import { ButtonTaskForm } from './components/TaskForm.style';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../slices/tasksReducer';
import Modal from '../../SharedComponents/Search/modal/Modal';

export type InputType = 'title' | 'task';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
  title: string;
  description: string;
  id: number;
  key: number;
  date: Date;
}

function Task(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const moveToEditForm = () => {
    navigate('/edit_task', {
      state: {
        description: props.description,
        id: props.id,
        title: props.title,
      },
    });
  };

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteTaskOnClick = () => {
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
          <ButtonTaskForm onClick={moveToEditForm} category='edit_task'>
            edit task
          </ButtonTaskForm>
          <ButtonTaskForm
            onClick={openModal}
            category='delete_task'
          >
            delete task
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
      </S.TaskDiv>
    </>
  );
}

export default Task;
