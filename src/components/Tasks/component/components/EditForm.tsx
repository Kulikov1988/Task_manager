import { useLocation, useNavigate } from 'react-router-dom';
import { handleInputChangeProps } from './TaskForm';
import React, { useState } from 'react';
import { InputTaskForm, ButtonTaskForm } from './TaskForm.style';
import { useDispatch } from 'react-redux';
import { editDescription } from '../../../../slices/tasksReducer';

function EditTaskForm(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = location.state as {
    id: number;
    description: string;
    title: string;
  };

  const [title, setTitle] = useState<string>(state.title);
  const [description, setDescription] = useState<string>(state.description);

  const handleInputChange = ({ e, type }: handleInputChangeProps) => {
    if (type === 'title') {
      setTitle(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(editDescription({ title, description, id: state.id }));
    navigate('/task');
  };

  return (
    <>
      <InputTaskForm
        value={title}
        onChange={(e) => handleInputChange({ e, type: 'title' })}
      ></InputTaskForm>
      <InputTaskForm
        onChange={(e) => handleInputChange({ e, type: 'description' })}
        value={description}
      ></InputTaskForm>
      <ButtonTaskForm category='edit_task' onClick={handleClick}>
        edit
      </ButtonTaskForm>
    </>
  );
}

export default EditTaskForm;
