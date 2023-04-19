import Task from './Task';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../store';
import * as S from '../Task/Task.style';
import EditTaskForm from '../../EditForm/EditTaskForm';
import TaskDescription from './../TaskDescription/TaskDescription';
import { useEffect, useState } from 'react';
import { TaskProps } from '../../../../../../slices/tasksReducer';

function TasksDay({
  dayTask,
  isEditOpen,
  setIsEditOpen,
  offset,
  dateWithTasks,
}) {
  const { tasks } = useSelector((state: AppState) => state.taskReducer);
  const [task, setTask] = useState<TaskProps | null>(null);

  useEffect(() => {
    setTask(null);
  }, [dayTask]);

  return (
    <>
      <EditTaskForm
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        dayTask={dayTask}
        dateWithTasks={dateWithTasks}
        offset={offset}
      />
      <S.TaskForm>
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
            <TaskDescription
              setTask={setTask}
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
      <S.TaskForm>
        {task && (
          <Task
            // key={index}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            id={task.id}
            duration={task.duration}
            shortDescription={task.shortDescription}
            status={task.status}
            // dateWithTasks={dateWithTasks}
            // offset={offset}
          />
        )}
      </S.TaskForm>
    </>
  );
}

export default TasksDay;
