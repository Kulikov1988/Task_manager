import { useLocation, useNavigate } from 'react-router-dom';
import { handleInputChangeProps } from '../TaskForm';
import React, { useState } from 'react';
import {
  InputTaskForm,
  ButtonTaskForm,
  EditFormStyle,
  DivTaskForm,
} from '../TaskForm.style';
import { useDispatch } from 'react-redux';
import { editDescription } from '../../../../../slices/tasksReducer';


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
  const [errorMessage, setErrorMessage] = useState<string>('');

  

  

  return (
    <>
      <EditFormStyle>
        {/* <InputTaskForm
          value={title}
          onChange={(e) => handleInputChange({ e, type: 'title' })}
        ></InputTaskForm>
        <InputTaskForm
          onChange={(e) => handleInputChange({ e, type: 'description' })}
          value={description}
        ></InputTaskForm> */}
{/* 
        <ButtonTaskForm category='edit_task' onClick={(e) => handleClick({description,id: state.id,e, setErrorMessage, title})}>
          edit
        </ButtonTaskForm> */}
        
      </EditFormStyle>
      <br />

        <DivTaskForm>{errorMessage}</DivTaskForm>
    </>
  );
}

export default EditTaskForm;
