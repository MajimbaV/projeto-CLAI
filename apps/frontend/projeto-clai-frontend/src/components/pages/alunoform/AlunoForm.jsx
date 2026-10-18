import { useState } from "react";
import "./AlunoForm.css";
import { useCreateAluno } from "../../../hooks/useCreateAluno";
// desabilitando os warns do ESlint
/* eslint-disable no-unused-vars */

function AlunoForm() {
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

  const { mutate: onSubmit, isPending, error } = useCreateAluno();

  function handleChangeForm(e) {
    const { name, value } = e.target;
    setFormData(function (prev) {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = { ...formData };

    if (!menorDeIdade) {
      payload.nomeResponsavel = null;
      payload.grauParentesco = null;
      payload.responsavelTelefone = null;
      payload.responsavelEmail = null;
    }

    if (onSubmit) {
      onSubmit(payload, {
        onSuccess: () => {
          alert("Aluno cadastrado com sucesso!"); // Substuituir por uma notificação mais elegante no futuro e outras ações, como redirecionamento ou reset do formulário
        },
      });
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
  const errorResponse = error?.response?.data || {};
  const invalidFields = errorResponse.invalidFields || {};

  return (
    <div className="aluno-form-body">
      <div className="header">
        <h1 className="header-text">Adicionar aluno</h1>
        <span className="header-comment">* Campos obrigatórios</span>
      </div>

      <form className="aluno-form" onSubmit={handleSubmit}>
        {/* Alerta de erro da API */}
        {errorResponse.detail && (
          <div className="error-banner">
            <p>Erro: {errorResponse.detail}</p>
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
                disabled={isPending}
              />
              {invalidFields.alunoNome && (
                <span className="error-message">{invalidFields.alunoNome}</span>
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
                disabled={isPending}
              />
              {invalidFields.alunoNascimento && (
                <span className="error-message">
                  {invalidFields.alunoNascimento}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="alunoTelefone">
                Telefone do aluno
              </label>
              <input
                type="text"
                id="alunoTelefone"
                name="alunoTelefone"
                placeholder="DDD000000000 (Apenas os Números)"
                value={formData.alunoTelefone}
                onChange={handleChangeForm}
                disabled={isPending}
              />
              {invalidFields.alunoTelefone && (
                <span className="error-message">
                  {invalidFields.alunoTelefone}
                </span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="alunoEmail">E-mail do aluno</label>
              <input
                type="email"
                id="alunoEmail"
                name="alunoEmail"
                placeholder="Ex.: aluno@email.com"
                value={formData.alunoEmail}
                onChange={handleChangeForm}
                disabled={isPending}
              />
              {invalidFields.alunoEmail && (
                <span className="error-message">
                  {invalidFields.alunoEmail}
                </span>
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
                  disabled={isPending}
                />
                {invalidFields.nomeResponsavel && (
                  <span className="error-message">
                    {invalidFields.nomeResponsavel}
                  </span>
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
                  disabled={isPending}
                />
                {invalidFields.grauParentesco && (
                  <span className="error-message">
                    {invalidFields.grauParentesco}
                  </span>
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
                  disabled={isPending}
                />
                {invalidFields.responsavelTelefone && (
                  <span className="error-message">
                    {invalidFields.responsavelTelefone}
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
                  disabled={isPending}
                />
                {invalidFields.responsavelEmail && (
                  <span className="error-message">
                    {invalidFields.responsavelEmail}
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
                disabled={isPending}
              />
              {invalidFields.alunoMatricula && (
                <span className="error-message">
                  {invalidFields.alunoMatricula}
                </span>
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
                disabled={isPending}
              />
              {invalidFields.alunoCurso && (
                <span className="error-message">
                  {invalidFields.alunoCurso}
                </span>
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
                disabled={isPending}
              />
              {invalidFields.periodoIngresso && (
                <span className="error-message">
                  {invalidFields.periodoIngresso}
                </span>
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
                disabled={isPending}
              />
              {invalidFields.periodoAluno && (
                <span className="error-message">
                  {invalidFields.periodoAluno}
                </span>
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
            <button type="button" className="btn-cancel" disabled={isPending}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit" disabled={isPending}>
              {isPending ? "Salvando..." : "Cadastrar aluno"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AlunoForm;
