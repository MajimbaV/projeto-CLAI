import { useState } from "react";
import FormField from "../../forms/FormField";
import FormSelect from "../../forms/FormSelect";
import FormStringList from "../../forms/FormStringList";
import "./PlanoAcaoForm.css";

const OPCOES_SIM_NAO = [
  { value: "SIM", label: "Sim" },
  { value: "NAO", label: "Não" },
];

// Configuração dos 4 pares pergunta (SIM/NAO) + lista condicional — evita
// repetir 4x o mesmo par de FormSelect/FormStringList no JSX. A ordem aqui
// é a mesma do PlanoAcaoRequestDto do back-end.
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

// Estado vazio — também serve de "esquema": normalizarDefaultValues usa o
// tipo de cada valor aqui (string vs array) para saber como normalizar o
// valor correspondente vindo de defaultValues.
const PLANO_VAZIO = {
  matricula: "",
  dataPlano: "",

  // Campos das Etapas 2/3 (toggles SIM/NAO e suas listas condicionais,
  // campos descritivos). Já fazem parte do formato do payload desde já —
  // só a UI para preenchê-los chega nos próximos commits.
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

// Usa exclusivamente as chaves de PLANO_VAZIO — chave extra em `valores` é
// ignorada. Para cada chave, olha o tipo do valor vazio correspondente:
// se for array, normaliza para array de strings, descartando qualquer item
// que não seja string; se for string, só aceita o valor recebido se ele de
// fato for uma string — um número, booleano ou objeto vira "" em vez de ser
// armazenado como está. Isso evita que um defaultValues malformado (ex.:
// uma API retornando um tipo inesperado) contamine o formData com um tipo
// que quebraria operações como .trim() mais adiante (validarPlanoAcao, no
// Commit 3). Mesma função tanto para o estado inicial quanto para repor o
// formData quando defaultValues mudar de referência.
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
  mode = "create", // "create" | "edit" — "edit" ainda não implementado, só reservado
  alunos = [],
  isLoadingAlunos = false,
}) {
  const [formData, setFormData] = useState(() =>
    normalizarDefaultValues(defaultValues),
  );

  // Repõe o formData quando defaultValues mudar de referência (ex.: a
  // matrícula identificada pela URL chegando de forma assíncrona, no fluxo
  // de edição futuro). Feito durante a própria renderização — e não em um
  // useEffect — seguindo o mesmo padrão já validado em AlunoForm.jsx contra
  // a regra react-hooks/set-state-in-effect do projeto.
  const [syncedDefaultValues, setSyncedDefaultValues] = useState(defaultValues);
  if (defaultValues !== syncedDefaultValues) {
    setSyncedDefaultValues(defaultValues);
    setFormData(normalizarDefaultValues(defaultValues));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Ao responder a afirmação, já limpa a lista correspondente se a resposta
  // for NAO — não basta só esconder a lista na UI, porque o estado (e,
  // futuramente, o payload) tem que respeitar a regra do back-end: "quando
  // NAO, a lista precisa permanecer vazia" (PlanoAcaoService.validarRegrasAdicionais).
  // Se isso ficasse só a cargo da validação no envio, um SIM -> preenche
  // lista -> NAO deixaria itens "fantasmas" no estado até o submit.
  function handleAfirmacaoChange(campoAfirmacao, campoLista, event) {
    const novoValor = event.target.value;

    setFormData((prev) => ({
      ...prev,
      [campoAfirmacao]: novoValor,
      [campoLista]: novoValor === "NAO" ? [] : prev[campoLista],
    }));
  }

  function handleListaChange(campoLista, novaLista) {
    setFormData((prev) => ({ ...prev, [campoLista]: novaLista }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validação completa chega na Etapa 3 (validarPlanoAcao). Por enquanto,
    // o envio só repassa o estado atual — estrutura, não comportamento.
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
                  error={invalidFields[campoAfirmacao]}
                />

                {formData[campoAfirmacao] === "SIM" && (
                  <FormStringList
                    label={listaLabel}
                    items={formData[campoLista]}
                    onChange={(novaLista) =>
                      handleListaChange(campoLista, novaLista)
                    }
                    disabled={isPending}
                    error={invalidFields[campoLista]}
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