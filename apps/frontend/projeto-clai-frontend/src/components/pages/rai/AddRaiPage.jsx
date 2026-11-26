import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import RaiForm from "./RaiForm";

import { useGetPei } from "../../../hooks/pei/useGetPei";

import { getAlunoMockFromPei } from "../../../services/AlunoServiceMock";
import { postRai } from "../../../services/RaiServiceMock";

function obterRegistro(data) {
  if (Array.isArray(data)) return data[0] ?? null;
  if (Array.isArray(data?.content)) return data.content[0] ?? null;

  return data?.data ?? data ?? null;
}

export default function AddRaiPage({
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

  const matricula =
    matriculaParam ??
    location.state?.matriculaAluno ??
    alunoProp?.alunoMatricula ??
    alunoProp?.matricula ??
    location.state?.aluno?.alunoMatricula ??
    location.state?.aluno?.matricula ??
    "";

  const peiId =
    peiIdParam ??
    location.state?.peiId ??
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
    ...location.state?.defaultValues,
    alunoId: location.state?.defaultValues?.alunoId ?? alunoId,
    peiId: location.state?.defaultValues?.peiId ?? peiId,
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

    const dadosRai = {
      ...payload,
      alunoId,
      peiId: pei.id ?? pei._id ?? peiId,
      alunoNome: aluno.alunoNome || aluno.nome,
      alunoMatricula: aluno.alunoMatricula || aluno.matricula,
    };

    if (onSubmit) {
      onSubmit(dadosRai);
      return;
    }

    try {
      const novoRai = postRai(dadosRai);

      if (!novoRai) {
        setFeedback("Não foi possível cadastrar o RAI.");
        return;
      }

      voltarAoPlanejamento();
    } catch (erro) {
      setFeedback(erro?.message || "Ocorreu um erro ao cadastrar o RAI.");
    }
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
