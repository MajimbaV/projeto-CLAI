import { useNavigate } from "react-router-dom";
import AlunoList from "./AlunoList";

function Alunos() {
  const navigate = useNavigate();

  return (
    <AlunoList
      onAdd={() => navigate("/alunos/novo")}
      onEdit={(aluno) => console.log("Editar:", aluno)}
      onView={(aluno) =>
        navigate(`/alunos/${encodeURIComponent(aluno.alunoMatricula)}`)
      }
      onDelete={(aluno) => console.log("Excluir:", aluno)}
    />
  );
}

export default Alunos;
