import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthForm from "@/features/components/AuthForm";
import OAuthForm from "@/features/components/OAuthForm";
import MainPage from "@/pages/MainPage.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/oauth" element={<OAuthForm />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
};

export default AppRouter;
