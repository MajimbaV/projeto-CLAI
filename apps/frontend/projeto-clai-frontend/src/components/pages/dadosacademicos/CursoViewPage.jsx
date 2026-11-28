import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CursoView from "./CursoView";

import {
  getCursoById,
  deleteCurso,
  ativarCurso,
} from "../../../services/CursoServiceMock";

import { ConfirmModal } from "../../modal/confirmationDialog/ConfirmModal";
import { useToast } from "../../../hooks/useToast";

function CursoViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [acaoSelecionada, setAcaoSelecionada] = useState(null);

  const operacaoEmAndamento = useRef(false);

  const { success: showSuccessToast, error: showErrorToast } = useToast();

  useEffect(() => {
    let componenteAtivo = true;

    async function carregarCurso() {
      setIsLoading(true);
      setError(null);

      try {
        const resultado = await getCursoById(id);

        if (componenteAtivo) {
          setCurso(resultado);
        }
      } catch (erro) {
        if (componenteAtivo) {
          setError(erro);
        }
      } finally {
        if (componenteAtivo) {
          setIsLoading(false);
        }
      }
    }

    carregarCurso();

    return () => {
      componenteAtivo = false;
    };
  }, [id]);

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

      setModalAberto(false);
      setCursoSelecionado(null);
      setAcaoSelecionada(null);

      navigate("/dados-academicos/cursos");
    } catch (erro) {
      showErrorToast(
        `Erro ao ${
          acaoSelecionada === "desativar" ? "desativar" : "ativar"
        } o curso: ${
          erro.response?.data?.detail || erro.message || "Erro desconhecido"
        }`,
      );
    } finally {
      operacaoEmAndamento.current = false;
    }
  }

  function handleCancelarAcao() {
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
      <CursoView
        curso={curso}
        isLoading={isLoading}
        error={error}
        onBack={() => navigate("/dados-academicos/cursos")}
        onEdit={(curso) =>
          navigate(
            `/dados-academicos/cursos/${encodeURIComponent(curso.id)}/editar`,
          )
        }
        onDelete={handleSolicitarDesativacao}
        onActivate={handleSolicitarAtivacao}
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
        onCancel={handleCancelarAcao}
      />
    </>
  );
}

export default CursoViewPage;
