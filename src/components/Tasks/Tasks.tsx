import React, { useEffect } from 'react';
import Task from './component/Task';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store';
import * as S from './component/Task.style';
import TaskForm from './component/components/TaskForm';

function Tasks() {
  const navigate = useNavigate();

  const { isAuth } = useSelector((state: AppState) => state.authReducer);

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
          <TaskForm />
          {tasks.map(({ title, description, date, id }, index) => (
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
