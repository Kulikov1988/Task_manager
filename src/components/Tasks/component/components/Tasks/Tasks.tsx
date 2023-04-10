import { useState } from 'react';
import Task from './Task/Task';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store';
import * as S from './Task/Task.style';
import { DivTaskForm } from './Task/TaskForm.style';
import Search from '../../../../SharedComponents/Search/Search';

function Tasks() {
  const [search, setSearch] = useState('');

  const { tasks } = useSelector((state: AppState) => state.taskReducer);

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      task.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  });

  return (
    <S.TaskForm>
      <DivTaskForm>
        <Search setSearch={setSearch} search={search} />
      </DivTaskForm>
      {filteredTasks.map(
        (
          {
            title,
            description,
            dueDate,
            id,
            duration,
            shortDescription,
            status,
          },
          index
        ) => (
          <Task
            key={index}
            title={title}
            description={description}
            dueDate={dueDate}
            id={id}
            duration={duration}
            shortDescription={shortDescription}
            status={status}
          />
        )
      )}
    </S.TaskForm>
  );
}

export default Tasks;
