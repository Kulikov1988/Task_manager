import React, { useEffect } from 'react';
import { EditFormStyle } from '../TaskForm.style';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../SharedComponents/Search/modal/Modal';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from '../../../../../sharedStyles/CustomInput/CustomInput';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import {
  createTask,
  editTask,
  fetchTasks,
  resetCreateTask,
  resetEditTask,
  TaskProps,
} from './../../../../../slices/tasksReducer';
import { AppState } from '../../../../../store';

export const taskSchema = Yup.object().shape({
  title: Yup.string().required('required field'),
  description: Yup.string().required('required field'),
});

interface InitialValues {
  title: string;
  description: string;
  shortDescription?: string;
  date: Date;
  duration: number;
  id?: any;
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
  
}: EditTaskFormProps) {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();

  const { status } = useSelector((state: AppState) => state.taskReducer);

  useEffect(() => {
    if (status === 'success') {
      closeEditModal();
      dispatch(resetCreateTask());
      dispatch(resetEditTask());
    }
  }, [status]);

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
          status: 'UPCOMING',
        })
      );
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
      console.log({ values });
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
        
      };
    return {
      title: '',
      description: '',
      shortDescription: '',
      date: new Date(),
      duration,
    };
  };

  return (
    <Formik
      initialValues={initialValues()}
      validationSchema={taskSchema}
      onSubmit={handleClick}
    >
      {({ submitForm, handleChange, values, setFieldValue, isValid }) => {
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
                />
              </EditFormStyle>
              <br /> Choose a date
              <DatePicker
                selected={values.date}
                locale='es'
                onChange={(date: Date) => setFieldValue('date', date)}
              />
            </Modal>
          </Form>
        );
      }}
    </Formik>
  );
}

export default EditTaskForm;
