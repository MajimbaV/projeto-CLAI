import { useNavigate } from "react-router-dom";
import AlunoList from "./AlunoList";

function Alunos() {
  const navigate = useNavigate();

  // Dados temporários para testar a interface, depois integra com API
  const alunos = [
    {
      id: 1,
      nome: "Maria Silva",
      matricula: "2026001",
      log: "2026",
      ativo: true,
      curso: "Informática",
    },
  ];

  return (
    <AlunoList
      alunos={alunos}
      isLoading={false}
      erro={null}
      onAdd={() => navigate("/alunos/novo")}
      onEdit={(aluno) => console.log("Editar:", aluno)}
      onView={(aluno) =>
        navigate(`/alunos/${encodeURIComponent(aluno.matricula)}`, {
          state: { aluno },
        })
      }
      onDelete={(aluno) => console.log("Excluir:", aluno)}
    />
  );
}

export default Alunos;
