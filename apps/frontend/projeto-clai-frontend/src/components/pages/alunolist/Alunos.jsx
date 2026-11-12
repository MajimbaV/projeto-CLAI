import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlunoList from "./AlunoList";
import { useDeleteAluno } from "../../../hooks/aluno/useDeleteAluno";
import { ConfirmModal } from "../../modal/confirmationDialog/ConfirmModal"

function Alunos() {
  const navigate = useNavigate();
  const { mutate: deleteAluno } = useDeleteAluno();

  const [modalAberto, setModalAberto] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  function handleSolicitarDelecao(aluno) {
    setAlunoSelecionado(aluno);
    setModalAberto(true);
  }

  function handleConfirmarDelecao() {
    if (alunoSelecionado) {
      deleteAluno(alunoSelecionado.alunoMatricula, {
        onSuccess: () => {
          console.log('Aluno deletado com sucesso!'); //Substituir por um toast depois
        },
        onError: (error) => {
          console.error('Erro ao deletar aluno:', error.response?.data); //Substituir por um toast depois
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

  return (
    <>
      <AlunoList
        onAdd={() => navigate("/alunos/novo")}
        onEdit={(aluno) => navigate(`/alunos/${encodeURIComponent(aluno.alunoMatricula)}/editar`)}
        onView={(aluno) => navigate(`/alunos/${encodeURIComponent(aluno.alunoMatricula)}`)}
        onDelete={handleSolicitarDelecao}
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
    </>
  );
}

export default Alunos;