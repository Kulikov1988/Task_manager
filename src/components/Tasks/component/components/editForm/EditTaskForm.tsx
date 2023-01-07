import React, { useEffect } from 'react';
import { EditFormStyle } from '../TaskForm.style';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   editDescription,
//   createTask,
// } from '../../../../../slices/tasksReducer';
import Modal from '../../../../SharedComponents/Search/modal/Modal';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from '../../../../../sharedStyles/CustomInput/CustomInput';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import {
  createTask,
  resetCreateTask,
} from './../../../../../slices/tasksReducer';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../../../../store';

export const taskSchema = Yup.object().shape({
  title: Yup.string().required('required field'),
  description: Yup.string().required('required field'),
});

interface InitialValues {
  title: string;
  description: string;
  date: Date;
  id?: any;
}

interface HandleClickProps {
  values: any;
  formikHelpers: FormikHelpers<any>;
}

interface EditTaskFormProps {
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditOpen: boolean;
  title?: string;
  description?: string;
  id?: any;
  date?: Date;
}

function EditTaskForm({
  setIsEditOpen,
  isEditOpen,
  title,
  description,
  id,
  date,
}: EditTaskFormProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();

  const { status } = useSelector((state: AppState) => state.taskReducer);

  useEffect(() => {
    if (status === 'success') {
      closeEditModal();
      dispatch(resetCreateTask());
    }
  });

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const handleClick = (
    values: InitialValues,
    formikHelpers: FormikHelpers<InitialValues>
  ) => {
    dispatch(
      createTask({
        title: values.title,
        description: values.description,
        shortDescription: values.description,
        duration: 15,
        dueDate: values.date,
        status: 'UPCOMING',
      })
    );
    console.log({ values });
    formikHelpers.resetForm();
  };

 
  const initialValues = (): InitialValues => {
    if (id)
      return {
        description,
        date: new Date(date),
        title,
      };
    return {
      title: '',
      description: '',
      date: new Date(),
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
