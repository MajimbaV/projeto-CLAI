import { useLocation, useNavigate, useParams } from "react-router-dom";
import AlunoView from "./AlunoView";

function AlunoViewPage() {
  const { matricula } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // Recebe o aluno selecionado na listagem.
  const aluno = state?.aluno;

  return (
    <AlunoView
      aluno={aluno?.matricula === matricula ? aluno : null}
      isLoading={false}
      erro={null}
      onBack={() => navigate("/alunos")}
    />
  );
}

export default AlunoViewPage;
