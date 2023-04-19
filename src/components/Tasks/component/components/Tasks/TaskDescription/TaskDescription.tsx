import React, { useState } from 'react';
import * as S from '../Task/Task.style';
import { useDispatch } from 'react-redux';
import Modal from '../../../../../SharedComponents/Search/Modal/Modal';
import EditTaskForm from '../../EditForm/EditTaskForm';
import { deleteTask } from '../../../../../../slices/tasksReducer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TaskProps } from '../../../../../../slices/tasksReducer';
import MyLogo from '../../../../../../assets/images/delete.png';
import ReactLogo from '../../../../../../assets/images/edit.png';
import { ImgDiv } from '../../../../../../sharedStyles/sharedStyles.style';

export type InputType = 'title' | 'description';

export interface handleInputChangeProps {
  title: string;
  description: string;
  id: any;
  date: Date;
}

interface TaskDescriptionProps extends TaskProps {
  setTask: React.Dispatch<React.SetStateAction<TaskProps>> 
}

const TaskDescription = ( {
  title,
  description,
  id,
  dueDate,
  shortDescription,
  duration,
  status,
  setTask
}: TaskDescriptionProps)  => {
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
    <S.TaskDiv onClick={() => setTask({title,
      description,
      id,
      dueDate,
      shortDescription,
      duration,
      status,})} >
      <S.TaskItem>
        <div>
          <b>Title of Task:</b>
          <S.TaskSpan> {title}</S.TaskSpan>
        </div>

        <div>
          Short description: <S.TaskSpan>{shortDescription}</S.TaskSpan>{' '}
        </div>
      </S.TaskItem>
      <S.TaskSpan>
        <ImgDiv src={ReactLogo} alt='' onClick={openEditModal} />
        <ImgDiv src={MyLogo} alt='' onClick={openModal} />
      </S.TaskSpan>
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
        duration={duration}
      />
    </S.TaskDiv>
  );
}

export default TaskDescription;
