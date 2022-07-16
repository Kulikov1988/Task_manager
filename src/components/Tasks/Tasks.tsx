import { useEffect, useState } from 'react';
import Task from './component/Task';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store';
import * as S from './component/Task.style';
import CreateTaskForm from './component/components/CreateTaskForm';
import { DivTaskForm } from './component/components/TaskForm.style';
import Search from '../SharedComponents/Search/Search';
import { onAuthStateChanged, auth } from '../../firebase';
import { login, logout } from '../../slices/authReducer';

function Tasks(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { tasks } = useSelector((state: AppState) => state.taskReducer);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            userEmail: userAuth.email,
            // @ts-ignore
            userId: userAuth.uid,
            // @ts-ignore
            tokenId: userAuth.accessToken,
            userName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
        navigate('/login');
      }
    });
  }, );

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <S.TaskForm>
      <CreateTaskForm />
      <DivTaskForm>
        <Search setSearch={setSearch} search={search} />
      </DivTaskForm>
      {filteredTasks.map(({ title, description, date, id }, index) => (
        <Task
          key={index}
          title={title}
          description={description}
          date={date}
          id={id}
        />
      ))}
    </S.TaskForm>
  );
}

export default Tasks;
