import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import Logo from "@/features/components/Logo.tsx";
import Header from "@/features/components/UI/Header.tsx";
import Button from "@/features/components/UI/Button.tsx";
import BackButton from "@/features/components/BackButton.tsx";
import Description from "@/features/components/UI/Description.tsx";
import CodeInput from "@/features/components/CodeInput.tsx";

import { getUser, setAuthState } from "@/features/API/storage.ts";

const formStyle = clsx(
  'flex relative flex-col items-center gap-[4px] sm:gap-4',
  'w-[200px] sm:w-auto sm:h-auto h-auto',
  'p-[32px]',
  'bg-white',
  'rounded-[6px]',
);

const OAuthForm = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [showGetNew, setShowGetNew] = useState(false);
  const [invalid, setInvalid] = useState(false);

  // при загрузке формы генерируем код
  useEffect(() => {
    const user = getUser();

    if (!user) {
      navigate("/auth"); // если нет пользователя — возвращаем на авторизацию
      return;
    }

    generateCode();

    // через 30 сек появляется кнопка "Get new"
    const timer = setTimeout(() => setShowGetNew(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const generateCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newCode);
    setShowGetNew(false);

    // появится снова через 30 секунд
    setTimeout(() => setShowGetNew(true), 30000);

    // тут можно сделать реальную отправку email
    const user = getUser();
    console.log(`🔐 Код для ${user?.email || "неизвестного"} (симуляция):`, newCode);
  };

  const handleChange = (value: string) => {
    setCode(value);
    setInvalid(false);
  };

  const handleContinue = () => {
    if (code === generatedCode) {
      // сохраняем состояние аутентификации с таймером 5 минут
      setAuthState({ requires2FA: true });

      // переходим на основную страницу
      navigate("/main");
    } else {
      setInvalid(true);
    }
  };

  const isComplete = code.length === 6;

  return (
    <form className={formStyle} onSubmit={e => e.preventDefault()}>
      <BackButton />
      <Logo />
      <Header level={1} visualLevel={3}>
        Two-Factor Authentication
      </Header>

      <Description>
        Enter the 6-digit code sent to your email.
      </Description>

      <CodeInput
        length={6}
        onChange={handleChange}
        invalid={invalid}
      />

      {isComplete && (
        <Button value="Continue" onClick={handleContinue} />
      )}

      {showGetNew && !isComplete && (
        <Button value="Get new" onClick={generateCode} />
      )}

      {invalid && (
        <p className="text-red-500 mt-2">Invalid code</p>
      )}
    </form>
  );
};

export default OAuthForm;
