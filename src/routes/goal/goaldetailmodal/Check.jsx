import React from "react";
import "tailwindcss/tailwind.css";

const Check = () => {
  return (
    <div>
      <svg
        className="block flex-grow-0 flex-shrink-0 w-[25px] h-[25px] relative"
        width={25}
        height={26}
        viewBox="0 0 25 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.1875 9.09375L10.625 16.9062L7.8125 13.7812"
          stroke="#A3A2A4"
          strokeWidth={1.875}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5312 3.625H5.46875C4.17433 3.625 3.125 4.67433 3.125 5.96875V20.0312C3.125 21.3257 4.17433 22.375 5.46875 22.375H19.5312C20.8257 22.375 21.875 21.3257 21.875 20.0312V5.96875C21.875 4.67433 20.8257 3.625 19.5312 3.625Z"
          stroke="#A3A2A4"
          strokeWidth={1.875}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Check;
