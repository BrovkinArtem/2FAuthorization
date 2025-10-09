import React from 'react';
import clsx from "clsx";

const descriptionStyle = clsx (
  "font-sans font-normal,",
  "text-[8px] sm:text-[16px] ",
  "leading-[16px] sm:leading-[24px]]",
  "text-[rgba(0,0,0,0.88)]"
)

interface descriptionProps {
  children: React.ReactNode;
}

const Description = ({children}: descriptionProps) => {
  return (
    <div className={descriptionStyle}>
      <p>{children}</p>
    </div>
  );
};

export default Description;