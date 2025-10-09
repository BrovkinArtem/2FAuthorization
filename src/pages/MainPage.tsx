import React from 'react';
import { getUser, setAuthState } from "@/features/API/storage.ts";
import { useNavigate } from "react-router-dom";
import Button from "@/features/components/UI/Button.tsx";
import clsx from "clsx";
import Header from "@/features/components/UI/Header.tsx";
import Description from "@/features/components/UI/Description.tsx";
import Card from "@/features/components/Card.tsx";

const pageStyle = clsx(
  'flex flex-col items-center justify-start ',
  'min-h-screen p-8 bg-gray-50'
);

const MainPage = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    navigate("/");
  };

  const cards = [
    { header: "Card 1", description: "something_realy_cool_there.txt" },
    { header: "Card 2", description: "wow_this_is_the_wonderful_main_page.txt" },
  ];

  return (
    <div className={pageStyle}>
      <Header level={1} visualLevel={1}>Welcome{user ? `, ${user.email}` : ''}!</Header>
      <Description >This is your main page after login.</Description>
      {cards.map((card, index) => (
        <Card
          key={index}
          header={card.header}
          description={card.description}
        />
      ))}
      <Button value="Logout" onClick={handleLogout}/>
    </div>
  );
};

export default MainPage;
