import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PlanoAcaoForm from "./PlanoAcaoForm";
import { useGetTodosAlunos } from "../../../hooks/aluno/useGetTodosAlunos";

import "./PlanoAcaoCreatePage.css";

function PlanoAcaoCreatePage() {
  const navigate = useNavigate();
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const {
    data: alunos = [],
    isLoading: isLoadingAlunos,
    error: errorAlunos,
  } = useGetTodosAlunos();

  useEffect(() => {
    if (!mensagemSucesso) return;

    const timeoutId = window.setTimeout(() => {
      setMensagemSucesso("");
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [mensagemSucesso]);

  function handleSubmit(payload) {
    console.log("Payload do Plano de Ação:", payload);

    setMensagemSucesso(
      "Formulário validado. O envio à API será implementado posteriormente.",
    );
  }

  function handleCancel() {
    navigate("/planejamento/alunos");
  }

  return (
    <>
      <PlanoAcaoForm
        mode="create"
        alunos={alunos}
        isLoadingAlunos={isLoadingAlunos}
        error={errorAlunos}
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