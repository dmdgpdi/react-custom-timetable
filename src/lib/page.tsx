'use client';

import Timetable from './components';
import {
  startTime,
  endTime,
  slotTime,
  taskListWithouttaskColor,
} from './mocks/timetableMockData';

export default function TimetablePage() {
  return (
    <>
      <div style={{ width: '800px', height: '500px' }}>
        <Timetable // ROW
          totalStartTime={startTime}
          totalEndTime={endTime}
          slotRange={slotTime}
          taskList={taskListWithouttaskColor}
          timeTableSize="2000px"
          timetableDirection="ROW"
          displayCurrentTime
          timeTableStyle={{ backgroundColor: 'white' }}
          timeSlotStyle={{ color: 'black' }}
          taskSlotStyle={{ color: 'black' }}
          popoverType="HOVER"
          ellipsisText="..."
          taskTheme="random"
        />
      </div>
      <div style={{ height: '500px', width: '800px' }}>
        <Timetable // COLUMN
          totalStartTime={startTime}
          totalEndTime={endTime}
          slotRange={slotTime}
          taskList={taskListWithouttaskColor}
          timeTableSize="2000px"
          timetableDirection="COLUMN"
          displayCurrentTime
          timeTableStyle={{ backgroundColor: 'white' }}
          timeSlotStyle={{ color: 'black' }}
          taskSlotStyle={{ color: 'black' }}
          ellipsisText="..."
        />
      </div>
    </>
  );
}
