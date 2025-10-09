import React from 'react';
import clsx from 'clsx';

interface HeaderProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  visualLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Header = ({ children, level = 1, visualLevel = 3 }: HeaderProps) => {
  const safeLevel = Math.min(Math.max(level, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6;
  const safeVisual = Math.min(Math.max(visualLevel, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6;

  const Tag: React.ElementType = `h${safeLevel}`;

  const visualStyles = clsx(
    'mb-[10px] text-center text-[rgba(0,0,0,0.88)] font-sans font-semibold',
    {
      'text-[32px] sm:text-[40px] sm:leading-[48px] leading-[40px]': safeVisual === 1,
      'text-[28px] sm:text-[36px] sm:leading-[44px] leading-[36px]': safeVisual === 2,
      'text-[24px] sm:text-[32px] sm:leading-[40px] leading-[32px]': safeVisual === 3,
      'text-[20px] sm:text-[28px] sm:leading-[36px] leading-[28px]': safeVisual === 4,
      'text-[16px] sm:text-[24px] sm:leading-[32px] leading-[26px]': safeVisual === 5,
      'text-[12px] sm:text-[20px] sm:leading-[28px] leading-[20px]': safeVisual === 6,
    }
  );

  return <Tag className={visualStyles}>{children}</Tag>;
};

export default Header;
