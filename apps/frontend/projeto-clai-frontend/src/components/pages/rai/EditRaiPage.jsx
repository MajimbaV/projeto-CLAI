import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import RaiForm from "./RaiForm";

import { getRaiById, putRai } from "../../../services/RaiServiceMock";

import { getPeaById } from "../../../services/PeaServiceMock";
import { getPeiById } from "../../../services/PeiServiceMock";

import { useToast } from "../../../hooks/useToast";

export default function EditRaiPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    matricula: matriculaParam,
    peiId: peiIdParam,
    peaId: peaIdParam,
    raiId: raiIdParam,
  } = useParams();

  const estado = location.state ?? {};

  const raiId = raiIdParam ?? estado.raiId ?? estado.rai?.id;

  const rai = estado.rai ?? getRaiById(raiId);

  // Identifica o PEA associado ao relatório.
  const peaId =
    peaIdParam ?? estado.peaId ?? rai?.peaId ?? estado.pea?.id ?? "";

  const pea = peaId ? getPeaById(peaId) : null;

  // Identifica o PEI associado ao PEA.
  const peiId = peiIdParam ?? pea?.peiId ?? estado.peiId ?? rai?.peiId ?? "";

  const pei = peiId ? getPeiById(peiId) : null;

  // Recupera os dados do estudante.
  const alunoRecebido = estado.aluno ?? null;

  const aluno = alunoRecebido
    ? {
        ...alunoRecebido,
        id: alunoRecebido.id ?? alunoRecebido._id ?? rai?.alunoId,
      }
    : pea && pei
      ? {
          id: pea.alunoId,
          alunoNome: rai?.alunoNome ?? pei.alunoNome ?? "",
          alunoMatricula:
            rai?.alunoMatricula ??
            pea.alunoMatricula ??
            pei.alunoMatricula ??
            "",
          alunoCurso: rai?.curso ?? pei.alunoCurso ?? "",
        }
      : null;

  const matricula =
    matriculaParam ??
    estado.matriculaAluno ??
    aluno?.alunoMatricula ??
    aluno?.matricula ??
    rai?.alunoMatricula ??
    "";

  const alunoId = aluno?.id ?? "";

  // Confere se o relatório, o aluno, o PEI e o PEA pertencem
  // à mesma associação.
  const vinculosCoerentes = Boolean(
    rai &&
    pea &&
    pei &&
    alunoId &&
    String(rai.peaId) === String(pea.id) &&
    String(rai.peiId) === String(pei.id) &&
    String(pea.peiId) === String(pei.id) &&
    String(pea.alunoId) === String(alunoId) &&
    String(pei.alunoId) === String(alunoId) &&
    String(rai.alunoId) === String(alunoId) &&
    (!peaIdParam || String(peaIdParam) === String(pea.id)) &&
    (!peiIdParam || String(peiIdParam) === String(pei.id)),
  );

  const [isPending, setIsPending] = useState(false);
  const [formError, setFormError] = useState(null);

  const { success: showSuccessToast, error: showErrorToast } = useToast();

  // Os dados originais do RAI têm prioridade sobre valores antigos
  // eventualmente recebidos pelo estado de navegação.
  const defaultValues = {
    ...estado.defaultValues,
    ...rai,

    alunoId,
    peiId: pei?.id ?? "",
    peaId: pea?.id ?? "",

    alunoNome: aluno?.alunoNome ?? aluno?.nome ?? rai?.alunoNome ?? "",

    alunoMatricula: matricula,

    curso: aluno?.alunoCurso ?? rai?.curso ?? "",

    componenteCurricular: pea?.componenteCurricular ?? "",

    periodoLetivo: pea?.semestreAno ?? "",

    docente: pea?.docente ?? "",

    habilidadesCompetencias: Array.isArray(rai?.habilidadesCompetencias)
      ? rai.habilidadesCompetencias.map((habilidade) => ({
          habilidadeDesenvolvida: habilidade.habilidadeDesenvolvida ?? "",
          nivelAprendizado: habilidade.nivelAprendizado ?? "",
          observacoes: habilidade.observacoes ?? "",
        }))
      : [],
  };

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

    if (!raiId || !payload.alunoId || !payload.peiId || !payload.peaId) {
      const mensagem =
        "Não foi possível identificar o RAI, o estudante, o PEI ou o PEA associado.";

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

  if (!vinculosCoerentes) {
    return (
      <div className="rai-page-body">
        <div className="rai-alert" role="alert">
          Não foi possível identificar corretamente o estudante, o PEI ou o PEA
          associado a este RAI.
          <p>
            Verifique os vínculos do relatório e tente novamente pelo
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
        mode="edit"
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
