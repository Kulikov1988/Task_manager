import Task from './Task';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../store';
import * as S from '../Task/Task.style';
import EditTaskForm from '../../EditForm/EditTaskForm';

function TasksDay({ dayTask, isEditOpen, setIsEditOpen }) {
  const { tasks } = useSelector((state: AppState) => state.taskReducer);

  return (
    <S.TaskForm>
      <EditTaskForm
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        dayTask={dayTask}
      />
      <div>
        {tasks.map(
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
      </div>
    </S.TaskForm>
  );
}

export default TasksDay;
