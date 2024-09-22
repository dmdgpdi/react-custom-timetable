/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';

type CallbackFunction = (...args: any[]) => void;

export const useRequestAnimationFrame = <T extends CallbackFunction>(
  callback: T,
) => {
  const isWaiting = useRef(false);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (!isWaiting.current) {
        callback(...args);
        isWaiting.current = true;
        requestRef.current = requestAnimationFrame(() => {
          isWaiting.current = false;
        });
      }
    },
    [callback],
  );
};
