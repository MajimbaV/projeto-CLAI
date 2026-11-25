import { useNavigate, useParams } from "react-router-dom";
import AlunoPlanejamento from "./AlunoPlanejamento";
import { useGetAlunoByMatricula } from "../../../hooks/aluno/useGetAlunoByMatricula";
import { useGetPlanosAcaoByMatricula } from "../../../hooks/plano-acao/useGetPlanosAcaoByMatricula";
import { useGetPeisByMatricula } from "../../../hooks/pei/useGetPeisByMatricula";
import { useGetEstudosCasoByMatricula } from "../../../hooks/estudo-caso/useGetEstudosCasoByMatricula"

function AlunoPlanejamentoPage() {
  const { matricula } = useParams();
  const navigate = useNavigate();

  const {
      data: aluno,
      isLoadingAluno,
      errorAluno,
  } = useGetAlunoByMatricula(matricula);

  const {
    data: estudosCasoData,
    isLoading: isLoadingEstudosCaso,
    error: errorEstudosCaso,
  } = useGetEstudosCasoByMatricula(matricula, {
    sort: "situacaoEstudoDeCaso,desc",
  });

  const {
    data: planosData,
    isLoading: isLoadingPlanos,
    error: errorPlanos,
  } = useGetPlanosAcaoByMatricula(matricula);

  const {
    data: peisData,
    isLoading: isLoadingPeis,
    error: errorPeis,
  } = useGetPeisByMatricula(matricula);

  function getDocumentos() {
    const documentos = {}
    const estudosCaso = Array.isArray(estudosCasoData?.content) ? estudosCasoData?.content : []
    const planosAcao = Array.isArray(planosData?.content) ? planosData?.content : []
    const peis = Array.isArray(peisData?.content) ? peisData?.content : []

    documentos["estudosCaso"] = estudosCaso
    documentos["planosAcao"] = planosAcao
    documentos["peis"] = peis

    return documentos
  }

  function getLoadings() {
    const loadings = {}
    loadings["aluno"] = isLoadingAluno
    loadings["estudosCaso"] = isLoadingEstudosCaso
    loadings["planosAcao"] = isLoadingPlanos
    loadings["peis"] = isLoadingPeis

    return loadings
  }

  function getErrors() {
    const errors = {}
    const alunoErrors = errorAluno?.response?.data || errorAluno?.message || errorAluno || null
    const estudoCasoErrors = errorEstudosCaso?.response?.data || errorEstudosCaso?.message || errorEstudosCaso || null
    const planosAcaoErrors = errorPlanos?.response?.data || errorPlanos?.message || errorPlanos || null
    const peisErrors = errorPeis?.response?.data || errorPeis?.message || errorPeis || null

    errors["aluno"] = alunoErrors
    errors["estudosCaso"] = estudoCasoErrors
    errors["planosAcao"] = planosAcaoErrors
    errors["peis"] = peisErrors

    return errors
  }


  function novoEstudoCaso() {
    navigate(`/alunos/${encodeURIComponent(matricula)}/estudo-caso/novo`, {
      state: {
        matricula: matricula
      }
    })
  }

  function editarEstudoCaso(estudo) {
    const idEstudo =
      estudo.id ?? estudo._id ?? estudo.estudoCasoId ?? estudo.idEstudoCaso;

    if (idEstudo == null) return;

    navigate(
      `/alunos/${encodeURIComponent(matricula)}/estudo-caso/${encodeURIComponent(
        idEstudo,
      )}/editar`,
      {
        state: {
          estudoCaso: estudo,
          matricula: matricula,
        },
      },
    );
  }

  function editarPlanoAcao(plano) {
    const idPlano = plano?.id ?? plano?._id;
    if (!idPlano) return;

    navigate(`/plano-acao/editar/${encodeURIComponent(idPlano)}`, {
      state: {
        plano,
        matricula,
      },
    });
  }

  function novoPlanoAcao() {
    navigate("/plano-acao/novo", {
      state: {
        matricula,
      },
    });
  }

  function novoPei() {
    navigate(`/planejamento/alunos/${encodeURIComponent(matricula)}/pei/novo`, {
      state: {
        matricula,
      },
    });
  }

  function editarPei(pei) {
    const idPei = pei?.id ?? pei?._id;
    if (!idPei) return;

    navigate(
      `/planejamento/alunos/${encodeURIComponent(matricula)}/pei/${encodeURIComponent(idPei)}/editar`,
      {
        state: {
          pei,
          matricula,
        },
      },
    );
  }

  function novoPea(pei, aluno) {
    const idPei = pei?.id ?? pei?._id;

    if (!idPei || !aluno) return;

    navigate(
      `/planejamento/alunos/${encodeURIComponent(matricula)}/pei/${encodeURIComponent(idPei)}/pea/novo`,
      {
        state: {
          aluno,
          pei,
          peiId: idPei,
          matriculaAluno: matricula,
          returnTo: `/planejamento/alunos/${encodeURIComponent(matricula)}`,
        },
      },
    );
  }

  return (
    <AlunoPlanejamento
      aluno = {aluno}
      documentos = {getDocumentos()}
      errors = {getErrors()}
      loadings = {getLoadings()}
      onBack={() => navigate("/planejamento/alunos")}
      onNovoEstudoCaso={novoEstudoCaso}
      onNovoPlanoAcao={novoPlanoAcao}
      onNovoPei={novoPei}
      onNovoPea={novoPea}
      onEditarPei={editarPei}
      onEditarEstudoCaso={editarEstudoCaso}
      onEditarPlanoAcao={editarPlanoAcao}
    />
  );
}

export default AlunoPlanejamentoPage;
