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

import 'react-datepicker/dist/react-datepicker.css';

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
    
      <Modal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        headerTitle={id ? 'Edit Task' : 'Create Task'}
        onCancel={closeEditModal}
        // onSubmit={handleSubmit}
        id={id}
        isDisable={!isValidate}
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
      </Modal>
    
  );
}

export default EditTaskForm;
