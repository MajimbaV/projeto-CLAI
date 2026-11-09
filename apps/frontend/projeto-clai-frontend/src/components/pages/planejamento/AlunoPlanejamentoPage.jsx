import { useNavigate, useParams } from "react-router-dom";
import AlunoPlanejamento from "./AlunoPlanejamento";
import { MOCK_PLANOS_ACAO } from "../planoacao/planoAcaoMocks";

function AlunoPlanejamentoPage() {
  const { matricula } = useParams();
  const navigate = useNavigate();

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
        },
      },
    );
  }

  function editarPlanoAcao(plano) {
    if (!plano?.id) return;

    navigate(`/plano-acao/editar/${encodeURIComponent(plano.id)}`, {
      state: {
        plano,
        matricula,
      },
    });
  }

  return (
    <AlunoPlanejamento
      matriculaAluno={matricula}
      planosAcao={MOCK_PLANOS_ACAO.filter(
        (plano) => plano.matricula === matricula,
      )}
      onBack={() => navigate("/alunos")}
      onNovoEstudoCaso={() =>
        navigate(`/alunos/${encodeURIComponent(matricula)}/estudo-caso/novo`)
      }
      onEditarEstudoCaso={editarEstudoCaso}
      onEditarPlanoAcao={editarPlanoAcao}
    />
  );
}

export default AlunoPlanejamentoPage;
