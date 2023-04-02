import MyDay from '../MyDay/MyDay';
import MyMonth from '../MyMonth/MyMonth';
import { CalendarDiv } from './MyCalendar.style';
import { useState, useEffect } from 'react';
import { getDatesTask } from './../../../../../slices/tasksReducer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../store';

const MyCalendar = () => {
  const dispatch = useDispatch<ThunkDispatch<void, {}, AnyAction>>();

  const [dayTask, setDayTask] = useState(new Date());

  const { dates } = useSelector((state: AppState) => state.taskReducer);

  useEffect(() => {
    dispatch(getDatesTask());
  }, []);

  const getTasks = () => {
    dispatch(getDatesTask());
  };

  return (
    <>
      <CalendarDiv>
        <MyMonth dayTask={dayTask} setDayTask={setDayTask} dates={dates} />
        <MyDay setDayTask={setDayTask} dayTask={dayTask} />
      </CalendarDiv>
      <button onClick={getTasks}>Get Tasks</button>
    </>
  );
};

export default MyCalendar;
