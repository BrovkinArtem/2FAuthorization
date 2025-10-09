import React from 'react';
import Logo from "@/features/components/Logo.tsx";
import Header from "@/features/components/UI/Header.tsx";
import lockSrc from "@/assets/icons/lock.svg";
import personSrc from "@/assets/icons/person.svg";
import Button from "@/features/components/UI/Button.tsx";
import clsx from "clsx";
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Field from "@/features/components/Field.tsx";
import { useNavigate } from "react-router-dom";
import { getAuthStateWithExpiry, setUser } from "@/features/API/storage.ts";

const formStyle = clsx(
  'flex flex-col items-center gap-[4px] sm:gap-4',
  'w-[200px] sm:w-auto h-auto',
  'p-[32px]',
  'bg-white',
  'rounded-[6px]',
);

const authSchema = z.object({
  email: z.string().email({ message: "Неверный email" }),
  password: z.string()
    .min(8, { message: "Минимум 8 символов" })
    .max(20, {message: 'Максимум 20 символов'})
    .regex(/[A-Z]/, { message: "Хотя бы одна заглавная буква" })
    .regex(/\d/, { message: "Хотя бы одна цифра" })
    .regex(/[!@#$%^&*(),.?\":{}|<>]/, { message: "Хотя бы один спецсимвол" }),
});

type AuthFormValues = z.infer<typeof authSchema>;

const AuthForm = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    mode: "onChange"
  });

  const navigate = useNavigate();

  const onSubmit = (data: AuthFormValues) => {
    setUser({ email: data.email, password: data.password });

    const authState = getAuthStateWithExpiry();
    const now = Date.now();

    console.log("AuthState при входе:", authState);

    if (authState?.requires2FA && authState.expiresAt && now < authState.expiresAt) {
      navigate("/main");
    } else {
      navigate("/oauth");
    }
  };

  return (
    <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <Logo />
      <Header level={1} visualLevel={3}>
        Sign in to your account to continue
      </Header>

      <Field
        type="email"
        placeholder="example@email.com"
        icon={lockSrc}
        rhf={register("email")}
        error={errors.email?.message}
      />

      <Field
        type="password"
        placeholder="Password123!"
        icon={personSrc}
        rhf={register("password")}
        error={errors.password?.message}
      />

      <Button value="Log in" disabled={!isValid} />
    </form>
  );
};

export default AuthForm;
