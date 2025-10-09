// src/features/components/CodeInput.tsx
import React, {useRef} from 'react';
import clsx from 'clsx';

const digitInputStyle = clsx(
  'w-[52.7px] h-[60px]',
  'flex justify-center items-center',
  'text-center text-[24px] sm:text-[32px]',
  'border border-[#D9D9D9] rounded-[8px]',
  'bg-white',
  'focus:border-[#1677FF] focus:outline-none'
);

interface CodeInputProps {
  length?: number;
  onChange?: (value: string) => void;
  invalid?: boolean;
}

const CodeInput = ({ length = 6, onChange, invalid }: CodeInputProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChangeLocal = (index: number, value: string) => {
    if (value.length === 1 && index < length - 1) {
      const nextInput = inputsRef.current[index + 1];
      if (nextInput) nextInput.focus();
    }
    if (onChange) {
      const currentValue = inputsRef.current.map(input => input?.value || '').join('');
      onChange(currentValue);
    }
  };

  const inputStyle = clsx(
    'w-[52.7px] h-[60px] flex justify-center items-center text-center text-[24px] sm:text-[32px] border rounded-[8px] bg-white focus:outline-none',
    invalid ? 'border-[#FF4D4F]' : 'border-[#D9D9D9]',
    !invalid && 'focus:border-[#1677FF]'
  );

  return (
    <div className="flex gap-[10px] mt-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          className={inputStyle}
          ref={(el: HTMLInputElement | null) => { if (el) inputsRef.current[i] = el; }}
          onChange={e => handleChangeLocal(i, e.target.value)}
        />
      ))}
    </div>
  );
};

export default CodeInput;
