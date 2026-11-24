import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlunoList from "./AlunoList";
import { useDeleteAluno } from "../../../hooks/aluno/useDeleteAluno";
import { useAtivarAluno } from "../../../hooks/aluno/useAtivarAluno";
import { useToast } from "../../../hooks/useToast";
import { ConfirmModal } from "../../modal/confirmationDialog/ConfirmModal"

function Alunos() {
  const navigate = useNavigate();
  const { mutate: deleteAluno } = useDeleteAluno();
  const { mutate: ativarAluno } = useAtivarAluno();

  const [modalAberto, setModalAberto] = useState(false);
  const [modalAtivacaoAberto, setModalAtivacaoAberto] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const { success: showSuccessToast, error: showErrorToast } = useToast();

  function handleSolicitarDelecao(aluno) {
    setAlunoSelecionado(aluno);
    setModalAberto(true);
  }

  function handleConfirmarDelecao() {
    if (alunoSelecionado) {
      deleteAluno(alunoSelecionado.alunoMatricula, {
        onSuccess: () => {
          showSuccessToast('Aluno arquivado com sucesso!');
        },
        onError: (error) => {
          showErrorToast(`Erro ao arquivar o aluno: ${error.response?.data?.detail || error.message || 'Erro desconhecido'}`);
        }
      });
    }
    setModalAberto(false);
    setAlunoSelecionado(null);
  }

  function handleCancelarDelecao() {
    setModalAberto(false);
    setAlunoSelecionado(null);
  }

  
  function handleSolicitarAtivacao(aluno) {
    setAlunoSelecionado(aluno);
    setModalAtivacaoAberto(true);
  }

  function handleConfirmarAtivacao() {
    if (alunoSelecionado) {
      ativarAluno(alunoSelecionado.alunoMatricula, {
        onSuccess: () => {
          showSuccessToast('Aluno ativado com sucesso!');
        },
        onError: (error) => {
          showErrorToast(`Erro ao arquivar o aluno: ${error.response?.data?.detail || error.message || 'Erro desconhecido'}`);
        }
      });
      setModalAtivacaoAberto(false);
      setAlunoSelecionado(null);
    }
  }

  function handleCancelarAtivacao() {
    setModalAtivacaoAberto(false);
    setAlunoSelecionado(null);
  }


  return (
    <>
      <AlunoList
        onAdd={() => navigate("/alunos/novo")}
        onEdit={(aluno) => navigate(`/alunos/${encodeURIComponent(aluno.alunoMatricula)}/editar`)}
        onView={(aluno) => navigate(`/alunos/${encodeURIComponent(aluno.alunoMatricula)}`)}
        onDelete={handleSolicitarDelecao}
        onActivate={handleSolicitarAtivacao}
      />

      <ConfirmModal
        isOpen={modalAberto}
        title="Arquivar Aluno"
        message={`Tem certeza que deseja arquivar o aluno ${alunoSelecionado?.alunoNome}?`}
        confirmText="Arquivar"
        cancelText="Cancelar"
        onConfirm={handleConfirmarDelecao}
        onCancel={handleCancelarDelecao}
      />

      <ConfirmModal
        isOpen={modalAtivacaoAberto}
        title="Ativar Aluno"
        message={`Tem certeza que deseja ativar o aluno ${alunoSelecionado?.alunoNome}?`}
        confirmText="Ativar"
        cancelText="Cancelar"
        onConfirm={handleConfirmarAtivacao}
        onCancel={handleCancelarAtivacao}
      />
    </>
  );
}

export default Alunos;