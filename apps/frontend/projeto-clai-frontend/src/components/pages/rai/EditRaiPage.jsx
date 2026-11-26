import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import RaiForm from "./RaiForm";

import { useGetPei } from "../../../hooks/pei/useGetPei";

import { getAlunoMockFromPei } from "../../../services/AlunoServiceMock";
import { getRaiById, putRai } from "../../../services/RaiServiceMock";

function obterRegistro(data) {
  if (Array.isArray(data)) return data[0] ?? null;
  if (Array.isArray(data?.content)) return data.content[0] ?? null;

  return data?.data ?? data ?? null;
}

export default function EditRaiPage({
  aluno: alunoProp = null,
  pei: peiProp = null,
  rai: raiProp = null,
  isLoadingAssociacoes = false,
  associacoesError = null,
  isPending = false,
  error = null,
  onSubmit,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    matricula: matriculaParam,
    peiId: peiIdParam,
    id: raiIdParam,
  } = useParams();

  const [feedback, setFeedback] = useState("");

  const raiId =
    raiIdParam ??
    location.state?.raiId ??
    location.state?.rai?.id ??
    location.state?.rai?._id ??
    "";

  const rai =
    raiProp ?? location.state?.rai ?? (raiId ? getRaiById(raiId) : null);

  const matricula =
    matriculaParam ??
    location.state?.matriculaAluno ??
    rai?.alunoMatricula ??
    alunoProp?.alunoMatricula ??
    alunoProp?.matricula ??
    location.state?.aluno?.alunoMatricula ??
    location.state?.aluno?.matricula ??
    "";

  const peiId =
    peiIdParam ??
    location.state?.peiId ??
    rai?.peiId ??
    peiProp?.id ??
    peiProp?._id ??
    location.state?.pei?.id ??
    location.state?.pei?._id ??
    "";

  const {
    data: peiData,
    isLoading: isLoadingPei,
    error: erroPei,
  } = useGetPei(peiId);

  const pei = peiProp ?? location.state?.pei ?? obterRegistro(peiData);
  const alunoInformado = alunoProp ?? location.state?.aluno;
  const alunoMock = getAlunoMockFromPei(pei);
  const alunoInformadoId =
    alunoInformado?.id ?? alunoInformado?._id ?? alunoInformado?.alunoId;
  const aluno = alunoInformadoId
    ? {
        ...alunoMock,
        ...alunoInformado,
        id: alunoInformadoId,
      }
    : alunoMock;
  const alunoId = aluno?.id ?? aluno?._id ?? aluno?.alunoId ?? "";

  const carregandoAssociacoes =
    isLoadingAssociacoes || (!pei && isLoadingPei);

  const erroAssociacoes =
    associacoesError || (!pei && erroPei);

  const defaultValues = {
    ...rai,
    ...location.state?.defaultValues,

    alunoId:
      location.state?.defaultValues?.alunoId ??
      rai?.alunoId ??
      alunoId,

    peiId: location.state?.defaultValues?.peiId ?? rai?.peiId ?? peiId,
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

    const raiAtualizado = putRai(raiId, payload);

    if (!raiAtualizado) {
      setFeedback("Não foi possível atualizar o RAI informado.");
      return;
    }

    setFeedback("RAI atualizado com sucesso.");
  }

  if (carregandoAssociacoes) {
    return (
      <div className="pea-page-body">
        <p className="pea-page-message">
          Carregando informações do aluno e do PEI...
        </p>
      </div>
    );
  }

  if (erroAssociacoes) {
    return (
      <div className="pea-page-body">
        <div className="pea-alert pea-alert-error" role="alert">
          Erro ao carregar as informações associadas:{" "}
          {erroAssociacoes?.response?.data?.detail ||
            erroAssociacoes?.detail ||
            erroAssociacoes?.message ||
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

  if (!rai) {
    return (
      <div className="pea-page-body">
        <div className="pea-alert pea-alert-error" role="alert">
          Não foi possível encontrar o Relatório de Acompanhamento
          Individualizado informado.
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

  if (!alunoId || !peiId || !pei) {
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

      <RaiForm
        mode="edit"
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
