import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EstudoCasoForm from "./EstudoCasoForm";

function obterMatricula(aluno) {
  return String(aluno?.alunoMatricula ?? aluno?.matricula ?? "");
}

export default function EstudoCasoPage({
  modo = "existente",
  alunos: alunosProp,
  isLoadingAlunos = false,
  isPending = false,
  error = null,
  onSubmit,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { matricula } = useParams();
  const alunoDaNavegacao = location.state?.aluno ?? null;
  const alunosDoEstado = location.state?.alunos ?? [];

  const alunos = useMemo(() => {
    const lista = [...(alunosProp ?? alunosDoEstado)];
    if (
      alunoDaNavegacao &&
      !lista.some((aluno) => obterMatricula(aluno) === obterMatricula(alunoDaNavegacao))
    ) {
      lista.push(alunoDaNavegacao);
    }
    return lista;
  }, [alunosProp, alunosDoEstado, alunoDaNavegacao]);

  const alunoInicial = useMemo(() => {
    if (alunoDaNavegacao) return alunoDaNavegacao;
    if (!matricula) return null;
    return alunos.find((aluno) => obterMatricula(aluno) === matricula) ?? null;
  }, [alunoDaNavegacao, alunos, matricula]);

  const caminhoDeVolta = matricula
    ? `/alunos/${encodeURIComponent(matricula)}`
    : "/alunos";

  async function handleSubmit(payload) {
    if (!onSubmit) return;
    await onSubmit(payload);
    navigate(caminhoDeVolta);
  }

  return (
    <EstudoCasoForm
      modo={modo}
      alunos={alunos}
      alunoInicial={alunoInicial}
      matriculaInicial={matricula ?? location.state?.matricula ?? ""}
      isLoadingAlunos={isLoadingAlunos}
      isPending={isPending}
      error={error}
      onSubmit={onSubmit ? handleSubmit : undefined}
      onCancel={() => navigate(caminhoDeVolta)}
    />
  );
}
