import React from 'react';
import * as S from './Task.style';
import { ButtonTaskForm } from './components/TaskForm.style';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../slices/tasksReducer';

export type InputType = 'title' | 'task';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
}

function Task(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveToEditForm = () => {
    navigate('/edit_task', {
      state: {
        description: props.description,
        id: props.id,
        title: props.title,
      },
    });
  };

  const deleteTaskOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteTask({ id: props.id }));
  };

  return (
    <>
      <S.TaskDiv>
        <S.TaskSpan>
          <S.TaskItem>
            <S.TaskInput type='checkbox' />
          </S.TaskItem>
        </S.TaskSpan>
        <ButtonTaskForm onClick={moveToEditForm} category='edit_task'>
          edit task
        </ButtonTaskForm>
        <ButtonTaskForm onClick={(id) => deleteTaskOnClick(id)} category='delete_task' >
          delete task
        </ButtonTaskForm>
        <S.TaskSpan>
          <S.TaskItem>
            {props.title} <> </>
          </S.TaskItem>
        </S.TaskSpan>
        <S.TaskSpan>
          <S.TaskItem>
            {props.description} <> </>
          </S.TaskItem>
        </S.TaskSpan>
        <S.TaskSpan>
          <S.TaskItem>{props.date.toLocaleString()}</S.TaskItem>
        </S.TaskSpan>
      </S.TaskDiv>
    </>
  );
}

export default Task;
