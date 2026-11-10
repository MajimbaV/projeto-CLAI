import { useLocation, useNavigate, useParams } from "react-router-dom";
import PlanoAcaoForm from "./PlanoAcaoForm";
import { useGetTodosAlunos } from "../../../hooks/aluno/useGetTodosAlunos";
import { useGetPlanoAcaoById } from "../../../hooks/useGetPlanoAcaoById";
import { useUpdatePlanoAcao } from "../../../hooks/useUpdatePlanoAcao";
import { useToast } from "../../../hooks/useToast";

function PlanoAcaoEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { success, sucess } = useToast();
  const notifySuccess = success || sucess;

  const planoInicial = location.state?.plano || null;
  const matriculaOrigem = location.state?.matricula || planoInicial?.matricula || "";

  const {
    data: planoBuscado,
    isLoading: isLoadingPlano,
    error: errorPlano,
  } = useGetPlanoAcaoById(id, {
    enabled: !planoInicial && Boolean(id),
  });

  const planoAtual = planoInicial || planoBuscado;

  const {
    data: alunos = [],
    isLoading: isLoadingAlunos,
    error: errorAlunos,
  } = useGetTodosAlunos();

  const {
    mutate: updatePlano,
    isPending: isUpdating,
    error: errorUpdate,
  } = useUpdatePlanoAcao(id);

  function handleSubmit(payload) {
    updatePlano(payload, {
      onSuccess: () => {
        notifySuccess("Plano de Ação atualizado com sucesso!");
        const matriculaRetorno = planoAtual?.matricula || matriculaOrigem;
        if (matriculaRetorno) {
          navigate(`/planejamento/alunos/${encodeURIComponent(matriculaRetorno)}`);
        } else {
          navigate("/planejamento/alunos");
        }
      },
      onError: (error) => {
        console.error("Erro ao atualizar Plano de Ação:", error);
      },
    });
  }

  function handleCancel() {
    const matriculaRetorno = planoAtual?.matricula || matriculaOrigem;
    if (matriculaRetorno) {
      navigate(`/planejamento/alunos/${encodeURIComponent(matriculaRetorno)}`);
    } else {
      navigate("/planejamento/alunos");
    }
  }

  if (isLoadingPlano) {
    return (
      <div className="plano-acao-body">
        <p>Carregando dados do Plano de Ação...</p>
      </div>
    );
  }

  if (errorPlano && !planoAtual) {
    return (
      <div className="plano-acao-body">
        <p>Não foi possível carregar o Plano de Ação selecionado.</p>
        <button
          type="button"
          className="plano-acao-btn-cancel"
          onClick={() => navigate("/planejamento/alunos")}
          style={{ marginTop: "16px" }}
        >
          Voltar para o planejamento
        </button>
      </div>
    );
  }

  return (
    <PlanoAcaoForm
      mode="edit"
      defaultValues={planoAtual}
      alunos={alunos}
      isLoadingAlunos={isLoadingAlunos}
      isLoading={isLoadingPlano}
      isPending={isUpdating}
      error={errorUpdate || errorAlunos}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}

export default PlanoAcaoEditPage;
