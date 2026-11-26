import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import RaiForm from "./RaiForm";
import { getRaiById, putRai } from "../../../services/RaiServiceMock";
import { useToast } from "../../../hooks/useToast";

export default function EditRaiPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    matricula: matriculaParam,
    peiId: peiIdParam,
    raiId: raiIdParam,
  } = useParams();

  const raiId = raiIdParam ?? location.state?.raiId ?? location.state?.rai?.id;
  const rai = location.state?.rai ?? getRaiById(raiId);

  const matricula =
    matriculaParam ??
    location.state?.matriculaAluno ??
    rai?.alunoMatricula ??
    "";

  const peiId = peiIdParam ?? location.state?.peiId ?? rai?.peiId ?? "";

  const alunoRecebido =
    location.state?.aluno ??
    (rai
      ? {
          id: rai.alunoId,
          alunoNome: rai.alunoNome,
          alunoMatricula: rai.alunoMatricula,
          alunoCurso: rai.curso,
        }
      : null);

  const aluno = alunoRecebido
    ? {
        ...alunoRecebido,
        id: alunoRecebido.id ?? alunoRecebido._id ?? rai?.alunoId,
      }
    : null;

  const peiRecebido =
    location.state?.pei ??
    (rai
      ? {
          id: peiId,
          titulo: rai.peiTitulo ?? `PEI #${peiId}`,
        }
      : null);

  const pei = peiRecebido
    ? {
        ...peiRecebido,
        id: peiRecebido.id ?? peiRecebido._id ?? peiId,
      }
    : null;

  const [isPending, setIsPending] = useState(false);
  const [formError, setFormError] = useState(null);
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  const defaultValues = {
    ...rai,
    ...location.state?.defaultValues,
    alunoId: aluno?.id ?? rai?.alunoId ?? "",
    peiId: pei?.id ?? rai?.peiId ?? peiId,
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
    setFormError(null);

    if (!raiId || !payload.alunoId || !payload.peiId) {
      const mensagem =
        "Não foi possível identificar o RAI, o estudante ou o PEI associado.";
      setFormError(new Error(mensagem));
      showErrorToast(mensagem);
      return;
    }

    setIsPending(true);

    try {
      const raiAtualizado = putRai(raiId, payload);

      if (!raiAtualizado) {
        throw new Error("O RAI que você tentou editar não foi encontrado.");
      }

      showSuccessToast(
        "Relatório de Acompanhamento Individualizado atualizado com sucesso!",
      );
      voltarAoPlanejamento();
    } catch (error) {
      const mensagem =
        error?.response?.data?.detail ||
        error?.detail ||
        error?.message ||
        "Não foi possível atualizar o RAI.";

      setFormError(new Error(mensagem));
      showErrorToast(mensagem);
    } finally {
      setIsPending(false);
    }
  }

  if (!rai || !raiId) {
    return (
      <div className="rai-page-body">
        <div className="rai-alert" role="alert">
          Não foi possível localizar o Relatório de Acompanhamento
          Individualizado.
          <p>Verifique se o registro ainda existe no mock.</p>
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

  if (!aluno?.id || !pei?.id) {
    return (
      <div className="rai-page-body">
        <div className="rai-alert" role="alert">
          Não foi possível identificar o estudante ou o PEI associado a este
          RAI.
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
        mode="edit"
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
