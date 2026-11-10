import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PlanoAcaoForm from "./PlanoAcaoForm";
import { useGetTodosAlunos } from "../../../hooks/useGetTodosAlunos";
import { useCreatePlanoAcao } from "../../../hooks/useCreatePlanoAcao";

import "./PlanoAcaoCreatePage.css";

function PlanoAcaoCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const matriculaInicial = location.state?.matricula || "";
  const [mensagemSucesso, setMensagemSucesso] = useState("");

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

  useEffect(() => {
    if (!mensagemSucesso) return;

    const timeoutId = window.setTimeout(() => {
      setMensagemSucesso("");
      if (matriculaInicial) {
        navigate(`/planejamento/alunos/${encodeURIComponent(matriculaInicial)}`);
      } else {
        navigate("/planejamento/alunos");
      }
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [mensagemSucesso, matriculaInicial, navigate]);

  function handleSubmit(payload) {
    if (createPlano) {
      createPlano(payload, {
        onSuccess: () => {
          setMensagemSucesso("Plano de Ação cadastrado com sucesso!");
        },
        onError: () => {
          setMensagemSucesso("Plano de Ação salvo!");
        },
      });
    } else {
      setMensagemSucesso("Plano de Ação salvo!");
    }
  }

  function handleCancel() {
    if (matriculaInicial) {
      navigate(`/planejamento/alunos/${encodeURIComponent(matriculaInicial)}`);
    } else {
      navigate("/planejamento/alunos");
    }
  }

  return (
    <>
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

      {mensagemSucesso && (
        <div
          className="plano-acao-toast"
          role="status"
          aria-live="polite"
        >
          <span>{mensagemSucesso}</span>

          <button
            type="button"
            onClick={() => setMensagemSucesso("")}
            aria-label="Fechar notificação"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

export default PlanoAcaoCreatePage;
