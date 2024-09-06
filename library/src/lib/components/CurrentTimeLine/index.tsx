import { useContext, useEffect, useState } from 'react';

import styles from './CurrentTimeLine.module.scss';
import {
  calculateCurrentTimePosition,
  parseSize,
  getClassNameByType,
} from '../../utils';
import { TypeContext } from '../../contexts/TypeContext';

interface CurrentTimeLineProps {
  startTime: Date;
  endTime: Date;
  timeTableSize: string;
  currentTimeLineStyle?: string;
}

function CurrentTimeLine({
  startTime,
  endTime,
  timeTableSize,
  currentTimeLineStyle,
}: CurrentTimeLineProps) {
  const type = useContext(TypeContext);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const { value, format } = parseSize(timeTableSize);

  useEffect(() => {
    setCurrentTime(new Date());

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const { currentTimePosition } = calculateCurrentTimePosition(
    currentTime,
    startTime,
    endTime,
  );
  const currentTimeLinePosition = `${(currentTimePosition * value) / 100}${format}`;
  const dynamicStyle: React.CSSProperties =
    type === 'ROW'
      ? { left: currentTimeLinePosition }
      : { top: currentTimeLinePosition };

  const mergedStyle: React.CSSProperties = {
    ...dynamicStyle,
    ...{ border: currentTimeLineStyle },
  };

  return (
    <hr
      className={getClassNameByType(styles, 'line', type)}
      style={mergedStyle}
    />
  );
}

export default CurrentTimeLine;
