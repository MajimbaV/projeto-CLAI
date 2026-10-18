import { useNavigate, useParams } from "react-router-dom";
import AlunoView from "./AlunoView";

function AlunoViewPage() {
  const { matricula } = useParams();
  const navigate = useNavigate();

  return (
    <AlunoView
      matriculaAluno={matricula}
      onBack={() => navigate("/alunos")}
    />
  );
}

export default AlunoViewPage;
