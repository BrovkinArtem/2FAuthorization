import React from 'react';
import clsx from "clsx";

interface buttonProps {
  value: string;
  disabled?: boolean;
  onClick?: () => void;
}

const disableStyles = {
  enabled: "bg-[#1677FF] hover:bg-blue-600 text-white border-[#1677FF] cursor-pointer",
  disabled: "bg-[rgba(0,0,0,0.04)] border-[#D9D9D9] text-gray-700 cursor-not-allowed",
};

const Button = ({value, disabled, onClick}: buttonProps) => {
  const buttonStyle = clsx(
    "w-full p-2 rounded-[8px] sm:text-[16px] text-[10px] font-semibold",
    disabled ? disableStyles.disabled : disableStyles.enabled
  );

  return (
    <button
      onClick={onClick}
      className={buttonStyle}
      type="submit"
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;