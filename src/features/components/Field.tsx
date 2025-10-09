import React from 'react';
import Input from "@/features/components/UI/Input.tsx";
import clsx from "clsx";

interface FieldProps {
  type: string;
  placeholder: string;
  icon?: string;
  rhf: any;
  error?: string;
}

const errorGapStyle = clsx (
  "flex flex-col w-full gap-[2px]"
)

const errorStyle = clsx (
  "text-red-500 sm:text-[12px] text-[8px] mt-1"
)


const Field = ({ type, placeholder, icon, rhf, error }: FieldProps) => {
  return (
    <div className={errorGapStyle}>
      <Input type={type} placeholder={placeholder} icon={icon} rhf={rhf} />
      {error && <p className={errorStyle}>{error}</p>}
    </div>
  );
};

export default Field;