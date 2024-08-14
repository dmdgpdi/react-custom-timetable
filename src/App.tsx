import TimeTable from './lib';
import {
  startTime,
  endTime,
  slotTime,
  taskListWithouttaskColor,
} from './lib/mocks/timetableMockData';

function App() {
  return (
    <>
      <TimeTable
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
    </>
  );
}

export default App;
