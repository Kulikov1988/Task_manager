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
import { useNavigate } from 'react-router-dom';

export type InputType = 'title' | 'description';

export interface handleInputChangeProps {
  title: string;
  description: string;
  id: any;
  date: Date;
}

function TaskDescription({
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
  const navigate = useNavigate();

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

  const fullTaskDescription = () => {
    // navigate()
  }

  return (
    <S.TaskDiv >
      <S.TaskItem>
        <S.TaskSpan>
          <b>Title of Task:</b> {title}
        </S.TaskSpan>

        <div>Short description: {shortDescription}</div>
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
