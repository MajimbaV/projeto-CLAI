import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import RaiForm from "./RaiForm";
import { postRai } from "../../../services/RaiServiceMock";
import { useToast } from "../../../hooks/useToast";

export default function AddRaiPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { matricula: matriculaParam, peiId: peiIdParam } = useParams();

  const [isPending, setIsPending] = useState(false);
  const [formError, setFormError] = useState(null);

  const alunoRecebido = location.state?.aluno ?? null;
  const pei = location.state?.pei ?? null;

  const matricula =
    matriculaParam ??
    location.state?.matriculaAluno ??
    alunoRecebido?.alunoMatricula ??
    alunoRecebido?.matricula ??
    "";

  const peiId =
    peiIdParam ?? location.state?.peiId ?? pei?.id ?? pei?._id ?? "";

  // O formulário utiliza aluno.id. Normaliza também registros que utilizem _id.
  const aluno = alunoRecebido
    ? {
        ...alunoRecebido,
        id: alunoRecebido.id ?? alunoRecebido._id,
      }
    : null;

  const alunoId = aluno?.id ?? "";

  const defaultValues = {
    ...location.state?.defaultValues,
    alunoId,
    peiId,
    alunoNome: aluno?.alunoNome ?? aluno?.nome ?? "",
    alunoMatricula: matricula,
    curso: aluno?.alunoCurso ?? aluno?.curso ?? "",
  };

  const { success: showSuccessToast, error: showErrorToast } = useToast();

  function voltarAoPlanejamento() {
    if (location.state?.returnTo) {
      navigate(location.state.returnTo);
      return;
    }

    if (matricula) {
      navigate(`/planejamento/alunos/${encodeURIComponent(matricula)}`);
      return;
    }

    navigate(-1);
  }

  function handleSubmit(payload) {
    setFormError(null);

    if (!payload.alunoId || !payload.peiId) {
      const mensagem =
        "Não foi possível identificar o estudante ou o PEI associado.";
      setFormError(new Error(mensagem));
      showErrorToast(mensagem);
      return;
    }

    setIsPending(true);

    try {
      postRai(payload);
      showSuccessToast(
        "Relatório de Acompanhamento Individualizado cadastrado com sucesso!",
      );
      voltarAoPlanejamento();
    } catch (error) {
      const mensagem =
        error?.response?.data?.detail ||
        error?.detail ||
        error?.message ||
        "Não foi possível cadastrar o RAI.";

      setFormError(new Error(mensagem));
      showErrorToast(mensagem);
    } finally {
      setIsPending(false);
    }
  }

  if (!aluno || !alunoId || !pei || !peiId) {
    return (
      <div className="rai-page-body">
        <div className="rai-alert" role="alert">
          Não foi possível identificar o estudante ou o PEI associado.
          <p>
            Abra o cadastro do RAI a partir do PEI correspondente no
            planejamento do estudante.
          </p>
        </div>

        <button
          type="button"
          className="rai-btn-cancel"
          onClick={voltarAoPlanejamento}
        >
          Voltar ao planejamento
        </button>
      </div>
    );
  }

  return (
    <div className="rai-page-body">
      <RaiForm
        mode="create"
        defaultValues={defaultValues}
        aluno={aluno}
        pei={pei}
        error={formError}
        isPending={isPending}
        onSubmit={handleSubmit}
        onCancel={voltarAoPlanejamento}
      />
    </div>
  );
}
