import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import CursoList from "./CursoList";

import { deleteCurso, ativarCurso } from "../../../services/CursoServiceMock";

import { useToast } from "../../../hooks/useToast";

import { ConfirmModal } from "../../modal/confirmationDialog/ConfirmModal";

function Cursos() {
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [acaoSelecionada, setAcaoSelecionada] = useState(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const operacaoEmAndamento = useRef(false);

  const { success: showSuccessToast, error: showErrorToast } = useToast();

  function handleSolicitarDesativacao(curso) {
    setCursoSelecionado(curso);
    setAcaoSelecionada("desativar");
    setModalAberto(true);
  }

  function handleSolicitarAtivacao(curso) {
    setCursoSelecionado(curso);
    setAcaoSelecionada("ativar");
    setModalAberto(true);
  }

  async function handleConfirmarAcao() {
    if (!cursoSelecionado || operacaoEmAndamento.current) {
      return;
    }

    operacaoEmAndamento.current = true;

    try {
      if (acaoSelecionada === "desativar") {
        await deleteCurso(cursoSelecionado.id);

        showSuccessToast("Curso desativado com sucesso!");
      } else if (acaoSelecionada === "ativar") {
        await ativarCurso(cursoSelecionado.id);

        showSuccessToast("Curso ativado com sucesso!");
      }

      setRefreshKey((prev) => prev + 1);

      handleFecharModal();
    } catch (error) {
      showErrorToast(
        `Erro ao ${
          acaoSelecionada === "desativar" ? "desativar" : "ativar"
        } o curso: ${
          error.response?.data?.detail || error.message || "Erro desconhecido"
        }`,
      );
    } finally {
      operacaoEmAndamento.current = false;
    }
  }

  function handleFecharModal() {
    if (operacaoEmAndamento.current) {
      return;
    }

    setModalAberto(false);
    setCursoSelecionado(null);
    setAcaoSelecionada(null);
  }

  const modalEhDesativacao = acaoSelecionada === "desativar";

  return (
    <>
      <CursoList
        onAdd={() => navigate("/dados-academicos/cursos/novo")}
        onView={(curso) =>
          navigate(`/dados-academicos/cursos/${encodeURIComponent(curso.id)}`)
        }
        onEdit={(curso) =>
          navigate(
            `/dados-academicos/cursos/${encodeURIComponent(curso.id)}/editar`,
          )
        }
        onDelete={handleSolicitarDesativacao}
        onActivate={handleSolicitarAtivacao}
        refreshKey={refreshKey}
      />

      <ConfirmModal
        isOpen={modalAberto}
        title={modalEhDesativacao ? "Desativar Curso" : "Ativar Curso"}
        message={
          modalEhDesativacao
            ? `Tem certeza que deseja desativar o curso ${cursoSelecionado?.nomeCurso}?`
            : `Tem certeza que deseja ativar o curso ${cursoSelecionado?.nomeCurso}?`
        }
        confirmText={modalEhDesativacao ? "Desativar" : "Ativar"}
        cancelText="Cancelar"
        onConfirm={handleConfirmarAcao}
        onCancel={handleFecharModal}
      />
    </>
  );
}

export default Cursos;
