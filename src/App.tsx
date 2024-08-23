import React from 'react';
import TimeTable from './lib';
import {
  startTime,
  endTime,
  slotTime,
  taskListWithouttaskColor,
} from './mocks/timetableMockData';

function App() {
  return (
    <>
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
            color: 'black',
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
