import React, { useEffect, useState } from 'react';
import * as S from './Task.style';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../../SharedComponents/Search/Modal/Modal';
import EditTaskForm from '../../EditForm/EditTaskForm';
import { format } from 'date-fns';
import {
  deleteTask,
  getDatesTask,
  getDayTasks,
} from '../../../../../../slices/tasksReducer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TaskProps } from '../../../../../../slices/tasksReducer';
import MyLogo from '../../../../../../assets/images/delete.png';
import ReactLogo from '../../../../../../assets/images/edit.png';
import { ImgDiv } from '../../../../../../sharedStyles/sharedStyles.style';
import { AppState } from '../../../../../../store';

export type InputType = 'title' | 'description';

export interface handleInputChangeProps {
  title: string;
  description: string;
  id: any;
  date: Date;
}

const Task = ({
  title,
  description,
  id,
  dueDate,
  shortDescription,
  duration,
  status,
  dateWithTasks,
  offset,
}: TaskProps) => {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { status: reducerStatus } = useSelector(
    (state: AppState) => state.taskReducer
  );

  useEffect(() => {
    if (reducerStatus === 'success') {
      dispatch(getDayTasks({ dateWithTasks, offset }));
      dispatch(getDatesTask())
    }
  }, [reducerStatus, dispatch, offset, dateWithTasks]);

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

  return id ? (
    <S.TaskDiv>
      <S.TaskItem>
        <div>
          <b>Title of Task:</b> <S.TaskSpan> {title}</S.TaskSpan>
        </div>
        <S.TaskSpan>
          <b>Description: </b>
          {description}
        </S.TaskSpan>
        <div>
          Short description: <S.TaskSpan> {shortDescription}</S.TaskSpan>
        </div>
        <div>
          Duration: <S.TaskSpan> {duration}</S.TaskSpan>
        </div>
        <div>
          Status of Task: <S.TaskSpan> {status}</S.TaskSpan>
        </div>
        <div>{format(new Date(dueDate), 'dd-MM-yyyy')}</div>
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
  ) : (
    <></>
  );
};

export default Task;
