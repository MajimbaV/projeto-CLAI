import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout";

import Alunos from "./components/pages/alunolist/Alunos";
import CreateAlunoPage from "./components/pages/alunoform/CreateAlunoPage";
import EditAlunoPage from "./components/pages/alunoform/EditAlunoPage";
import AlunoViewPage from "./components/pages/alunoview/AlunoViewPage";

import NewEstudoCasoPage from "./components/pages/estudodecaso/NewEstudoCasoPage";
import AddEstudoCasoPage from "./components/pages/estudodecaso/AddEstudoCasoPage";
import EditEstudoCasoPage from "./components/pages/estudodecaso/EditEstudoCasoPage";

import PlanejamentoAlunosPage from "./components/pages/planejamento/PlanejamentoAlunosPage";
import AlunoPlanejamentoPage from "./components/pages/planejamento/AlunoPlanejamentoPage";

import PlanoAcaoCreatePage from "./components/pages/planoacao/PlanoAcaoCreatePage";
import PlanoAcaoEditPage from "./components/pages/planoacao/PlanoAcaoEditPage";

import AddPeiPage from "./components/pages/pei/AddPeiPage";
import EditPeiPage from "./components/pages/pei/EditPeiPage";
import NewPeiPage from "./components/pages/pei/NewPeiPage";

import AddPeaPage from "./components/pages/pea/AddPeaPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/alunos" replace />} />

        {/* Rotas de alunos */}
        <Route path="alunos" element={<Alunos />} />
        <Route path="alunos/novo" element={<CreateAlunoPage />} />
        <Route path="alunos/:matricula/editar" element={<EditAlunoPage />} />
        <Route path="alunos/:matricula" element={<AlunoViewPage />} />

        {/* Rotas de planejamento */}
        <Route
          path="planejamento/alunos"
          element={<PlanejamentoAlunosPage />}
        />
        <Route
          path="planejamento/alunos/:matricula"
          element={<AlunoPlanejamentoPage />}
        />

        {/* Rotas de criação de estudo de caso */}
        <Route
          path="planejamento/estudos-de-caso/novo"
          element={<NewEstudoCasoPage modo="criar" />}
        />
        <Route
          path="alunos/:matricula/estudo-caso/novo"
          element={<AddEstudoCasoPage modo="adicionar" />}
        />

        {/* Rota de edição de estudo de caso */}
        <Route
          path="alunos/:matricula/estudo-caso/:id/editar"
          element={<EditEstudoCasoPage modo="editar" />}
        />

        {/* Rotas do Plano de Ação */}
        <Route path="plano-acao/novo" element={<PlanoAcaoCreatePage />} />
        <Route path="plano-acao/editar/:id" element={<PlanoAcaoEditPage />} />
        <Route path="plano-acao/:id/editar" element={<PlanoAcaoEditPage />} />
      </Route>
      {/* PEI */}
      <Route path="planejamento/pei/novo" element={<NewPeiPage />} />

      <Route
        path="planejamento/alunos/:matricula/pei/novo"
        element={<AddPeiPage />}
      />

      <Route
        path="planejamento/alunos/:matricula/pei/:id/editar"
        element={<EditPeiPage />}
      />

      {/* Rotas do PEA */}
      <Route
        path="planejamento/alunos/:matricula/pei/:peiId/pea/novo"
        element={<AddPeaPage />}
      />
    </Routes>
  );
}

export default App;
