import ChevronLeft from "../../../assets/ChevronLeft.png";
import EditImg from "../../../assets/Edit.png";
import { useGetAlunoByMatricula } from "../../../hooks/useGetAlunoByMatricula";

import "./AlunoView.css";

function AlunoView({ matriculaAluno, onBack, onEdit }) {

  const { data: aluno, isLoading, error } = useGetAlunoByMatricula(matriculaAluno);


  if (isLoading) {
    return (
      <div className="aluno-view-body">
        <p>Carregando dados do aluno...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aluno-view-body">
        <p>Erro: {error.detail || error}</p>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="aluno-view-body">
        <p>Aluno não encontrado.</p>

        <button className="aluno-view-back" onClick={onBack}>
          <img src={ChevronLeft} alt="" />
          Voltar para alunos
        </button>
      </div>
    );
  }

  const nome = aluno.alunoNome || aluno.nome;
  const matricula = aluno.alunoMatricula || aluno.matricula;
  const curso = aluno.alunoCurso || aluno.curso;
  const periodoIngresso = aluno.periodoIngresso || aluno.log;

  const possuiStatus = typeof aluno.ativo === "boolean";

  function exibir(valor) {
    return valor !== undefined && valor !== null && valor !== ""
      ? valor
      : "Não informado";
  }

  function formatarData(data) {
    if (!data) return "Não informado";

    const partes = String(data).slice(0, 10).split("-");

    if (partes.length !== 3) return data;

    const [ano, mes, dia] = partes;

    return `${dia}/${mes}/${ano}`;
  }

  const temResponsavel = Boolean(
    aluno.nomeResponsavel ||
    aluno.grauParentesco ||
    aluno.responsavelTelefone ||
    aluno.responsavelEmail,
  );

  return (
    <div className="aluno-view-body">
      <div className="aluno-view-header">
        <div>
          <button className="aluno-view-back" onClick={onBack}>
            <img src={ChevronLeft} alt="" />
            Voltar para alunos
          </button>

          <h1 className="aluno-view-title">Detalhes do aluno</h1>

          <p className="aluno-view-subtitle">
            Consulte as informações pessoais e acadêmicas.
          </p>
        </div>

        <button className="aluno-view-edit" onClick={() => onEdit?.(aluno)}>
          <img src={EditImg} alt="" />
          Editar aluno
        </button>
      </div>

      <section className="aluno-view-card">
        <div className="aluno-view-profile">
          <div className="aluno-view-avatar">
            {(nome || "A").trim().charAt(0).toUpperCase()}
          </div>

          <div className="aluno-view-profile-info">
            <h2>{exibir(nome)}</h2>
            <p>Matrícula: {exibir(matricula)}</p>
          </div>

          {possuiStatus && (
            <span
              className={`aluno-view-status ${
                aluno.ativo ? "ativo" : "arquivado"
              }`}
            >
              <span className="aluno-view-status-dot" />
              {aluno.ativo ? "Ativo" : "Arquivado"}
            </span>
          )}
        </div>

        <div className="aluno-view-divider" />

        <h3 className="aluno-view-section-title">Dados pessoais</h3>

        <div className="aluno-view-grid">
          <div className="aluno-view-field">
            <span>Nome completo</span>
            <p>{exibir(nome)}</p>
          </div>

          <div className="aluno-view-field">
            <span>Data de nascimento</span>
            <p>{formatarData(aluno.alunoNascimento)}</p>
          </div>

          <div className="aluno-view-field">
            <span>Telefone</span>
            <p>{exibir(aluno.alunoTelefone)}</p>
          </div>

          <div className="aluno-view-field">
            <span>E-mail</span>
            <p>{exibir(aluno.alunoEmail)}</p>
          </div>
        </div>

        {temResponsavel && (
          <>
            <div className="aluno-view-divider" />

            <h3 className="aluno-view-section-title">Dados do responsável</h3>

            <div className="aluno-view-grid">
              <div className="aluno-view-field">
                <span>Nome do responsável</span>
                <p>{exibir(aluno.nomeResponsavel)}</p>
              </div>

              <div className="aluno-view-field">
                <span>Grau de parentesco</span>
                <p>{exibir(aluno.grauParentesco)}</p>
              </div>

              <div className="aluno-view-field">
                <span>Telefone do responsável</span>
                <p>{exibir(aluno.responsavelTelefone)}</p>
              </div>

              <div className="aluno-view-field">
                <span>E-mail do responsável</span>
                <p>{exibir(aluno.responsavelEmail)}</p>
              </div>
            </div>
          </>
        )}

        <div className="aluno-view-divider" />

        <h3 className="aluno-view-section-title">Dados acadêmicos</h3>

        <div className="aluno-view-grid">
          <div className="aluno-view-field">
            <span>Matrícula</span>
            <p>{exibir(matricula)}</p>
          </div>

          <div className="aluno-view-field">
            <span>Curso</span>
            <p>{exibir(curso)}</p>
          </div>

          <div className="aluno-view-field">
            <span>Período de ingresso</span>
            <p>{exibir(periodoIngresso)}</p>
          </div>

          <div className="aluno-view-field">
            <span>Período letivo do aluno</span>
            <p>{exibir(aluno.periodoAluno)}</p>
          </div>

          {possuiStatus && (
            <div className="aluno-view-field">
              <span>Status</span>
              <p>{aluno.ativo ? "Ativo" : "Arquivado"}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AlunoView;
