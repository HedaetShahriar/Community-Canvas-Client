import React from "react";
import Countdown from "react-countdown";

const EventCountdown = ({ startDate, endDate }) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now >= start && now <= end) {
    return (
      <p className="text-green-600 font-semibold text-center text-lg">
        Event Ongoing
      </p>
    );
  }

  if (now > end) {
    return (
      <p className="text-red-600 font-semibold text-center text-lg">
        Event has ended
      </p>
    );
  }

  const renderer = ({ days, hours, minutes, seconds }) => (
    <div className="flex justify-center flex-wrap gap-3 p-4 ">
      {[ 
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Minutes", value: minutes },
        { label: "Seconds", value: seconds },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center bg-base-100 rounded-md px-4 py-2 shadow-sm"
        >
          <span className="text-2xl font-semibold tabular-nums ">
            {value.toString().padStart(2, "0")}
          </span>
          <span className="text-xs uppercase tracking-wide text-gray-500 mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <Countdown
      date={start}
      renderer={renderer}
      autoStart
      key={start.getTime()}
    />
  );
};

export default EventCountdown;
