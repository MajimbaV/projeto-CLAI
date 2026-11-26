import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CursoForm from "./CursoForm";

import { getCursoById, putCurso } from "../../../services/CursoServiceMock";

function EditCursoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let componenteAtivo = true;

    async function carregarCurso() {
      setIsLoading(true);
      setError(null);

      try {
        const resultado = await getCursoById(id);

        if (!componenteAtivo) return;

        if (!resultado) {
          throw new Error("Curso não encontrado.");
        }

        setCurso(resultado);
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

  async function handleSubmit(data) {
    setIsPending(true);

    try {
      await putCurso(id, data);
    } finally {
      setIsPending(false);
    }
  }

  if (isLoading) {
    return <CursoForm isLoading mode="edit" />;
  }

  if (error || !curso) {
    return (
      <div className="curso-form-body">
        <div className="curso-form-header">
          <h1 className="curso-form-header-text">Editar curso</h1>
        </div>

        <div className="curso-form-error-banner">
          <p>Erro: {error?.message || "Curso não encontrado."}</p>
        </div>

        <button
          type="button"
          className="curso-form-btn-cancel"
          onClick={() => navigate("/dados-academicos/cursos")}
        >
          Voltar para cursos
        </button>
      </div>
    );
  }

  return (
    <CursoForm
      onSubmit={handleSubmit}
      isPending={isPending}
      defaultValues={curso}
      mode="edit"
    />
  );
}

export default EditCursoPage;
