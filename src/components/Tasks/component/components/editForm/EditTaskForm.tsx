import { handleInputChangeProps } from '../TaskForm';
import React, { useState } from 'react';
import { InputTaskForm, EditFormStyle } from '../TaskForm.style';
import { useDispatch } from 'react-redux';
import {
  editDescription,
  createTask,
} from '../../../../../slices/tasksReducer';
import Modal from '../../../../SharedComponents/Search/modal/Modal';
import { ErrorDivForm } from './../TaskForm.style';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface EditTaskFormProps {
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditOpen: boolean;
  title?: string;
  description?: string;
  id?: number;
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
  const [errorMessage, setErrorMessage] = useState('');
  const [startDate, setStartDate] = useState(date);

  const handleInputChange = ({ e, type }: handleInputChangeProps) => {
    if (type === 'title') {
      setLocalTitle(e.target.value);
    } else {
      setlocalDescription(e.target.value);
    }
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const isValidate = localTitle !== '' && localDescription !== '';

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isValidate) {
      dispatch(
        id
          ? editDescription({
              title: localTitle,
              description: localDescription,
              id,
              date: startDate,
            })
          : createTask({
              title: localTitle,
              date: startDate,
              description: localDescription,
            })
      );
      setIsEditOpen(false);
      setErrorMessage('');
    } else {
      setErrorMessage('Task and description field are required');
    }
    // if (
    //   localTitle !== undefined &&
    //   localDescription !== undefined &&
    //   id !== null
    // ) {
    //   dispatch(
    //     editDescription({
    //       title: localTitle,
    //       description: localDescription,
    //       id,
    //       date: startDate,
    //     })
    //   );
    //   setIsEditOpen(false);
    //   setErrorMessage('');
    //   } else if (localTitle !== undefined &&
    //     localDescription !== undefined &&
    //     id === null) {
    //       dispatch(
    //         createTask({
    //           title: localTitle,
    //           date: startDate,
    //           description : localDescription,
    //         })
    //       );
    //       setIsEditOpen(false);
    //       setErrorMessage('');
    // } else {
    //   setErrorMessage('Task and description field are required');
    // }
  };

  return (
    <>
      <Modal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title={title}
        onCancel={closeEditModal}
        onSubmit={handleSubmit}
        id={id}
      >
        <EditFormStyle>
          <InputTaskForm
            placeholder='Task name'
            value={localTitle}
            onChange={(e) => handleInputChange({ e, type: 'title' })}
          ></InputTaskForm>
          <InputTaskForm
            placeholder='Description'
            onChange={(e) => handleInputChange({ e, type: 'description' })}
            value={localDescription}
          ></InputTaskForm>
        </EditFormStyle>
        <br /> Choose a date
        <DatePicker
          selected={startDate}
          locale='es'
          onChange={(date: Date) => setStartDate(date)}
        />
        <ErrorDivForm>{errorMessage}</ErrorDivForm>
      </Modal>
    </>
  );
}

export default EditTaskForm;
