import { DatePicker } from '@mantine/dates';
import { Group, Indicator } from '@mantine/core';

const MyMonth = ({ dayTask, setDayTask, dates }) => {


  
  const arrDates = dates.map((day) => {
    const date = new Date(day);
    const theDay = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${theDay}`;
  });

  return (
    <>
      <Group position='center'>
        <DatePicker
          firstDayOfWeek={0}
          weekendDays={[5, 6]}
          size='xl'
          getDayProps={(date) => ({ onClick: () => setDayTask(date) })}
          renderDay={(date) => {
            const day = date.getDate();
            const currentDay = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const fullDate = `${year}-${month}-${currentDay}`;
            const taskDays = arrDates.includes(fullDate);
            return (
              <Indicator size={6} color='red' offset={-5} disabled={!taskDays}>
                <div>{day}</div>
              </Indicator>
            );
          }}
        />
      </Group>
    </>
  );
};

export default MyMonth;
