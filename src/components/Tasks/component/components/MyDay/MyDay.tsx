import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { getDayTasks } from '../../../../../slices/tasksReducer';
import TasksDay from '../Tasks/Task/TasksDay';
import { Formik } from 'formik';
import { Button } from '@mantine/core';
import TaskDescription from '../Tasks/TaskDescription/TaskDescription';
import { AppState } from '../../../../../store';

const MyDay = ({ setDayTask, dayTask }) => {
  const dispatch = useDispatch<ThunkDispatch<void, {}, AnyAction>>();
  const { tasks } = useSelector((state: AppState) => state.taskReducer);


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
          <TaskDescription
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
          {/* <TasksDay
            dayTask={dayTask}
            isEditOpen={isEditOpen}
            setIsEditOpen={setIsEditOpen}
          /> */}
        </>
      </Formik>
    </>
  );
};

export default MyDay;
