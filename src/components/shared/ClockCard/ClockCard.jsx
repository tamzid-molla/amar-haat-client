import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

const ClockCard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-BD", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString("en-BD", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className=" flex-col items-center justify-center gap-2 ">
      <div className="text-2xl font-bold tracking-wide text-center">{formattedTime}</div>
      <div className="text-sm text-textSecondary text-center">{formattedDate}</div>
    </div>
  );
};

export default ClockCard;
