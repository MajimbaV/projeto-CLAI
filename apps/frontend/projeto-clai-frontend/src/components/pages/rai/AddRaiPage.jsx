import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import RaiForm from "./RaiForm";

import { postRai } from "../../../services/RaiServiceMock";
import { getPeaById } from "../../../services/PeaServiceMock";
import { getPeiById } from "../../../services/PeiServiceMock";

import { useToast } from "../../../hooks/useToast";

export default function AddRaiPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    matricula: matriculaParam,
    peiId: peiIdParam,
    peaId: peaIdParam,
  } = useParams();

  const [isPending, setIsPending] = useState(false);
  const [formError, setFormError] = useState(null);

  const estado = location.state ?? {};

  // Recupera o PEA recebido pela navegação ou consulta pelo ID.
  const peaId =
    peaIdParam ??
    estado.peaId ??
    estado.pea?.id ??
    estado.defaultValues?.peaId ??
    "";

  const peaRecebido = estado.pea ?? (peaId ? getPeaById(peaId) : null);

  const pea = peaRecebido;

  // O PEI é obtido a partir da associação existente no PEA.
  const peiId =
    pea?.peiId ?? peiIdParam ?? estado.peiId ?? estado.pei?.id ?? "";

  const peiRecebido = estado.pei;

  const pei =
    peiRecebido && String(peiRecebido.id) === String(peiId)
      ? peiRecebido
      : peiId
        ? getPeiById(peiId)
        : null;

  // Normaliza o estudante recebido pela navegação.
  const alunoRecebido = estado.aluno ?? null;

  const aluno = alunoRecebido
    ? {
        ...alunoRecebido,
        id: alunoRecebido.id ?? alunoRecebido._id,
      }
    : pea && pei
      ? {
          id: pea.alunoId,
          alunoNome: pei.alunoNome ?? "",
          alunoMatricula: pea.alunoMatricula ?? pei.alunoMatricula ?? "",
          alunoCurso: estado.defaultValues?.curso ?? pei.alunoCurso ?? "",
        }
      : null;

  const alunoId = aluno?.id ?? pea?.alunoId ?? "";

  const matricula =
    matriculaParam ??
    estado.matriculaAluno ??
    aluno?.alunoMatricula ??
    aluno?.matricula ??
    pea?.alunoMatricula ??
    "";

  const vinculosCoerentes = Boolean(
    pea &&
    pei &&
    aluno &&
    alunoId &&
    String(pea.alunoId) === String(alunoId) &&
    String(pea.peiId) === String(pei.id) &&
    String(pei.alunoId) === String(alunoId) &&
    (!peiIdParam || String(peiIdParam) === String(pea.peiId)),
  );

  const defaultValues = {
    ...estado.defaultValues,
    alunoId,
    peiId,
    peaId: pea?.id ?? "",
    alunoNome: aluno?.alunoNome ?? aluno?.nome ?? "",
    alunoMatricula: matricula,
    curso:
      aluno?.alunoCurso ??
      aluno?.curso?.nomeCurso ??
      (typeof aluno?.curso === "string" ? aluno.curso : "") ??
      "",
    componenteCurricular: pea?.componenteCurricular ?? "",
    periodoLetivo: pea?.semestreAno ?? "",
    docente: pea?.docente ?? "",
  };

  const { success: showSuccessToast, error: showErrorToast } = useToast();

  function voltarAoPlanejamento() {
    if (estado.returnTo) {
      navigate(estado.returnTo);
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

    if (!payload.alunoId || !payload.peiId || !payload.peaId) {
      const mensagem =
        "Não foi possível identificar o estudante, o PEI ou o PEA associado.";

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

  if (!vinculosCoerentes) {
    return (
      <div className="rai-page-body">
        <div className="rai-alert" role="alert">
          Não foi possível identificar corretamente o estudante, o PEI e o PEA
          associado.
          <p>
            Abra o cadastro do RAI a partir do PEA correspondente no
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
        pea={pea}
        error={formError}
        isPending={isPending}
        onSubmit={handleSubmit}
        onCancel={voltarAoPlanejamento}
      />
    </div>
  );
}
