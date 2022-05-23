import React, { useEffect, useState } from 'react';
import Task from './component/Task';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store';
import * as S from './component/Task.style';
import TaskForm from './component/components/TaskForm';

function Tasks() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { isAuth } = useSelector((state: AppState) => state.authReducer);

  const { tasks } = useSelector((state: AppState) => state.taskReducer);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  });

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <S.Task>
        <S.TaskForm>
          <S.TaskInput
            placeholder='search corrent task'
            onChange={(e) => setSearch(e.target.value)}
          />
          <TaskForm />
          {filteredTasks.map(({ title, description, date, id }, index) => (
            <>
              <Task
                key={index}
                title={title}
                description={description}
                date={date}
                id={id}
              />
            </>
          ))}
        </S.TaskForm>
      </S.Task>
    </>
  );
}

export default Tasks;
