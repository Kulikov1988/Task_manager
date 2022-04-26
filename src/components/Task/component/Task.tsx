import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { tasks } from './../Tasks';
import * as S from './Task.style';
import { Input } from './../../../sharedStyles/sharedStyles.style';
import { createTask } from '../../../slices/tasksReducer';

export type InputType = 'title' | 'task';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
}

function Task() {
  const [title, setTitle] = useState<string>('');
  const [task, setTask] = useState<string>('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
      setTask(e.target.value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      createTask({
        title,
        task,
      })
    );
  };


  const getTasks = (e: React.MouseEvent<HTMLButtonElement>) => {
    tasks.map(({ title, date, task }) => (
      <p key={title}>
        title: {title}', date: {date}
        task: {task}{' '}
      </p>
    ));
  };

  return (
    <>
      <div>{userName}</div>
      <S.Task>
        <S.TaskForm>
          <div>Cretate a new task</div>
          <span>Title:</span>
          <Input
            onChange={(e) => {
              handleInputChange({ e, type: 'title' });
            }}
            type='text'
            placeholder='title'
          />
          <span>the task:</span>
          <Input
            onChange={(e) => {
              handleInputChange({ e, type: 'task' });
            }}
            type='text'
            placeholder='task'
          />
          <button onClick={handleClick}>add task</button>
          {tasks.map(({ title, date, task }) => (
            <S.TaskDiv key={title}>
              <S.TasksSpan>
                <input type='checkbox' /> {title}
              </S.TasksSpan>
              <S.TasksSpan>{date}</S.TasksSpan>
              <S.TaskSpan>{task}</S.TaskSpan>
            </S.TaskDiv>
          ))}
                  </S.TaskForm>
        {/* <S.TaskForm>
          {tasks.map(({ date }) => (
            <S.TaskDiv key={date}>{date} </S.TaskDiv>
          ))}
        </S.TaskForm>
        <S.TaskForm>
          {tasks.map(({ task }) => (
            <S.TaskDiv key={task}> {task} </S.TaskDiv>
          ))}
        </S.TaskForm> */}
      </S.Task>
    </>
  );
}

export default Task;
