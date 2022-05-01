import React from 'react';
import * as S from './Task.style';

export type InputType = 'title' | 'task';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
}

function Task(props) {
  // const [title, setTitle] = useState<string>('');
  // const [task, setTask] = useState<string>('');

  // const handleInputChange = ({ e, type }: handleInputChangeProps) => {
  //   if (type === 'title') {
  //     setTitle(e.target.value);
  //   } else {
  //     setTask(e.target.value);
  //   }
  // };

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   dispatch(
  //     createTask({
  //       title,
  //       task,
  //     })
  //   );
  // };
  

  return (
    <>
      
        <S.TaskDiv>
          <S.TasksSpan>
            <input type='checkbox' /> {props.task}
          </S.TasksSpan>
          <S.TasksSpan>{props.title}</S.TasksSpan>
          <S.TaskSpan>{props.date}</S.TaskSpan>
        </S.TaskDiv>
    </>
  );
}

export default Task;
