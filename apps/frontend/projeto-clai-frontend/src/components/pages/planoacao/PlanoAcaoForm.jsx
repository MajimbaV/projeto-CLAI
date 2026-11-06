import { useState } from "react";
import FormField from "../../forms/FormField";
import FormSelect from "../../forms/FormSelect";
import "./PlanoAcaoForm.css";

const PLANO_VAZIO = {
  matricula: "",
  dataPlano: "",
  comorbidadeRelevante: "",
  comorbidadeDescricao: [],
  fazUsoMedicacao: "",
  medicacaoDescricao: [],
  frequentaServicoApoio: "",
  servicoApoioDescricao: [],
  apresentouDocumentos: "",
  documentosDescricao: [],

  necessidades: "",
  relatoDificuldades: "",
  demandas: "",
  propostas: "",
};

function normalizarDefaultValues(valores) {
  const normalizado = {};

  for (const chave of Object.keys(PLANO_VAZIO)) {
    const valorVazio = PLANO_VAZIO[chave];
    const valorRecebido = valores?.[chave];

    if (Array.isArray(valorVazio)) {
      normalizado[chave] = Array.isArray(valorRecebido)
        ? valorRecebido.filter((item) => typeof item === "string")
        : [];
    } else {
      normalizado[chave] =
        typeof valorRecebido === "string" ? valorRecebido : "";
    }
  }

  return normalizado;
}

function PlanoAcaoForm({
  onSubmit,
  onCancel,
  isPending = false,
  isLoading = false,
  error = null,
  defaultValues,
  mode = "create",
  alunos = [],
  isLoadingAlunos = false,
}) {
  const [formData, setFormData] = useState(() =>
    normalizarDefaultValues(defaultValues),
  );

  const [syncedDefaultValues, setSyncedDefaultValues] = useState(defaultValues);
  if (defaultValues !== syncedDefaultValues) {
    setSyncedDefaultValues(defaultValues);
    setFormData(normalizarDefaultValues(defaultValues));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit?.({ ...formData });
  }

  if (isLoading) {
    return (
      <div className="plano-acao-body">
        <p>Carregando dados do plano...</p>
      </div>
    );
  }

  const errorResponse = error?.response?.data || {};
  const invalidFields = errorResponse.invalidFields || {};
  const mensagemErro = errorResponse.detail || error?.message || null;

  const opcoesAlunos = alunos.map((aluno) => ({
    value: aluno.alunoMatricula,
    label: `${aluno.alunoNome || "Nome não informado"} — ${aluno.alunoMatricula}`,
  }));

  return (
    <div className="plano-acao-body">
      <div className="plano-acao-header">
        <h1 className="plano-acao-title">
          {mode === "edit" ? "Editar Plano de Ação" : "Novo Plano de Ação"}
        </h1>
        <span className="plano-acao-header-comment">* Campos obrigatórios</span>
      </div>

      <form className="plano-acao-form" onSubmit={handleSubmit}>
        {mensagemErro && (
          <div className="plano-acao-error-banner">
            <p>Erro: {mensagemErro}</p>
          </div>
        )}

        <fieldset className="plano-acao-section">
          <legend>Identificação</legend>
          <span className="plano-acao-section-desc">
            Aluno associado e data do Plano de Ação.
          </span>

          <div className="plano-acao-row">
            <FormSelect
              name="matricula"
              label="Aluno"
              value={formData.matricula}
              onChange={handleChange}
              options={opcoesAlunos}
              placeholder={
                isLoadingAlunos ? "Carregando alunos..." : "Selecione o aluno"
              }
              required
              disabled={isPending || isLoadingAlunos}
              error={invalidFields.matricula}
            />

            <FormField
              name="dataPlano"
              label="Data do Plano de Ação"
              type="date"
              value={formData.dataPlano}
              onChange={handleChange}
              required
              disabled={isPending}
              error={invalidFields.dataPlano}
            />
          </div>
        </fieldset>

        <fieldset className="plano-acao-section">
          <legend>Informações clínicas e de apoio</legend>
          <span className="plano-acao-section-desc">
            Comorbidades, medicação, serviços de apoio e documentos
            comprobatórios. Campos adicionados na próxima etapa.
          </span>
        </fieldset>

        <fieldset className="plano-acao-section">
          <legend>Informações descritivas</legend>
          <span className="plano-acao-section-desc">
            Necessidades específicas, avanços, demandas e propostas de
            intervenção. Campos adicionados na próxima etapa.
          </span>
        </fieldset>

        <div className="plano-acao-actions">
          <span className="plano-acao-footer-note">
            Os dados serão associados ao aluno selecionado.
          </span>

          <div className="plano-acao-buttons-group">
            <button
              type="button"
              className="plano-acao-btn-cancel"
              disabled={isPending}
              onClick={onCancel}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="plano-acao-btn-submit"
              disabled={isPending}
            >
              {isPending ? "Salvando..." : "Cadastrar Plano de Ação"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlanoAcaoForm;