import { handleInputChangeProps } from '../TaskForm';
import React, { useState } from 'react';
import {
  InputTaskForm,
  EditFormStyle,
  DivTaskForm,
} from '../TaskForm.style';
import { useDispatch } from 'react-redux';
import { editDescription } from '../../../../../slices/tasksReducer';
import { HandleClickProps } from '../../Task';
import Modal from '../../../../SharedComponents/Search/modal/Modal';

function EditTaskForm(props) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>(props.title);
  const [description, setDescription] = useState<string>(props.description);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = ({ e, type }: handleInputChangeProps) => {
    if (type === 'title') {
      setTitle(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const closeEditModal = () => {
    props.setIsEditOpen(false);
  };

  const editTaskOnclick = ({
    description,
    e,
    id,
    setErrorMessage,
    title,
    
  }: HandleClickProps) => {
    e.preventDefault();
    if (props.title !== '' && props.description !== '') {
      dispatch(editDescription({ title, description, id }));
      props.setIsEditOpen(false);
    } else {
      setErrorMessage('task and description field are required');
    }
  };

  return (
    <>
      <Modal
        isOpen={props.isEditOpen}
        setIsOpen={props.setIsEditOpen}
        title={props.title}
        onCancel={closeEditModal}
        onSubmit={(e)=> editTaskOnclick({ description, e, id: props.id, setErrorMessage, title, })}
      >
        <EditFormStyle>
          <InputTaskForm
            value={title}
            onChange={(e) => handleInputChange({ e, type: 'title' })}
          ></InputTaskForm>
          <InputTaskForm
            onChange={(e) => handleInputChange({ e, type: 'description' })}
            value={description}
          ></InputTaskForm>
        </EditFormStyle>
        <br />

        <DivTaskForm>{errorMessage}</DivTaskForm>
      </Modal>
    </>
  );
}

export default EditTaskForm;
