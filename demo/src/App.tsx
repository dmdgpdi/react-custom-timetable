import { taskListOverlapVersion } from './mocks/timetableMockData';
import useTimeTable from 'react-custom-timetable';

function App() {
  const { taskListAutoPosition, timeTableCallbackRef } = useTimeTable({
    taskList: taskListOverlapVersion,
  });

  return (
    <div
      id="testTimeTableLayout"
      style={{
        height: '500px',
        border: '1px solid black',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'scroll',
      }}
      ref={timeTableCallbackRef}
    >
      {taskListAutoPosition.map((task, index) => (
        <div
          key={index}
          style={{
            ...task.style,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {task.title}
        </div>
      ))}
    </div>
  );
}

export default App;
