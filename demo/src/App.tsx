import { useTimeTable } from 'react-custom-timetable';

import { taskListWithouttaskColor } from './mocks/timetableMockData';

function App() {
  const { taskListWithRef, timeTableRef } = useTimeTable({
    taskList: taskListWithouttaskColor,
  });

  return (
    <>
      <div
        id="testTimeTableLayout"
        style={{
          height: '500px',

          border: '1px solid black',
          boxSizing: 'border-box',
        }}
        ref={timeTableRef}
      >
        {taskListWithRef.map((task) => {
          return (
            <div key={task.id} ref={task.ref} style={task.style}>
              <p>
                {task.title}{' '}
                <span>
                  {task.startTime.getHours()}:{task.startTime.getMinutes()}
                </span>
                {'~'}
                <span>
                  {task.endTime.getHours()}:{task.endTime.getMinutes()}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
