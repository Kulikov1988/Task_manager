import React, { useEffect, useState } from 'react';
import { EditFormStyle } from '../Tasks/Task/TaskForm.style';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../SharedComponents/Search/Modal/Modal';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from '../../../../../sharedStyles/CustomInput/CustomInput';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import {
  createTask,
  editTask,
  getDatesTask,
  getDayTasks,
  resetCreateTask,
  resetEditTask,
} from '../../../../../slices/tasksReducer';
import { AppState } from '../../../../../store';
import { MantineProvider, Group, Button } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

export const taskSchema = Yup.object().shape({
  title: Yup.string().required('required field'),
  description: Yup.string().required('required field'),
  shortDescription: Yup.string().required('required field'),
  duration: Yup.number()
    .min(15, 'minimum 15 minut required')
    .required('required field'),
});

interface InitialValues {
  title: string;
  description: string;
  shortDescription?: string;
  date: Date;
  duration: number;
  id?: any;
  status?: 'UPCOMING' | 'DONE' | 'CANCELED';
}

interface EditTaskFormProps {
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditOpen: boolean;
  title?: string;
  description?: string;
  shortDescription?: string;
  status?: 'UPCOMING' | 'DONE' | 'CANCELED';
  id?: any;
  date?: Date;
  duration?: any;
  dayTask?: Date;
  offset?: number;
  dateWithTasks?: string;
}

function EditTaskForm({
  setIsEditOpen,
  isEditOpen,
  title,
  description,
  id,
  date,
  shortDescription,
  duration,
  status,
  dayTask,
  dateWithTasks,
  offset,
}: EditTaskFormProps) {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();

  const { status: reducerStatus } = useSelector(
    (state: AppState) => state.taskReducer
  );

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  useEffect(() => {
    if (reducerStatus === 'success') {
      closeEditModal();
      dispatch(resetCreateTask());
      dispatch(resetEditTask());
    }
  }, [reducerStatus, dispatch]);

  useEffect(() => {
    dispatch(getDayTasks({ offset, dateWithTasks }));
  }, [dispatch, title, description, shortDescription, date]);

  const handleClick = (
    values: InitialValues,
    formikHelpers: FormikHelpers<InitialValues>
  ) => {
    if (id) {
      dispatch(
        editTask({
          id: id,
          title: values.title,
          description: values.description,
          shortDescription: values.shortDescription,
          duration: values.duration,
          dueDate: values.date,
          status: values.status,
        })
      );
      formikHelpers.resetForm();
      console.log(values.date, 'edit');
    } else {
      dispatch(
        createTask({
          title: values.title,
          description: values.description,
          shortDescription: values.shortDescription,
          duration: values.duration,
          dueDate: values.date,
          status: 'UPCOMING',
        })
      );
      formikHelpers.resetForm();
      console.log(values.date, 'create');
    }
  };

  const initialValues = (): InitialValues => {
    return id
      ? {
          description,
          shortDescription,
          date: new Date(date),
          title,
          duration,
          status,
        }
      : {
          title: '',
          description: '',
          shortDescription: '',
          date: new Date(dayTask),
          duration: 15,
          status: 'UPCOMING',
        };
  };

  return (
    <MantineProvider withNormalizeCSS>
      <Formik
        initialValues={initialValues()}
        validationSchema={taskSchema}
        onSubmit={handleClick}
      >
        {({ submitForm, values, setFieldValue, isValid }) => {
          return (
            <Form>
              <Modal
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
                onCancel={closeEditModal}
                onSubmit={submitForm}
                id={id}
                isDisable={!isValid}
              >
                <EditFormStyle>
                  <CustomInput
                    value={values.title}
                    name='title'
                    label='title'
                    placeholder='Title'
                  />
                  <CustomInput
                    value={values.description}
                    name='description'
                    label='descrpition'
                    placeholder='Description'
                  />
                  <CustomInput
                    value={values.shortDescription}
                    name='shortDescription'
                    label='shortDescription'
                    placeholder='Short Description'
                  />
                  <CustomInput
                    value={values.duration}
                    name='duration'
                    label='duration'
                    placeholder='Duration'
                    type='number'
                  />
                  <div>Status of task: {values.status}</div>
                </EditFormStyle>
                <Group position='center'>
                  <Button
                    color='grape'
                    variant='filled'
                    onClick={() => setFieldValue('status', 'DONE')}
                  >
                    Done
                  </Button>
                  <Button
                    variant='light'
                    onClick={() => setFieldValue('status', 'UPCOMING')}
                  >
                    Upcoming
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() => setFieldValue('status', 'CANCELED')}
                  >
                    Canceled
                  </Button>
                </Group>
                <br /> Pick date and time
                <DateTimePicker
                  dropdownType='modal'
                  defaultValue={dayTask ? dayTask : new Date(date)}
                  placeholder='Pick date and time'
                  maw={400}
                  mx='auto'
                  onChange={(date: Date) => setFieldValue('date', date)}
                />
              </Modal>
            </Form>
          );
        }}
      </Formik>
    </MantineProvider>
  );
}

export default EditTaskForm;
