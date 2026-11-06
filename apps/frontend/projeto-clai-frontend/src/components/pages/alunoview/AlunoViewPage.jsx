import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import AlunoView from "./AlunoView";
import { useDeleteAluno } from "../../../hooks/useDeleteAluno";
import { ConfirmModal } from "../../modal/confirmationDialog/ConfirmModal";

function AlunoViewPage() {
  const { matricula } = useParams();
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
            setModalAberto(false);
            setAlunoSelecionado(null);

            // Chamar um toast aqui depois
            navigate("/alunos");
          },
          onError: (error) => {
            console.error('Erro ao arquivar aluno:', error.response?.data);//Substituir por um toast depois
            setModalAberto(false);
          }
        });
      }
    }

  function handleCancelarDelecao() {
    setModalAberto(false);
    setAlunoSelecionado(null);
  }


  return (
    <>
      <AlunoView
        matriculaAluno={matricula}
        onBack={() => navigate("/alunos")}
        onEdit={(aluno) => navigate(`/alunos/${encodeURIComponent(aluno.alunoMatricula)}/editar`)}
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

export default AlunoViewPage;
