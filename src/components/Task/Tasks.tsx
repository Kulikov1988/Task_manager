import React, { useEffect } from 'react';
import Task from './component/Task';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store';
import * as S from './component/Task.style';

// export const tasks = [
//   {
//     title: 'Task1',
//     date: new Date().toLocaleString(),
//     task: 'do the first task today!',
//   },
//   {
//     title: 'Task2',
//     date: new Date().toLocaleString(),
//     task: 'second task',
//   },
//   {
//     title: 'Task3',
//     date: new Date().toLocaleString(),
//     task: 'third task',
//   },
//   {
//     title: 'Task4',
//     date: new Date().toLocaleString(),
//     task: 'one more task',
//   },
//   {
//     title: 'Task5',
//     date: new Date().toLocaleString(),
//     task: 'last task',
//   },
//   {
//     title: 'Task6',
//     date: new Date().toLocaleString(),
//     task: 'the last task',
//   },
// ];


function Tasks() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userName, isAuth } = useSelector(
    (state: AppState) => state.authReducer
  );

  const { tasks } = useSelector((state: AppState) => state.taskReducer);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  });

  return (
    <>
      <S.Task>
        <S.TaskForm>
          <div>{userName}</div>
          <div>Create a new task</div>
          <span>Title:</span>

          {tasks.map(({ title, task, date }) => (
            <Task title={title} task={task} date={date} />
          ))}
        </S.TaskForm>
      </S.Task>
    </>
  );
}

export default Tasks;
