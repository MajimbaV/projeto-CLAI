import { useNavigate, useParams } from "react-router-dom";
import AlunoPlanejamento from "./AlunoPlanejamento";

function AlunoPlanejamentoPage() {
  const { matricula } = useParams();
  const navigate = useNavigate();

  return (
    <AlunoPlanejamento
      matriculaAluno={matricula}
      onBack={() => navigate("/alunos")}
      onNovoEstudoCaso={() =>
        navigate(`/alunos/${encodeURIComponent(matricula)}/estudo-caso/novo`)
      }
    />
  );
}

export default AlunoPlanejamentoPage;
