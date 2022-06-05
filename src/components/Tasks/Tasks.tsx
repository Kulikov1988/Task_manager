import React, { useEffect, useState } from 'react';
import Task from './component/Task';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store';
import * as S from './component/Task.style';
import TaskForm from './component/components/TaskForm';
import { DivTaskForm } from './component/components/TaskForm.style';
import Search from '../SharedComponents/Search/Search';
import Modal from './component/components/modal/Modal';

function Tasks(props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
          <DivTaskForm>
            <Search setSearch={setSearch} />
          </DivTaskForm>
          <TaskForm />
<button onClick={(e)=> {e.preventDefault(); 
              setIsOpen(true);}}>Open</button>
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
        <S.TaskForm>
          <DivTaskForm>
            <Modal setIsOpen={setIsOpen} isOpen={isOpen} />
          </DivTaskForm>
        </S.TaskForm>
      </S.Task>
    </>
  );
}

export default Tasks;
