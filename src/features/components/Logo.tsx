import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-3">
      <div
        className="
          w-[6px] h-[6px] sm:w-3 sm:h-3
          rounded-full
          bg-transparent
          outline outline-[3px] sm:outline-[6px]
          outline-blue-500
        "
      ></div>
      <span
        className="
          text-[rgba(0,0,0,0.88)]
          font-sans
          text-[12px] sm:text-[16px]
          font-bold
          leading-[24px]
        "
      >
        Company
      </span>
    </div>
  );
};

export default Logo;