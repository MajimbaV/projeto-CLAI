/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import AlunoList from "./components/pages/alunolist/AlunoList";

function App() {
  const alunosMock = [
    {
      id: 1,
      matricula: "2026001",
      nome: "Ana Beatriz",
      curso: "Ensino Médio",
      ativo: true,
      log: "Primeiro atendimento",
    },
    {
      id: 2,
      matricula: "2026002",
      nome: "Carlos Eduardo",
      curso: "Técnico em Informática",
      ativo: true,
      log: "Primeiro atendimento",
    },
    {
      id: 3,
      matricula: "2026003",
      nome: "Mariana Souza",
      curso: "Técnico em Edificações",
      ativo: false,
      log: "Documento de rejeição",
    },
  ];
  return (
    <MainLayout>
      <AlunoList
        alunos={alunosMock}
        isLoading={false}
        erro={null}
        onDelete={() => {}}
        onEdit={() => {}}
        onView={() => {}}
      />
    </MainLayout>
  );
}

export default App;
