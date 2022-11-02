import { handleInputChangeProps } from '../CreateTaskForm';
import React, { useState } from 'react';
import { InputTaskForm, EditFormStyle } from '../TaskForm.style';
import { useDispatch } from 'react-redux';
// import {
//   editDescription,
//   createTask,
// } from '../../../../../slices/tasksReducer';
import Modal from '../../../../SharedComponents/Search/modal/Modal';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from '../../../../../sharedStyles/CustomInput/CustomInput';
import { Button } from './../../../../../sharedStyles/buttons.style';

export const taskSchema = Yup.object().shape({
  task: Yup.string().required('required field'),
  description: Yup.string().required('required field'),
});

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
  const dispatch = useDispatch();

  const [localTitle, setLocalTitle] = useState(title || '');
  const [localDescription, setlocalDescription] = useState(description || '');
  const [startDate, setStartDate] = useState(date);

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const handleClick = (values) => {
    console.log(values.title);
    console.log(values.description);
  };

  const isValidate = localTitle !== '' && localDescription !== '';

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

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        date: '',
      }}
      validationSchema={taskSchema}
      onSubmit={handleClick}
    >
      {({ errors, submitForm, handleChange }) => {
        return (
          <Form>
            <Modal
              isOpen={isEditOpen}
              setIsOpen={setIsEditOpen}
              headerTitle={id ? 'Edit Task' : 'Create Task'}
              onCancel={closeEditModal}
              onSubmit={submitForm}
              id={id}
              isDisable={!isValidate}
            >
              <EditFormStyle>
                <CustomInput
                  name='title'
                  label='title'
                  type='text'
                  placeholder='Title'
                  onChange={handleChange}
                  error={errors.title}
                />
                <CustomInput
                  name='description'
                  label='descrpition'
                  type='text'
                  placeholder='Description'
                  onChange={handleChange}
                  error={errors.description}
                />
              </EditFormStyle>
              <br /> Choose a date
              <DatePicker
                selected={startDate}
                locale='es'
                onChange={(date: Date) => setStartDate(date)}
              />
            </Modal>
          </Form>
        );
      }}
    </Formik>

    // <Modal
    //   isOpen={isEditOpen}
    //   setIsOpen={setIsEditOpen}
    //   headerTitle={id ? 'Edit Task' : 'Create Task'}
    //   onCancel={closeEditModal}
    //   // onSubmit={handleSubmit}
    //   id={id}
    //   isDisable={!isValidate}
    // >
    //   <EditFormStyle>
    //     <InputTaskForm
    //       placeholder='Task name'
    //       value={localTitle}
    //       onChange={(e) => handleInputChange({ e, type: 'title' })}
    //     ></InputTaskForm>
    //     <InputTaskForm
    //       placeholder='Description'
    //       onChange={(e) => handleInputChange({ e, type: 'description' })}
    //       value={localDescription}
    //     ></InputTaskForm>
    //   </EditFormStyle>
    //   <br /> Choose a date
    //   <DatePicker
    //     selected={startDate}
    //     locale='es'
    //     onChange={(date: Date) => setStartDate(date)}
    //   />
    // </Modal>
  );
}

export default EditTaskForm;
