import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import PeaForm from "./PeaForm";
import { useToast } from "../../../hooks/useToast";
import { createPea } from "../../../services/PeaServiceMock";
import { getPeis, getPeiById } from "../../../services/PeiServiceMock";

export default function AddPeaPage({
  aluno: alunoProp = null,
  pei: peiProp = null,
  isLoadingAssociacoes = false,
  associacoesError = null,
  isPending = false,
  error = null,
  onSubmit,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { matricula: matriculaParam, peiId: peiIdParam } = useParams();
  const [feedback, setFeedback] = useState("");
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  const matricula =
    matriculaParam ??
    location.state?.matriculaAluno ??
    location.state?.aluno?.alunoMatricula ??
    location.state?.aluno?.matricula ??
    "";
  const peiId =
    peiIdParam ??
    location.state?.peiId ??
    location.state?.pei?.id ??
    location.state?.pei?._id ??
    "";

  const pei = peiProp ?? location.state?.pei ?? getPeiById(peiId);
  const alunoMock = matricula
    ? getPeis({ filters: { alunoMatricula: matricula } }).content[0] ?? null
    : null;
  const alunoBase = alunoProp ?? location.state?.aluno ?? alunoMock ?? pei;
  const alunoId =
    location.state?.defaultValues?.alunoId ??
    alunoBase?.id ??
    alunoBase?._id ??
    alunoBase?.alunoId ??
    pei?.alunoId ??
    null;
  const aluno = alunoBase
    ? {
        ...alunoBase,
        id: alunoId,
        alunoNome:
          alunoBase.alunoNome ??
          alunoBase.nome ??
          pei?.alunoNome ??
          "Não informado",
        alunoMatricula:
          alunoBase.alunoMatricula ??
          alunoBase.matricula ??
          pei?.alunoMatricula ??
          matricula ??
          "Não informada",
      }
    : null;
  const peiIdentificador =
    pei?.id ?? pei?._id ?? peiId ?? null;
  const defaultValues = {
    ...location.state?.defaultValues,
    alunoId,
    peiId: location.state?.defaultValues?.peiId ?? peiIdentificador ?? "",
  };

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
    setFeedback("");

    if (!payload.alunoId || !payload.peiId) {
      setFeedback("Não foi possível identificar o aluno ou o PEI associado.");
      return;
    }

    if (onSubmit) {
      onSubmit(payload);
      return;
    }

    try {
      createPea(payload);
      showSuccessToast("PEA salvo no mock com sucesso.");
      voltarAoPlanejamento();
    } catch (submitError) {
      const message =
        submitError?.message ?? "Não foi possível salvar o PEA no mock.";
      setFeedback(message);
      showErrorToast(message);
    }
  }

  if (isLoadingAssociacoes) {
    return (
      <div className="pea-page-body">
        <p className="pea-page-message">
          Carregando informações do aluno e do PEI...
        </p>
      </div>
    );
  }

  if (associacoesError) {
    const message =
      associacoesError?.response?.data?.detail ??
      associacoesError?.detail ??
      associacoesError?.message ??
      "Não foi possível carregar o aluno ou o PEI.";

    return (
      <div className="pea-page-body">
        <div className="pea-alert pea-alert-error" role="alert">
          Erro ao carregar as informações associadas: {message}
        </div>
        <button
          type="button"
          className="pea-btn-cancel"
          onClick={voltarAoPlanejamento}
        >
          Voltar ao planejamento
        </button>
      </div>
    );
  }

  if (!alunoId || !peiIdentificador || !pei) {
    return (
      <div className="pea-page-body">
        <div className="pea-alert pea-alert-error" role="alert">
          Não foi possível identificar o aluno ou o PEI associado.
          <p>Verifique se o aluno e o PEI informados na rota existem.</p>
        </div>
        <button
          type="button"
          className="pea-btn-cancel"
          onClick={voltarAoPlanejamento}
        >
          Voltar ao planejamento
        </button>
      </div>
    );
  }

  return (
    <div className="pea-page-body">
      {feedback && (
        <div className="pea-alert" role="status">
          {feedback}
        </div>
      )}
      <PeaForm
        mode="create"
        defaultValues={defaultValues}
        aluno={aluno}
        pei={pei}
        isPending={isPending}
        error={error}
        onSubmit={handleSubmit}
        onCancel={voltarAoPlanejamento}
      />
    </div>
  );
}
