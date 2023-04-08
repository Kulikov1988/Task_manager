import { useEffect } from 'react';
import { DateTimePicker } from '@mantine/dates';
import { useDispatch } from 'react-redux';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { getDayTasks } from '../../../../../slices/tasksReducer';
import TasksDay from './../../../TasksDay';
import { Formik } from 'formik';

const MyDay = ({ setDayTask, dayTask }) => {
  const dispatch = useDispatch<ThunkDispatch<void, {}, AnyAction>>();

  const dayWithTasks = String(dayTask.getDate()).padStart(2, '0');
  const monthWithTasks = String(dayTask.getMonth() + 1).padStart(2, '0');
  const yearWithTasks = dayTask.getFullYear();
  const dateWithTasks = `${monthWithTasks}-${dayWithTasks}-${yearWithTasks}`;

  const offset = dayTask.getTimezoneOffset();

  useEffect(() => {
    dispatch(getDayTasks({ offset, dateWithTasks }));
  }, [dayTask, dateWithTasks, offset, dispatch]);

  console.log(dayTask);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          defaultValue: new Date(dayTask),
        }}
        onSubmit={() => {}}
      >
        <>
          <DateTimePicker
            defaultValue={new Date(dayTask)}
            getDayProps={(date) => ({ onClick: () => setDayTask(date) })}
            label='Pick date and time'
            placeholder='Pick date and time'
            maw={400}
            mx='auto'
          />
          <TasksDay dayTask={dayTask} />
        </>
      </Formik>
    </>
  );
};

export default MyDay;
