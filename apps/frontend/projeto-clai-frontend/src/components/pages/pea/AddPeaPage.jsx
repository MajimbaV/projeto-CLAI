import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PeaForm from "./PeaForm";

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

  // Recupera os dados enviados pela navegação ou recebidos por props.
  const aluno = alunoProp ?? location.state?.aluno ?? null;
  const pei = peiProp ?? location.state?.pei ?? null;
  // eslint-disable-next-line no-unused-vars
  const matricula =
    matriculaParam ??
    location.state?.matriculaAluno ??
    aluno?.alunoMatricula ??
    aluno?.matricula ??
    "";

  const peiId = peiIdParam ?? location.state?.peiId ?? pei?.id ?? "";

  const defaultValues = {
    ...location.state?.defaultValues,
    alunoId: location.state?.defaultValues?.alunoId ?? aluno?.id ?? "",
    peiId: location.state?.defaultValues?.peiId ?? peiId,
  };

  function voltarAoPlanejamento() {
    if (location.state?.returnTo) {
      navigate(location.state.returnTo);
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

    setFeedback(
      "Formulário preenchido. A integração para salvar o PEA ainda não foi conectada.",
    );
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
    return (
      <div className="pea-page-body">
        <div className="pea-alert pea-alert-error" role="alert">
          Erro ao carregar as informações associadas:{" "}
          {associacoesError?.response?.data?.detail ||
            associacoesError?.detail ||
            associacoesError?.message ||
            "Não foi possível carregar o aluno ou o PEI."}
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

  if (!aluno || !peiId) {
    return (
      <div className="pea-page-body">
        <div className="pea-alert pea-alert-error" role="alert">
          Não foi possível identificar o aluno ou o PEI associado.
          <p>
            Acesse a criação do PEA diretamente pelo PEI correspondente no
            planejamento do aluno.
          </p>
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
        pei={pei ?? { id: peiId }}
        isPending={isPending}
        error={error}
        onSubmit={handleSubmit}
        onCancel={voltarAoPlanejamento}
      />
    </div>
  );
}
