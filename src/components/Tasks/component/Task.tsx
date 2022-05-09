import React from 'react';
import * as S from './Task.style';

export type InputType = 'title' | 'task';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
}

function Task(props) {
  return (
    <>
      <S.TaskDiv>
        <S.TaskSpan>
          <S.TaskInput type='checkbox' />
        </S.TaskSpan>
        <S.TaskSpan>{props.title}</S.TaskSpan>
        <S.TaskSpan>{props.task}</S.TaskSpan>
        <S.TaskSpan>{props.date.toLocaleString()}</S.TaskSpan>
      </S.TaskDiv>
    </>
  );
}

export default Task;
