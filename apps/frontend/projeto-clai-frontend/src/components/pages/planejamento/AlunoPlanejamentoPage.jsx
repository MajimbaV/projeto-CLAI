import { useNavigate, useParams } from "react-router-dom";

import AlunoPlanejamento from "./AlunoPlanejamento";

import { useGetPlanosAcaoByMatricula } from "../../../hooks/useGetPlanosAcaoByMatricula";
import { useGetPeis } from "../../../hooks/pei/useGetPeis";

import { getPeas } from "../../../services/PeaServiceMock";

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

  const peasData = getPeas({
    page: 0,
    size: 100,
  });

  const planosAcao = Array.isArray(planosData)
    ? planosData
    : Array.isArray(planosData?.content)
      ? planosData.content
      : [];

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

  const peas = Array.isArray(peasData)
    ? peasData
    : Array.isArray(peasData?.content)
      ? peasData.content
      : [];

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

  function novoRai(pei, aluno) {
    const idPei = pei?.id ?? pei?._id;

    if (!idPei || !aluno) return;

    navigate(
      `/planejamento/alunos/${encodeURIComponent(matricula)}/pei/${encodeURIComponent(idPei)}/rai/novo`,
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

  function editarRai(rai, pei, aluno) {
    const idRai = rai?.id ?? rai?._id;
    const idPei = pei?.id ?? pei?._id;

    if (!idRai || !idPei || !aluno) return;

    navigate(
      `/planejamento/alunos/${encodeURIComponent(matricula)}/pei/${encodeURIComponent(idPei)}/rai/${encodeURIComponent(idRai)}/editar`,
      {
        state: {
          rai,
          pei,
          aluno,
          raiId: idRai,
          peiId: idPei,
          matriculaAluno: matricula,
          returnTo: `/planejamento/alunos/${encodeURIComponent(matricula)}`,
        },
      },
    );
  }

  return (
    <AlunoPlanejamento
      matriculaAluno={matricula}
      planosAcao={planosAcao}
      isLoadingPlanosAcao={isLoadingPlanos}
      erroPlanosAcao={erroPlanos}
      peisData={peis}
      isLoadingPeis={isLoadingPeis}
      erroPeis={erroPeis}
      peasData={peas}
      isLoadingPeas={false}
      erroPeas={null}
      onBack={() => navigate("/planejamento/alunos")}
      onNovoEstudoCaso={novoEstudoCaso}
      onNovoPlanoAcao={novoPlanoAcao}
      onNovoPei={novoPei}
      onNovoPea={novoPea}
      onEditarPei={editarPei}
      onEditarEstudoCaso={editarEstudoCaso}
      onEditarPlanoAcao={editarPlanoAcao}
      onNovoRai={novoRai}
      onEditarRai={editarRai}
    />
  );
}

export default AlunoPlanejamentoPage;
