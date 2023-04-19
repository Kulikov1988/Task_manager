import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { getDayTasks } from '../../../../../slices/tasksReducer';
import TasksDay from '../Tasks/Task/TasksDay';
import { Formik } from 'formik';
import { Button } from '@mantine/core';

const MyDay = ({ setDayTask, dayTask }) => {
  const dispatch = useDispatch<ThunkDispatch<void, {}, AnyAction>>();

  const dayWithTasks = String(dayTask.getDate()).padStart(2, '0');
  const monthWithTasks = String(dayTask.getMonth() + 1).padStart(2, '0');
  const yearWithTasks = dayTask.getFullYear();
  const dateWithTasks = `${monthWithTasks}-${dayWithTasks}-${yearWithTasks}`;

  const offset = dayTask.getTimezoneOffset();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  useEffect(() => {
    dispatch(getDayTasks({ offset, dateWithTasks }));
  }, [dayTask, dateWithTasks, offset, dispatch]);

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
          <Button color='indigo' variant={'filled'} onClick={openEditModal}>
            Create a new task
          </Button>
       <TasksDay
          dayTask={dayTask}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          offset={offset}
          dateWithTasks={dateWithTasks}
       />
        </>
      </Formik>
    </>
  );
};

export default MyDay;
