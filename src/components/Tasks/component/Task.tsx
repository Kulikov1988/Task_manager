import React, { useState } from 'react';
import * as S from './Task.style';
import {
  ButtonTaskForm,
  DivTaskForm,
  InputTaskForm,
} from './components/TaskForm.style';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTask, editDescription } from '../../../slices/tasksReducer';
import Modal from '../../SharedComponents/Search/modal/Modal';
import EditModal from './../../SharedComponents/Search/modal/EditModal';

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
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsOpenEdit] = useState(false);
  const [title, setTitle] = useState<string>(props.title);
  const [description, setDescription] = useState<string>(props.description);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // const moveToEditForm = () => {
  //   navigate('/edit_task', {
  //     state: {
  //       description: props.description,
  //       id: props.id,
  //       title: props.title,
  //     },
  //   });
  // };

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const openEditModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpenEdit(true);
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

  const editTaskOnclick = ({
    description,
    e,
    id,
    setErrorMessage,
    title,
  }: HandleClickProps) => {
    e.preventDefault();
    if (title !== '' && description !== '') {
      dispatch(editDescription({ title, description, id }));
      setIsOpenEdit(false);
    } else {
      setErrorMessage('task and description field are required');
    }
  };

  const handleInputChange = ({ e, type }: handleInputChangeProps) => {
    if (type === 'title') {
      setTitle(e.target.value);
    } else {
      setDescription(e.target.value);
    }
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
            edit task
          </ButtonTaskForm>
          <ButtonTaskForm onClick={openModal} category='delete_task'>
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
        <EditModal
          setIsOpen={setIsOpenEdit}
          isOpen={isOpen}
          onCancel={closeModal}
          // onSubmit={editTaskOnclick}
          description={description}
          title={title}
          id={props.id}
          setErrorMessage={setErrorMessage}
        >
          <InputTaskForm
            value={title}
            // onChange={(e) => handleInputChange({ e, type: 'title' })}
          ></InputTaskForm>
          <InputTaskForm
            // onChange={(e) => handleInputChange({ e, type: 'description' })}
            value={description}
          ></InputTaskForm>
          <DivTaskForm>{errorMessage}</DivTaskForm>
        </EditModal>
      </S.TaskDiv>
    </>
  );
}

export default Task;
