import React from 'react';
import clsx from "clsx";

const iconStyle = clsx(
  "absolute left-2 top-1/2 -translate-y-1/2",
  "sm:w-5 w-[12px] sm:h-5 h-[12px]",
  "pointer-events-none"
)

const inputStyle = clsx(
  'w-full p-2 pl-[25px] sm:pl-9',
  'border rounded-[8px]',
  'text-[8px] sm:text-[16px] border-[rgba(0,0,0,0.15)]',
  'focus:outline-none focus:border-[#1677FF]',
  'hover:border-[#1677FF] transition-colors duration-200'
)

interface inputProps {
  type: string;
  placeholder: string;
  icon?: string;
  rhf?: {};
}

const Input = ({icon, type, placeholder, rhf}: inputProps) => {
    return (
      <div className="relative w-full">
        {icon && (
          <img
            src={icon}
            alt="icon"
            className={iconStyle}
          />
        )}
        <input
          className={inputStyle}
          type={type}
          placeholder={placeholder}
          name={type}
          {...rhf}
        />
      </div>
    );
  };

export default Input;