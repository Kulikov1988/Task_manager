import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';


const Task = () => {
  const { userName , isAuth } = useSelector(
    (state: AppState) => state.loginReducer
  );

  console.log(isAuth);

  return (
    <>
      <div>Task</div>
      <div>{userName}</div>
    </>
  );
};

export default Task;
