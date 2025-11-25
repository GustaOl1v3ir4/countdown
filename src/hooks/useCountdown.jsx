import { useState, useEffect } from "react";

const useCountdown = (date) => {
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const countdown = () => {
      const countDate = new Date(`${date}T23:59:59`).getTime();
      const now = Date.now();

      const interval = countDate - now;

      if (interval <= 0) {
        setDay(0);
        setHour(0);
        setMinute(0);
        setSecond(0);
        return;
      }

      const SECOND = 1000;
      const MINUTE = SECOND * 60;
      const HOUR = MINUTE * 60;
      const DAY = HOUR * 24;

      setDay(Math.floor(interval / DAY));
      setHour(Math.floor((interval % DAY) / HOUR));
      setMinute(Math.floor((interval % HOUR) / MINUTE));
      setSecond(Math.floor((interval % MINUTE) / SECOND));
    };

    countdown();
    const timer = setInterval(countdown, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return [day, hour, minute, second];
};

export default useCountdown;
