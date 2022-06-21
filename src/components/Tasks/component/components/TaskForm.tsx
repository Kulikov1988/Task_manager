import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../../../slices/tasksReducer';
import { AppState } from '../../../../store';
import { useNavigate } from 'react-router-dom';
import {
  ButtonTaskForm,
  InputTaskForm,
  DivTaskForm,
  ErrorDivForm,
} from './TaskForm.style';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import EditTaskForm from './editForm/EditTaskForm';

export type InputType = 'title' | 'description';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
}

function TaskForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [startDate, setStartDate] = useState(new Date());
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { userName, isAuth } = useSelector(
    (state: AppState) => state.authReducer
  );

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  });

  const handleInputChange = ({ e, type }: handleInputChangeProps) => {
    if (type === 'title') {
      setTitle(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title !== '' && description !== '') {
      dispatch(
        createTask({
          title: title,
          date: startDate,
          description,
        })
      );
      setErrorMessage('');
      setTitle('');
      setDescription('');
    } else {
      return setErrorMessage('Title and task inputs are reqiured');
    }
  };

  const openEditModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditOpen(true);
  };

  return (
    <>
      <DivTaskForm>
        <b>Hello {userName}, it is your tasks:</b>
      </DivTaskForm>
      {/* <DivTaskForm>Add new task:</DivTaskForm> */}
      <DivTaskForm>
        {/* <InputTaskForm
          type='text'
          value={title}
          placeholder={'title'}
          onChange={(e) => handleInputChange({ e, type: 'title' })}
        />
        <InputTaskForm
          type='text'
          value={description}
          placeholder={'your task'}
          onChange={(e) => handleInputChange({ e, type: 'description' })}
        /> */}
        {/* <DivTaskForm>
          Choose a date to end your task
          <DatePicker
            selected={startDate}
            locale='es'
            onChange={(date: Date) => setStartDate(date)}
          />
        </DivTaskForm> */}
        <ButtonTaskForm category='new_task' onClick={openEditModal}>
          Create a new task
        </ButtonTaskForm>
      </DivTaskForm>
      <EditTaskForm
        setIsEditOpen={setIsEditOpen}
        isEditOpen={isEditOpen}
        date={startDate}
      />
      <ErrorDivForm>{errorMessage}</ErrorDivForm>
    </>
  );
}

export default TaskForm;
