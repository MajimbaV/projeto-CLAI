/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import AlunoList from "./components/pages/alunolist/AlunoList";
import AlunoForm from "./components/pages/alunoform/AlunoForm";
import { useGetAlunos } from "./hooks/useGetAlunos";

function App() {
  const { data, isLoading, error, isSuccess } = useGetAlunos();

  return (
    <MainLayout>
      <AlunoForm></AlunoForm>
      <AlunoList
        alunos={isSuccess ? data : []}
        isLoading={isLoading}
        erro={error}></AlunoList>
    </MainLayout>
  );
}

export default App;
