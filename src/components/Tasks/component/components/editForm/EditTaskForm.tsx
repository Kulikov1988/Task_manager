import React from 'react';
import { EditFormStyle } from '../TaskForm.style';
import { useDispatch } from 'react-redux';
// import {
//   editDescription,
//   createTask,
// } from '../../../../../slices/tasksReducer';
import Modal from '../../../../SharedComponents/Search/modal/Modal';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers, useField } from 'formik';

import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from '../../../../../sharedStyles/CustomInput/CustomInput';

export const taskSchema = Yup.object().shape({
  title: Yup.string().required('required field'),
  description: Yup.string().required('required field'),
});

interface InitialValues {
  title: string;
  description: string;
  date: Date;
}

interface HandleClick {
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

interface UseFieldInput {
  fieldName: string;
}

function EditTaskForm({
  setIsEditOpen,
  isEditOpen,
  title,
  description,
  id,
  date,
}: EditTaskFormProps) {
  const dispatch = useDispatch();

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const handleClick = (
    values: InitialValues,
    formikHelpers: FormikHelpers<InitialValues>
  ) => {
    console.log({ values });
    formikHelpers.resetForm();
  };

  // const [meta] = useField();

  // const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   if (isValidate) {
  //     dispatch(
  //       id
  //         ? editDescription({
  //             title: localTitle,
  //             description: localDescription,
  //             id,
  //             date: startDate,
  //           })
  //         : createTask({
  //             title: localTitle,
  //             date: startDate,
  //             description: localDescription,
  //           })
  //     );
  //     setIsEditOpen(false);
  //   }
  // };

  const initialValues = (): InitialValues => {
    if (id)
      return {
        description,
        date,
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
      {({
        errors,
        touched,
        submitForm,
        handleChange,
        values,
        setFieldValue,
        isValid,
      }) => {
        return (
          <Form>
            <Modal
              isOpen={isEditOpen}
              setIsOpen={setIsEditOpen}
              // headerTitle={id ? 'Edit Task' : 'Create Task'}
              onCancel={closeEditModal}
              onSubmit={submitForm}
              id={id}
              isDisable={!isValid}
            >
              <EditFormStyle>
                <CustomInput
                  name='title'
                  label='title'
                  placeholder='Title'
                  onChange={handleChange}
                  error={errors.title}
                />
                <CustomInput
                  name='description'
                  label='descrpition'
                  placeholder='Description'
                  onChange={handleChange}
                  error={errors.description}
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
