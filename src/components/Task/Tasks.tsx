import React from 'react';

export const tasks = [
  {
    title: 'Task1',
    date: new Date().toLocaleString(),
    task: 'do the first task today!',
  },
  {
    title: 'Task2',
    date: new Date().toLocaleString(),
    task: 'second task',
  },
  {
    title: 'Task3',
    date: new Date().toLocaleString(),
    task: 'third task',
  },
  {
    title: 'Task4',
    date: new Date().toLocaleString(),
    task: 'one more task',
  },
  {
    title: 'Task5',
    date: new Date().toLocaleString(),
    task: 'last task',
  },
];

function Tasks() {
  return <div>Tasks</div>;
}

export default Tasks;
