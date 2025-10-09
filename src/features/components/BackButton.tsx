import React from 'react';
import backSrc from "@/assets/icons/ArrowLeftOutlined.svg";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const buttonStyle = clsx (
  "absolute top-4 left-4 p-2",
  "rounded hover:bg-gray-200 transition"
)

const BackButton = () => {

  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1); // возвращаемся на предыдущий экран
  };

  return (
    <button
      onClick={onClick}
      className={buttonStyle}
      type="button"
    >
      <img src={backSrc} alt="Back" className="w-5 h-5"/>
    </button>
  );
};

export default BackButton;