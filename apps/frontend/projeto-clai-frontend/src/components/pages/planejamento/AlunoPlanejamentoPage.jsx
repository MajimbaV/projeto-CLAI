import { useNavigate, useParams } from "react-router-dom";
import AlunoPlanejamento from "./AlunoPlanejamento";

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

  return (
    <AlunoPlanejamento
      matriculaAluno={matricula}
      onBack={() => navigate("/alunos")}
      onNovoEstudoCaso={() =>
        navigate(`/alunos/${encodeURIComponent(matricula)}/estudo-caso/novo`)
      }
      onEditarEstudoCaso={editarEstudoCaso}
    />
  );
}

export default AlunoPlanejamentoPage;
