import { handleInputChangeProps } from '../TaskForm';
import React, { useState } from 'react';
import { InputTaskForm, EditFormStyle } from '../TaskForm.style';
import { useDispatch } from 'react-redux';
import { editDescription } from '../../../../../slices/tasksReducer';
import Modal from '../../../../SharedComponents/Search/modal/Modal';
import { ErrorDivForm } from './../TaskForm.style';

interface EditTaskFormProps {
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditOpen: boolean;
  title: string;
  description: string;
  id: number;
}

function EditTaskForm({
  setIsEditOpen,
  isEditOpen,
  title,
  description,
  id,
}: EditTaskFormProps) {
  const dispatch = useDispatch();

  const [editTitle, setEditTitle] = useState<string>(title);
  const [editDescriptionLocal, setEditDescriptionLocal] =
    useState<string>(description);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = ({ e, type }: handleInputChangeProps) => {
    if (type === 'title') {
      setEditTitle(e.target.value);
    } else {
      setEditDescriptionLocal(e.target.value);
    }
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const editTaskOnclick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (editTitle !== '' && editDescriptionLocal !== '') {
      dispatch(
        editDescription({
          title: editTitle,
          description: editDescriptionLocal,
          id,
        })
      );
      setIsEditOpen(false);
    } else {
      setErrorMessage('Task and description field are required');
    }
  };

  return (
    <>
      <Modal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title={title}
        onCancel={closeEditModal}
        onSubmit={editTaskOnclick}
      >
        <EditFormStyle>
          <InputTaskForm
            value={editTitle}
            onChange={(e) => handleInputChange({ e, type: 'title' })}
          ></InputTaskForm>
          <InputTaskForm
            onChange={(e) => handleInputChange({ e, type: 'description' })}
            value={editDescriptionLocal}
          ></InputTaskForm>
        </EditFormStyle>
        <br />

        <ErrorDivForm>{errorMessage}</ErrorDivForm>
      </Modal>
    </>
  );
}

export default EditTaskForm;
