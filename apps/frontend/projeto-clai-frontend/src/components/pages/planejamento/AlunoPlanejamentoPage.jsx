import { useNavigate, useParams } from "react-router-dom";
import AlunoPlanejamento from "./AlunoPlanejamento";
import { useGetPlanosAcaoByMatricula } from "../../../hooks/useGetPlanosAcaoByMatricula";

function AlunoPlanejamentoPage() {
  const { matricula } = useParams();
  const navigate = useNavigate();

  const {
    data: planosData,
    isLoading: isLoadingPlanos,
    error: erroPlanos,
  } = useGetPlanosAcaoByMatricula(matricula);

  const planosAcao = Array.isArray(planosData)
    ? planosData
    : Array.isArray(planosData?.content)
      ? planosData.content
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
      matriculaAluno={matricula}
      planosAcao={planosAcao}
      isLoadingPlanosAcao={isLoadingPlanos}
      erroPlanosAcao={erroPlanos}
      onBack={() => navigate("/planejamento/alunos")}
      onNovoEstudoCaso={() =>
        navigate(`/alunos/${encodeURIComponent(matricula)}/estudo-caso/novo`)
      }
      onNovoPlanoAcao={novoPlanoAcao}
      onNovoPei={novoPei}
      onNovoPea={novoPea}
      onEditarEstudoCaso={editarEstudoCaso}
      onEditarPlanoAcao={editarPlanoAcao}
    />
  );
}

export default AlunoPlanejamentoPage;