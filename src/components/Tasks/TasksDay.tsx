import { useEffect } from 'react';
import Task from './component/Task';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import * as S from './component/Task.style';
import CreateTaskForm from './component/components/CreateTaskForm';
// import Avatar from '@mui/material/Avatar';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { fetchTasks } from '../../slices/tasksReducer';

function TasksDay(dayTask) {
  const dispatch = useDispatch<ThunkDispatch<void, {}, AnyAction>>();

  const { tasks } = useSelector((state: AppState) => state.taskReducer);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <S.TaskForm>
      <CreateTaskForm />

      {tasks.map(
        (
          {
            title,
            description,
            dueDate,
            id,
            duration,
            shortDescription,
            status,
          },
          index
        ) => (
          <Task
            key={index}
            title={title}
            description={description}
            dueDate={dueDate}
            id={id}
            duration={duration}
            shortDescription={shortDescription}
            status={status}
          />
        )
      )}
    </S.TaskForm>
  );
}

export default TasksDay;
