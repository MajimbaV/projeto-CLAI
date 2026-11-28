import { HiPencilAlt, HiArchive, HiCheck, HiChevronLeft } from "react-icons/hi";

import "./CursoView.css";

const niveisEnsinoLabels = {
  TECNICO_INTEGRADO: "Técnico Integrado",
  TECNICO_SUBSEQUENTE: "Técnico Subsequente",
  GRADUACAO: "Graduação",
  POS_GRADUACAO: "Pós-graduação",
};

const modalidadesLabels = {
  PRESENCIAL: "Presencial",
  EAD: "EAD",
};

const turnosLabels = {
  MATUTINO: "Matutino",
  VESPERTINO: "Vespertino",
  NOTURNO: "Noturno",
  INTEGRAL: "Integral",
};

function CursoView({
  curso,
  isLoading,
  error,
  onBack,
  onEdit,
  onDelete,
  onActivate,
}) {
  function exibir(valor) {
    return valor !== undefined && valor !== null && valor !== ""
      ? valor
      : "Não informado";
  }

  function obterMensagemErro(erro) {
    return erro?.response?.data?.detail || erro?.message || "Erro desconhecido";
  }

  if (isLoading) {
    return (
      <div className="curso-view-body">
        <p>Carregando dados do curso...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="curso-view-body">
        <p>Erro: {obterMensagemErro(error)}</p>

        <button className="curso-view-back" onClick={onBack}>
          <HiChevronLeft className="back-icon" />
          Voltar para cursos
        </button>
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="curso-view-body">
        <p>Curso não encontrado.</p>

        <button className="curso-view-back" onClick={onBack}>
          <HiChevronLeft className="back-icon" />
          Voltar para cursos
        </button>
      </div>
    );
  }

  return (
    <div className="curso-view-body">
      <div className="curso-view-header">
        <div>
          <button className="curso-view-back" onClick={onBack}>
            <HiChevronLeft className="back-icon" />
            Voltar para cursos
          </button>

          <h1 className="curso-view-title">Detalhes do curso</h1>

          <p className="curso-view-subtitle">
            Consulte as informações acadêmicas do curso.
          </p>
        </div>

        <div className="curso-view-actions">
          {curso.statusAtivo && (
            <>
              <button
                className="curso-view-action-btn"
                onClick={() => onEdit?.(curso)}
              >
                <HiPencilAlt className="action-icon" />
                Editar curso
              </button>

              <button
                className="curso-view-action-btn btn-archive"
                onClick={() => onDelete?.(curso)}
              >
                <HiArchive className="action-icon" />
                Desativar curso
              </button>
            </>
          )}

          {!curso.statusAtivo && (
            <button
              className="curso-view-action-btn"
              onClick={() => onActivate?.(curso)}
            >
              <HiCheck className="action-icon" />
              Ativar curso
            </button>
          )}
        </div>
      </div>

      <section className="curso-view-card">
        <div className="curso-view-profile">
          <div className="curso-view-avatar">
            {(curso.nomeCurso || "C").trim().charAt(0).toUpperCase()}
          </div>

          <div className="curso-view-profile-info">
            <h2>{exibir(curso.nomeCurso)}</h2>
            <p>Sigla: {exibir(curso.cursoSigla)}</p>
          </div>

          <span
            className={`curso-view-status ${
              curso.statusAtivo ? "ativo" : "desativado"
            }`}
          >
            <span className="curso-view-status-dot" />
            {curso.statusAtivo ? "Ativo" : "Desativado"}
          </span>
        </div>

        <div className="curso-view-divider" />

        <h3 className="curso-view-section-title">Identificação do curso</h3>

        <div className="curso-view-grid">
          <div className="curso-view-field">
            <span>Nome do curso</span>
            <p>{exibir(curso.nomeCurso)}</p>
          </div>

          <div className="curso-view-field">
            <span>Sigla</span>
            <p>{exibir(curso.cursoSigla)}</p>
          </div>
        </div>

        <div className="curso-view-divider" />

        <h3 className="curso-view-section-title">Dados acadêmicos</h3>

        <div className="curso-view-grid">
          <div className="curso-view-field">
            <span>Nível de ensino</span>
            <p>{exibir(niveisEnsinoLabels[curso.nivelEnsino])}</p>
          </div>

          <div className="curso-view-field">
            <span>Modalidade</span>
            <p>{exibir(modalidadesLabels[curso.cursoModalidade])}</p>
          </div>

          <div className="curso-view-field">
            <span>Turno</span>
            <p>{exibir(turnosLabels[curso.cursoTurno])}</p>
          </div>

          <div className="curso-view-field">
            <span>Status</span>
            <p>{curso.statusAtivo ? "Ativo" : "Desativado"}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CursoView;
