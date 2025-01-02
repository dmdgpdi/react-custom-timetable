import {
  taskListOverlapVersion,
  overnightTaskList,
} from './mocks/timetableMockData';
import useTimeTable from 'react-custom-timetable';

function App() {
  const { taskListWithAutoPosition, timeTableCallbackRef } = useTimeTable({
    taskList: taskListOverlapVersion,
  });

  const {
    taskListWithAutoPosition: overnightTaskListWithAutoPosition,
    timeTableCallbackRef: overnightTimeTableCallbackRef,
  } = useTimeTable({
    taskList: overnightTaskList,
    startTime: new Date(new Date().setHours(17, 0, 0, 0)),
    endTime: new Date(new Date().setHours(16, 59, 59, 999)),
  });

  return (
    <>
      <div
        style={{
          height: '500px',
          border: '1px solid black',
          boxSizing: 'border-box',
          position: 'relative',
          overflowY: 'scroll',
        }}
        ref={timeTableCallbackRef}
      >
        {taskListWithAutoPosition.map((task, index) => (
          <div
            key={index}
            style={{
              ...task.style,

              backgroundColor: 'orange',
            }}
          >
            {task.title}
          </div>
        ))}
      </div>
      <div style={{ width: '100px', height: '100px' }}></div>
      <div
        style={{
          height: '500px',
          border: '1px solid black',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'scroll',
        }}
        ref={overnightTimeTableCallbackRef}
      >
        {overnightTaskListWithAutoPosition.map((task, index) => (
          <div
            key={index}
            style={{
              ...task.style,
              backgroundColor: 'green',
            }}
          >
            {task.title}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
