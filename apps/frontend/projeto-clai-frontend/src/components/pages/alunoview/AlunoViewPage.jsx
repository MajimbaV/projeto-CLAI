import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import AlunoView from "./AlunoView";
import { useDeleteAluno } from "../../../hooks/useDeleteAluno";
import { useAtivarAluno } from "../../../hooks/useAtivarAluno";
import { ConfirmModal } from "../../modal/confirmationDialog/ConfirmModal";

function AlunoViewPage() {
  const { matricula } = useParams();
  const navigate = useNavigate();
  const { mutate: deleteAluno } = useDeleteAluno();
  const { mutate: ativarAluno } = useAtivarAluno();

  const [modalDelecaoAberto, setModalDelecaoAberto] = useState(false);
  const [modalAtivacaoAberto, setModalAtivacaoAberto] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  function handleSolicitarDelecao(aluno) {
    setAlunoSelecionado(aluno);
    setModalDelecaoAberto(true);
  }

  function handleConfirmarDelecao() {
      if (alunoSelecionado) {
        deleteAluno(alunoSelecionado.alunoMatricula, {
          onSuccess: () => {
            setModalDelecaoAberto(false);
            setAlunoSelecionado(null);

            // Chamar um toast aqui depois
            navigate("/alunos");
          },
          onError: (error) => {
            console.error('Erro ao arquivar aluno:', error.response?.data);//Substituir por um toast depois
            setModalDelecaoAberto(false);
          }
        });
      }
    }

  function handleCancelarDelecao() {
    setModalDelecaoAberto(false);
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
          setModalAtivacaoAberto(false);
          setAlunoSelecionado(null);
          // Chamar um toast aqui depois
          navigate("/alunos");
        },
        onError: (error) => {
          console.error('Erro ao ativar aluno:', error.response?.data); //Substituir por um toast depois
          setModalAtivacaoAberto(false);
        }
      });
    }
  }

  function handleCancelarAtivacao() {
    setModalAtivacaoAberto(false);
    setAlunoSelecionado(null);
  }

  return (
    <>
      <AlunoView
        matriculaAluno={matricula}
        onBack={() => navigate("/alunos")}
        onEdit={(aluno) => navigate(`/alunos/${encodeURIComponent(aluno.alunoMatricula)}/editar`)}
        onDelete={handleSolicitarDelecao}
        onActivate={handleSolicitarAtivacao}
      />

      <ConfirmModal
        isOpen={modalDelecaoAberto}
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

export default AlunoViewPage;
