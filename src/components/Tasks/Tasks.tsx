import { useEffect, useState } from 'react';
import Task from './component/Task';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import * as S from './component/Task.style';
import CreateTaskForm from './component/components/CreateTaskForm';
import { DivTaskForm } from './component/components/TaskForm.style';
import Search from '../SharedComponents/Search/Search';
// import Avatar from '@mui/material/Avatar';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { fetchTasks } from '../../slices/tasksReducer';

function Tasks(props) {
  const dispatch = useDispatch<ThunkDispatch<void, {}, AnyAction>>();
  const [search, setSearch] = useState('');

  const { tasks } = useSelector((state: AppState) => state.taskReducer);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      task.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  });

  return (
    <S.TaskForm>
      <CreateTaskForm />
      <DivTaskForm>
        <Search setSearch={setSearch} search={search} />
      </DivTaskForm>
      {filteredTasks.map(({ title, description, dueDate, id, duration, shortDescription, status }, index) => (
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
      ))}
    </S.TaskForm>
  );
}

export default Tasks;
