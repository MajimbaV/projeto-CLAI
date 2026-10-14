import { useState } from "react";
import "./AlunoForm.css";
// desabilitando os warns do ESlint
/* eslint-disable no-unused-vars */

function AlunoForm({ onSubmit, isLoading, error = {} }) {
  // estado local dos dados:
  const [formData, setFormData] = useState({
    alunoNome: "",
    alunoNascimento: "",
    alunoTelefone: "",
    alunoEmail: "",
    nomeResponsavel: "",
    grauParentesco: "",
    responsavelTelefone: "",
    responsavelEmail: "",
    alunoMatricula: "",
    alunoCurso: "",
    periodoIngresso: "",
    periodoAluno: "",
  });

  function handleChangeForm(e) {
    const { name, value } = e.target;
    setFormData(function (prev) {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  }

  function eMenorIdade(dataBirth) {
    if (!dataBirth) return false;
    const hoje = new Date();
    const nascimento = new Date(dataBirth);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade < 18;
  }

  // Verifica se o aluno é menor para opcionalmente exibir o responsável
  const menorDeIdade = eMenorIdade(formData.alunoNascimento);

  return (
    <div className="aluno-form-body">
      <div className="header">
        <h1 className="header-text">Adicionar aluno</h1>
        <span className="header-comment">* Campos obrigatórios</span>
      </div>

      <form className="aluno-form" onSubmit={handleSubmit}>
        {/* Alerta de erro da API */}
        {error.detail && (
          <div className="error-banner">
            <p>Erro: {error.detail}</p>
          </div>
        )}

        {/* Área dos dados do aluno */}
        <fieldset className="form-section">
          <legend>Dados do aluno</legend>
          <span className="section-desc">
            Informações pessoais e canais de contato do aluno.
          </span>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="alunoNome">Nome do aluno *</label>
              <input
                type="text"
                id="alunoNome"
                name="alunoNome"
                placeholder="Ex.: Ana Beatriz Souza"
                value={formData.alunoNome}
                onChange={handleChangeForm}
                disabled={isLoading}
              />
              {error.alunoNome && (
                <span className="error-message">{error.alunoNome}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="alunoNascimento">Data de nascimento *</label>
              <input
                type="date"
                id="alunoNascimento"
                name="alunoNascimento"
                value={formData.alunoNascimento}
                onChange={handleChangeForm}
                disabled={isLoading}
              />
              {error.alunoNascimento && (
                <span className="error-message">{error.alunoNascimento}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="alunoTelefone">
                Telefone do aluno (opcional)
              </label>
              <input
                type="text"
                id="alunoTelefone"
                name="alunoTelefone"
                placeholder="(00) 00000-0000"
                value={formData.alunoTelefone}
                onChange={handleChangeForm}
                disabled={isLoading}
              />
              {error.alunoTelefone && (
                <span className="error-message">{error.alunoTelefone}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="alunoEmail">E-mail do aluno (opcional)</label>
              <input
                type="email"
                id="alunoEmail"
                name="alunoEmail"
                placeholder="Ex.: aluno@email.com"
                value={formData.alunoEmail}
                onChange={handleChangeForm}
                disabled={isLoading}
              />
              {error.alunoEmail && (
                <span className="error-message">{error.alunoEmail}</span>
              )}
            </div>
          </div>
        </fieldset>

        {/* Fieldset do responsável que será opcional */}

        {menorDeIdade && (
          <fieldset className="form-section">
            <legend>Dados do responsável</legend>
            <span>Identificação e contato do responsável pelo aluno.</span>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="nomeResponsavel">Nome do Responsável</label>
                <input
                  type="text"
                  id="nomeResponsavel"
                  name="nomeResponsavel"
                  placeholder="Ex.: Maria Souza"
                  value={formData.nomeResponsavel}
                  onChange={handleChangeForm}
                  disabled={isLoading}
                />
                {error.nomeResponsavel && (
                  <span className="error-message">{error.nomeResponsavel}</span>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="grauResponsavel">Grau de Parentesco</label>
                <input
                  type="text"
                  id="grauParentesco"
                  name="grauParentesco"
                  placeholder="Ex.: Mãe, Pai..."
                  value={formData.grauParentesco}
                  onChange={handleChangeForm}
                  disabled={isLoading}
                />
                {error.grauParentesco && (
                  <span className="error-message">{error.grauParentesco}</span>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="responsavelTelefone">
                  Telefone do Responsável
                </label>
                <input
                  type="text"
                  id="responsavelTelefone"
                  name="responsavelTelefone"
                  placeholder="(00) 00000-0000"
                  value={formData.responsavelTelefone}
                  onChange={handleChangeForm}
                  disabled={isLoading}
                />
                {error.responsavelTelefone && (
                  <span className="error-message">
                    {error.responsavelTelefone}
                  </span>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="responsavelEmail">E-Mail do Responsável</label>
                <input
                  type="email"
                  id="responsavelEmail"
                  name="responsavelEmail"
                  placeholder="Ex.: responsavel@email.com"
                  value={formData.responsavelEmail}
                  onChange={handleChangeForm}
                  disabled={isLoading}
                />
                {error.responsavelEmail && (
                  <span className="error-message">
                    {error.responsavelEmail}
                  </span>
                )}
              </div>
            </div>
          </fieldset>
        )}

        {/* fieldset dos dados acadêmicos */}
        <fieldset className="form-section">
          <legend>Dados Acadêmicos</legend>
          <span className="section-desc">
            Informações de matrícula, curso e períodos letivos.
          </span>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="alunoMatricula">Matrícula *</label>
              <input
                type="text"
                id="alunoMatricula"
                name="alunoMatricula"
                placeholder="Ex.: 202601001"
                value={formData.alunoMatricula}
                onChange={handleChangeForm}
                disabled={isLoading}
              />
              {error.alunoMatricula && (
                <span className="error-message">{error.alunoMatricula}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="alunoCurso">Curso *</label>
              <input
                type="text"
                id="alunoCurso"
                name="alunoCurso"
                placeholder="Ex.: Engenharia de Computação"
                value={formData.alunoCurso}
                onChange={handleChangeForm}
                disabled={isLoading}
              />
              {error.alunoCurso && (
                <span className="error-message">{error.alunoCurso}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="periodoIngresso">Período de ingresso *</label>
              <input
                type="text"
                id="periodoIngresso"
                name="periodoIngresso"
                placeholder="Ex.: 2026.1"
                value={formData.periodoIngresso}
                onChange={handleChangeForm}
                disabled={isLoading}
              />
              {error.periodoIngresso && (
                <span className="error-message">{error.periodoIngresso}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="periodoAluno">Período letivo do aluno *</label>
              <input
                type="text"
                id="periodoAluno"
                name="periodoAluno"
                placeholder="Ex.: 2026.2"
                value={formData.periodoAluno}
                onChange={handleChangeForm}
                disabled={isLoading}
              />
              {error.periodoAluno && (
                <span className="error-message">{error.periodoAluno}</span>
              )}
            </div>
          </div>
        </fieldset>

        {/* Footer do formulário, e botões claro */}

        <div className="form-actions">
          <span className="footer-note">
            O identificador do aluno será gerado automaticamente ao salvar.
          </span>
          <div className="buttons-group">
            <button type="button" className="btn-cancel" disabled={isLoading}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Cadastrar aluno"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AlunoForm;
