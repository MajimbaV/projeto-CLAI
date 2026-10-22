import { useNavigate } from "react-router-dom";
import PlanejamentoAlunos from "./PlanejamentoAlunos";

function PlanejamentoAlunosPage() {
  const navigate = useNavigate();

  function abrirPlanejamento(aluno) {
    const matricula = aluno.alunoMatricula || aluno.matricula;

    if (!matricula) return;

    navigate(`/planejamento/alunos/${encodeURIComponent(matricula)}`);
  }

  return (
    <PlanejamentoAlunos
      onViewPlanning={abrirPlanejamento}
      onAddAluno={() => navigate("/alunos/novo")}
      onNovoEstudoCaso={() => navigate("/planejamento/estudos-de-caso/novo")}
    />
  );
}

export default PlanejamentoAlunosPage;
