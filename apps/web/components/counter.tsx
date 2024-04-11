'use client';

import { useState, useEffect, useRef } from 'react';

const Counter = ({reset}:{reset:boolean}) => {
  const [counter, setCounter] = useState(0);
  const intervalId = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCounter(counter => counter + 1);
    }, 1000);

    return () => {
      if(intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  useEffect(() => {
    setCounter(0);
  }, [reset]);

  return <>
    <div className={"flex justify-center items-center"}>
      <div className={"text-7xl font-semibold"}>{counter}</div>
    </div>
    <div className="flex justify-center items-center text-muted">Seconds</div>
  </>;
};

export default Counter;
