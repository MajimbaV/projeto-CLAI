/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import AlunoList from "./components/pages/alunolist/AlunoList";
import AlunoForm from "./components/pages/alunoform/AlunoForm";

function App() {
  return (
    <MainLayout>
      <AlunoForm />
    </MainLayout>
  );
}

export default App;
