import { useLocation, useNavigate } from "react-router-dom";

import PlanoAcaoForm from "./PlanoAcaoForm";
import { useGetAlunoByMatricula } from "../../../hooks/aluno/useGetAlunoByMatricula";
import { useCreatePlanoAcao } from "../../../hooks/plano-acao/useCreatePlanoAcao";
import { useToast } from "../../../hooks/useToast";

import "./PlanoAcaoForm.css";

function PlanoAcaoCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { success, sucess } = useToast();
  const notifySuccess = success || sucess;

  const matriculaInicial = location.state?.matricula || "";

  const {
    data: alunoSelecionado,
    isLoading: isLoadingAlunos,
    error: errorAlunos,
  } = useGetAlunoByMatricula(matriculaInicial);

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
      alunoSelecionado={alunoSelecionado}
      isLoading={isLoadingAlunos}
      isPending={isCreating}
      error={errorCreate || errorAlunos}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}

export default PlanoAcaoCreatePage;