import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Alunos from "./components/pages/alunolist/Alunos";
import AlunoCriar from "./components/pages/alunoform/AlunoForm";
import AlunoViewPage from "./components/pages/alunoview/AlunoViewPage";
// import AlunoEditar from "./pages/AlunoEditar";
// qnd tiver a página de edição coloca o import acima e adicionar nos route path: <Route path="alunos/:matricula/editar" element={<AlunoEditar />} />
// Qualquer coisa vê depois como fazer essa integração com a página de edição (Para Sofia)
function App() {
  

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/alunos" replace />} />

        <Route path="alunos" element={<Alunos />} />
        <Route path="alunos/:matricula" element={<AlunoViewPage />} />

        <Route path="alunos/novo" element={<AlunoCriar />} />
      </Route>
    </Routes>
  );
}

export default App;
