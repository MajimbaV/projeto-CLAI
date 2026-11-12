import { useState } from "react";
import FormField from "../../forms/FormField";
import FormSelect from "../../forms/FormSelect";
import FormTextarea from "../../forms/FormTextarea";
import FormStringList from "../../forms/FormStringList";
import {
  validarPlanoAcao,
  prepararPayloadPlanoAcao,
} from "../../../utils/validarPlanoAcao";
import "./PlanoAcaoForm.css";

const OPCOES_SIM_NAO = [
  { value: "SIM", label: "Sim" },
  { value: "NAO", label: "Não" },
];

const CAMPOS_CLINICOS = [
  {
    campoAfirmacao: "comorbidadeRelevante",
    campoLista: "comorbidadeDescricao",
    pergunta: "Possui comorbidade relevante?",
    listaLabel: "Descreva as comorbidades",
  },
  {
    campoAfirmacao: "fazUsoMedicacao",
    campoLista: "medicacaoDescricao",
    pergunta: "Faz uso de medicação?",
    listaLabel: "Descreva as medicações em uso",
  },
  {
    campoAfirmacao: "frequentaServicoApoio",
    campoLista: "servicoApoioDescricao",
    pergunta: "Frequenta serviços de apoio?",
    listaLabel: "Descreva os serviços de apoio frequentados",
  },
  {
    campoAfirmacao: "apresentouDocumentos",
    campoLista: "documentosDescricao",
    pergunta: "Apresentou documentos comprobatórios?",
    listaLabel: "Descreva os documentos apresentados",
  },
];

const CAMPOS_DESCRITIVOS = [
  {
    campo: "necessidades",
    label: "Identificação das necessidades específicas",
    placeholder: "Descreva as necessidades específicas identificadas...",
  },
  {
    campo: "relatoDificuldades",
    label:
      "Relato de avanços, dificuldades e potencialidades no percurso educacional",
    placeholder: "Descreva avanços, dificuldades e potencialidades...",
  },
  {
    campo: "demandas",
    label: "Principais demandas identificadas",
    placeholder: "Descreva as principais demandas...",
  },
  {
    campo: "propostas",
    label: "Descrição das propostas iniciais de intervenção",
    placeholder: "Descreva as propostas iniciais de intervenção...",
  },
];

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
  const [errosLocais, setErrosLocais] = useState({});

  // Sincroniza os valores recebidos quando defaultValues muda de referência.
  const [syncedDefaultValues, setSyncedDefaultValues] = useState(defaultValues);
  if (defaultValues !== syncedDefaultValues) {
    setSyncedDefaultValues(defaultValues);
    setFormData(normalizarDefaultValues(defaultValues));
  }

  // Remove somente erros da validação local. Erros recebidos da API continuam
  // em `invalidFields`, sem serem misturados com o estado local.
  function limparErrosLocais(...campos) {
    setErrosLocais((prev) => {
      const proximos = { ...prev };
      let houveAlteracao = false;

      for (const campo of campos) {
        if (Object.prototype.hasOwnProperty.call(prev, campo)) {
          delete proximos[campo];
          houveAlteracao = true;
        }
      }

      return houveAlteracao ? proximos : prev;
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    limparErrosLocais(name);
  }

  // Ao mudar para NAO, limpa a lista correspondente no próprio estado.
  function handleAfirmacaoChange(campoAfirmacao, campoLista, event) {
    const novoValor = event.target.value;

    setFormData((prev) => ({
      ...prev,
      [campoAfirmacao]: novoValor,
      [campoLista]: novoValor === "NAO" ? [] : prev[campoLista],
    }));
    limparErrosLocais(campoAfirmacao, campoLista);
  }

  function handleListaChange(campoLista, novaLista) {
    setFormData((prev) => ({ ...prev, [campoLista]: novaLista }));
    limparErrosLocais(campoLista);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const erros = validarPlanoAcao(formData);
    setErrosLocais(erros);

    if (Object.keys(erros).length > 0) {
      return;
    }

    onSubmit?.(prepararPayloadPlanoAcao(formData));
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

  function erroDoCampo(campo) {
    return errosLocais[campo] || invalidFields[campo];
  }

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

      <form className="plano-acao-form" noValidate onSubmit={handleSubmit}>
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
              error={erroDoCampo("matricula")}
            />

            <FormField
              name="dataPlano"
              label="Data do Plano de Ação"
              type="date"
              value={formData.dataPlano}
              onChange={handleChange}
              required
              disabled={isPending}
              error={erroDoCampo("dataPlano")}
            />
          </div>
        </fieldset>

        <fieldset className="plano-acao-section">
          <legend>Informações clínicas e de apoio</legend>
          <span className="plano-acao-section-desc">
            Para cada pergunta respondida com "Sim", descreva ao menos um
            item na lista correspondente.
          </span>

          {CAMPOS_CLINICOS.map(
            ({ campoAfirmacao, campoLista, pergunta, listaLabel }) => (
              <div className="plano-acao-afirmacao-bloco" key={campoAfirmacao}>
                <FormSelect
                  name={campoAfirmacao}
                  label={pergunta}
                  value={formData[campoAfirmacao]}
                  onChange={(event) =>
                    handleAfirmacaoChange(campoAfirmacao, campoLista, event)
                  }
                  options={OPCOES_SIM_NAO}
                  required
                  disabled={isPending}
                  error={erroDoCampo(campoAfirmacao)}
                />

                {formData[campoAfirmacao] === "SIM" && (
                  <FormStringList
                    label={listaLabel}
                    items={formData[campoLista]}
                    onChange={(novaLista) =>
                      handleListaChange(campoLista, novaLista)
                    }
                    disabled={isPending}
                    error={erroDoCampo(campoLista)}
                  />
                )}
              </div>
            ),
          )}
        </fieldset>

        <fieldset className="plano-acao-section">
          <legend>Informações descritivas</legend>
          <span className="plano-acao-section-desc">
            Necessidades específicas, avanços, demandas e propostas de
            intervenção.
          </span>

          {CAMPOS_DESCRITIVOS.map(({ campo, label, placeholder }) => (
            <FormTextarea
              key={campo}
              name={campo}
              label={label}
              placeholder={placeholder}
              value={formData[campo]}
              onChange={handleChange}
              rows={4}
              required
              disabled={isPending}
              error={erroDoCampo(campo)}
            />
          ))}
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
              {isPending
                ? "Salvando..."
                : mode === "edit"
                  ? "Salvar alterações"
                  : "Cadastrar Plano de Ação"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlanoAcaoForm;
