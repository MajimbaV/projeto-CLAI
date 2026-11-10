import { useLocation, useNavigate } from "react-router-dom";

import PlanoAcaoForm from "./PlanoAcaoForm";
import { useGetTodosAlunos } from "../../../hooks/aluno/useGetTodosAlunos";
import { useCreatePlanoAcao } from "../../../hooks/useCreatePlanoAcao";
import { useToast } from "../../../hooks/useToast";

import "./PlanoAcaoCreatePage.css";

function PlanoAcaoCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { success, sucess } = useToast();
  const notifySuccess = success || sucess;

  const matriculaInicial = location.state?.matricula || "";

  const {
    data: alunos = [],
    isLoading: isLoadingAlunos,
    error: errorAlunos,
  } = useGetTodosAlunos();

  const {
    mutate: createPlano,
    isPending: isCreating,
    error: errorCreate,
  } = useCreatePlanoAcao();

  function handleSubmit(payload) {
    createPlano(payload, {
      onSuccess: () => {
        notifySuccess("Plano de Ação cadastrado com sucesso!");
        if (matriculaInicial) {
          navigate(`/planejamento/alunos/${encodeURIComponent(matriculaInicial)}`);
        } else {
          navigate("/planejamento/alunos");
        }
      },
      onError: (error) => {
        console.error("Erro ao cadastrar Plano de Ação:", error);
      },
    });
  }

  function handleCancel() {
    if (matriculaInicial) {
      navigate(`/planejamento/alunos/${encodeURIComponent(matriculaInicial)}`);
    } else {
      navigate("/planejamento/alunos");
    }
  }

  return (
    <PlanoAcaoForm
      mode="create"
      defaultValues={{ matricula: matriculaInicial }}
      alunos={alunos}
      isLoadingAlunos={isLoadingAlunos}
      isPending={isCreating}
      error={errorCreate || errorAlunos}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}

export default PlanoAcaoCreatePage;