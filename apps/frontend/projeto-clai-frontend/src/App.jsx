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
    {
      id: 4,
      matricula: "2026004",
      nome: "João Pedro Silva",
      curso: "Ensino Médio",
      ativo: true,
      log: "Matrícula efetuada",
    },
    {
      id: 5,
      matricula: "2026005",
      nome: "Beatriz Lima",
      curso: "Técnico em Enfermagem",
      ativo: true,
      log: "Documentação pendente",
    },
    {
      id: 6,
      matricula: "2026006",
      nome: "Lucas Gabriel",
      curso: "Ensino Médio",
      ativo: false,
      log: "Transferido",
    },
    {
      id: 7,
      matricula: "2026007",
      nome: "Larissa Martins",
      curso: "Técnico em Informática",
      ativo: true,
      log: "Primeiro atendimento",
    },
    {
      id: 8,
      matricula: "2026008",
      nome: "Matheus Henrique",
      curso: "Técnico em Edificações",
      ativo: true,
      log: "Renovação de matrícula",
    },
    {
      id: 9,
      matricula: "2026009",
      nome: "Camila Rocha",
      curso: "Ensino Médio",
      ativo: false,
      log: "Arquivado por inatividade",
    },
    {
      id: 10,
      matricula: "2026010",
      nome: "Gabriel Santos",
      curso: "Técnico em Enfermagem",
      ativo: true,
      log: "Primeiro atendimento",
    },
    {
      id: 11,
      matricula: "2026011",
      nome: "Júlia Ferreira",
      curso: "Ensino Médio",
      ativo: true,
      log: "Atendimento pedagógico",
    },
    {
      id: 12,
      matricula: "2026012",
      nome: "Rafael Costa",
      curso: "Técnico em Informática",
      ativo: true,
      log: "Matrícula efetuada",
    },
    {
      id: 13,
      matricula: "2026013",
      nome: "Bruna Oliveira",
      curso: "Técnico em Edificações",
      ativo: false,
      log: "Trancamento de matrícula",
    },
    {
      id: 14,
      matricula: "2026014",
      nome: "Thiago Almeida",
      curso: "Ensino Médio",
      ativo: true,
      log: "Primeiro atendimento",
    },
    {
      id: 15,
      matricula: "2026015",
      nome: "Amanda Ribeiro",
      curso: "Técnico em Enfermagem",
      ativo: true,
      log: "Reunião com tutoria",
    },
    {
      id: 16,
      matricula: "2026016",
      nome: "Felipe Barbosa",
      curso: "Ensino Médio",
      ativo: false,
      log: "Evadido",
    },
    {
      id: 17,
      matricula: "2026017",
      nome: "Vitória Cardoso",
      curso: "Técnico em Informática",
      ativo: true,
      log: "Primeiro atendimento",
    },
    {
      id: 18,
      matricula: "2026018",
      nome: "Renato Mendes",
      curso: "Técnico em Edificações",
      ativo: true,
      log: "Atualização cadastral",
    },
    {
      id: 19,
      matricula: "2026019",
      nome: "Letícia Ramos",
      curso: "Ensino Médio",
      ativo: true,
      log: "Encaminhamento psicológico",
    },
    {
      id: 20,
      matricula: "2026020",
      nome: "Gustavo Nunes",
      curso: "Técnico em Enfermagem",
      ativo: false,
      log: "Concluído / Arquivado",
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
