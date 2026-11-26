import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import PeaForm from "./PeaForm";
import { postPea } from "../../../services/PeaServiceMock";
import { mapearParaPeaDTO } from "../../../utils/peaMapper";
import { useToast } from "../../../hooks/useToast";

/*
 * Integração futura com a API:
 * import { useGetAlunoByMatricula } from "../../../hooks/aluno/useGetAlunoByMatricula";
 * import { useGetPei } from "../../../hooks/pei/useGetPei";
 * import { useCreatePea } from "../../../hooks/pea/useCreatePea";
 * const { data: alunoData } = useGetAlunoByMatricula(matricula);
 * const { data: peiData } = useGetPei(peiId);
 * const { mutate: createPea, isPending, error } = useCreatePea();
 */

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

  const { success: showSuccessToast, error: showErrorToast } = useToast();

  // Para o teste, aluno e PEI vêm da navegação iniciada no planejamento.
  const aluno = location.state?.aluno ?? null;
  const pei = location.state?.pei ?? null;

  const defaultValues = {
    ...location.state?.defaultValues,
    alunoId: location.state?.defaultValues?.alunoId ?? aluno?.id ?? aluno?._id ?? "",
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
    try {
      // Mock para teste: grava em memória e preserva o vínculo do aluno.
      postPea({ ...peaDTO, alunoMatricula: matricula });
      showSuccessToast("Plano de Ensino Adaptado cadastrado com sucesso!");
      voltarAoPlanejamento();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.detail ||
        error?.detail ||
        error?.message ||
        "Não foi possível cadastrar o Plano de Ensino Adaptado.";
      setFeedback(errorMessage);
      showErrorToast(errorMessage);
    }

    /*
     * Integração futura com a API: substitua postPea pelo mutate do hook.
     * createPea(peaDTO, {
     *   onSuccess: () => voltarAoPlanejamento(),
     *   onError: (error) => showErrorToast(error?.message),
     * });
     */
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
        onSubmit={handleSubmit}
        onCancel={voltarAoPlanejamento}
      />
    </div>
  );
}
