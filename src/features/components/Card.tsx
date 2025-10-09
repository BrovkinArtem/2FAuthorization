import React from 'react';
import Header from "@/features/components/UI/Header.tsx";
import Description from "@/features/components/UI/Description.tsx";
import clsx from "clsx";

const cardStyle = clsx(
  'flex flex-col justify-start items-start',
  'w-full max-w-md p-6 mb-4',
  'bg-white rounded-lg shadow-md'
);

interface cardProps {
  header: string;
  description: string;
}

const Card = ({header, description}: cardProps) => {
  return (
    <div className={cardStyle}>
      <Header level={2} visualLevel={6}>{header}</Header>
      <Description >{description}</Description>
    </div>
  );
};

export default Card;