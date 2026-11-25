import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import PeaForm from "./PeaForm";
import { useGetAlunoByMatricula } from "../../../hooks/aluno/useGetAlunoByMatricula";
import { useGetPei } from "../../../hooks/pei/useGetPei";
import { useCreatePea } from "../../../hooks/pea/useCreatePea";
import { mapearParaPeaDTO } from "../../../utils/peaMapper";
import { useToast } from "../../../hooks/useToast";

function obterRegistro(data) {
  if (Array.isArray(data)) return data[0] ?? null;
  if (Array.isArray(data?.content)) return data.content[0] ?? null;

  return data?.data ?? data ?? null;
}

export default function AddPeaPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { matricula: matriculaParam, peiId: peiIdParam } = useParams();

  const [feedback, setFeedback] = useState("");

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

  const {
    data: alunoData,
    isLoading: isLoadingAluno,
    error: erroAluno,
  } = useGetAlunoByMatricula(matricula);

  const {
    data: peiData,
    isLoading: isLoadingPei,
    error: erroPei,
  } = useGetPei(peiId);

  const { mutate: createPea} = useCreatePea();
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  // Prioriza os dados recebidos pela navegação.
  // Caso não existam, utiliza os dados recuperados pelos hooks.
  const aluno = location.state?.aluno ?? obterRegistro(alunoData);

  const pei = location.state?.pei ?? obterRegistro(peiData);

  const carregandoAssociacoes =
    (!aluno && isLoadingAluno) ||
    (!pei && isLoadingPei);

  const erroAssociacoes =
    (!aluno && erroAluno) || (!pei && erroPei);

  const defaultValues = {
    ...location.state?.defaultValues,
    alunoId:
      location.state?.defaultValues?.alunoId ?? aluno?.id ?? aluno?._id ?? "",
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

    const peaDTO = mapearParaPeaDTO(payload, payload.alunoId, payload.peiId);
    console.log("Enviando dados para criação do PEA:", peaDTO);
    createPea(peaDTO, {
      onSuccess: () => {
        showSuccessToast("Plano de Ensino Acadêmico cadastrado com sucesso!");
        voltarAoPlanejamento();
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.detail ||
          error?.detail ||
          error?.message ||
          "Não foi possível cadastrar o Plano de Ensino Acadêmico.";
        showErrorToast(errorMessage);
      }
    });
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

  if (!aluno || !peiId || !pei) {
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
        isPending={null}
        error={null}
        onSubmit={handleSubmit}
        onCancel={voltarAoPlanejamento}
      />
    </div>
  );
}
