import TimeTable, { useTimeTable } from 'react-custom-timetable';

import {
  startTime,
  endTime,
  slotTime,
  taskListWithouttaskColor,
} from './mocks/timetableMockData';

function App() {
  const { taskListWithRef, timeTableRef } = useTimeTable({
    taskList: taskListWithouttaskColor,
  });

  return (
    <>
      <div
        id="testTimeTableLayout"
        style={{ height: '500px', backgroundColor: 'green' }}
        ref={timeTableRef}
      ></div>

      <div style={{ height: '500px' }}>
        <TimeTable
          totalStartTime={startTime}
          totalEndTime={endTime}
          slotRange={slotTime}
          taskList={taskListWithouttaskColor}
          timeTableSize="2000px"
          timetableDirection="COLUMN"
          displayCurrentTime
          timeTableStyle={{ backgroundColor: 'white' }}
          timeSlotStyle={{ color: 'black', fontSize: '20px' }}
          taskSlotStyle={{
            color: 'white',
            textShadow: '1px 1px 1px gray',
            fontSize: '32px',
          }}
          ellipsisText=""
        />
      </div>

      <div style={{ height: '500px' }}>
        <TimeTable
          totalStartTime={startTime}
          totalEndTime={endTime}
          slotRange={slotTime}
          taskList={taskListWithouttaskColor}
          timeTableSize="2000px"
          timetableDirection="ROW"
          displayCurrentTime
          timeTableStyle={{ backgroundColor: 'white' }}
          timeSlotStyle={{ color: 'black' }}
          taskSlotStyle={{
            color: 'black',
            textShadow: '1px 1px 1px gray',
            fontSize: '32px',
          }}
          ellipsisText="..."
        />
      </div>
    </>
  );
}

export default App;
