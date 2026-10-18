import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Alunos from "./components/pages/alunolist/Alunos";
import CreateAlunoPage from "./components/pages/alunoform/CreateAlunoPage";
import EditAlunoPage from "./components/pages/alunoform/EditAlunoPage";
import AlunoViewPage from "./components/pages/alunoview/AlunoViewPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
  <Route index element={<Navigate to="/alunos" replace />} />

  <Route path="alunos" element={<Alunos />} />
  <Route path="alunos/novo" element={<CreateAlunoPage />} />
  <Route path="alunos/:matricula/editar" element={<EditAlunoPage />} />
  <Route path="alunos/:matricula" element={<AlunoViewPage />} />
</Route><Route path="/" element={<MainLayout />}>
  <Route index element={<Navigate to="/alunos" replace />} />

  <Route path="alunos" element={<Alunos />} />
  <Route path="alunos/novo" element={<CreateAlunoPage />} />
  <Route path="alunos/:matricula/editar" element={<EditAlunoPage />} />
  <Route path="alunos/:matricula" element={<AlunoViewPage />} />
</Route>
    </Routes>
  );
}

export default App;
