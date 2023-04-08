import React, { useEffect } from 'react';
import { EditFormStyle } from '../TaskForm.style';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../SharedComponents/Search/modal/Modal';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from '../../../../../sharedStyles/CustomInput/CustomInput';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import {
  createTask,
  editTask,
  resetCreateTask,
  resetEditTask,
} from './../../../../../slices/tasksReducer';
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
}: EditTaskFormProps) {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();

  const { status: reducerStatus } = useSelector(
    (state: AppState) => state.taskReducer
  );

  useEffect(() => {
    if (reducerStatus === 'success') {
      closeEditModal();
      dispatch(resetCreateTask());
      dispatch(resetEditTask());
    }
  }, [reducerStatus]);

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

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
      console.log(status);
      formikHelpers.resetForm();
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
    }
  };

  const initialValues = (): InitialValues => {
    if (id)
      return {
        description,
        shortDescription,
        date: new Date(date),
        title,
        duration,
        status,
      };
    return {
      title: '',
      description: '',
      shortDescription: '',
      date: new Date(),
      duration: 15,
      status: 'UPCOMING',
    };
  };

  return (
    <MantineProvider
      // withGlobalStyles
      withNormalizeCSS
    >
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
                  <CustomInput name='title' label='title' placeholder='Title' />
                  <CustomInput
                    name='description'
                    label='descrpition'
                    placeholder='Description'
                  />
                  <CustomInput
                    name='shortDescription'
                    label='shortDescription'
                    placeholder='Short Description'
                  />
                  <CustomInput
                    name='duration'
                    label='duration'
                    placeholder='Duration'
                    type='number'
                  />
                  <div>Status of task: {status}</div>
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
                {/* <DatePicker
                  selected={values.date}
                  locale='es'
                  onChange={(date: Date) => setFieldValue('date', date)}
                /> */}
                <DateTimePicker
                  dropdownType='modal'
                  // label='Pick date and time'
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
