import { useState } from "react";

import FormField from "../../forms/FormField";

import FormSelect from "../../forms/FormSelect";

import FormTextarea from "../../forms/FormTextarea";

import FormCheckboxGroup from "../../forms/FormCheckboxGroup";

import DocumentList from "../../forms/DocumentList";

import "./EstudoCasoForm.css";

import { mapearParaEstudoCasoDTO, mapearParaEstudoCasoDTOCombinado } from "../../../utils/estudoCasoMapper";

const DADOS_ALUNO_VAZIOS = {
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
};

const DIMENSOES_BARREIRAS = [
  "Acesso físico/ambiental",

  "Comunicação",

  "Currículo/metodologia",

  "Avaliação",

  "Organização/temporalidade",

  "Interação/participação",

  "Tecnologia assistiva/recursos",

  "Outra",
];

const OPCOES_ORIGEM = [
  "CLAI",

  "COPED",

  "CAEST",

  "Coordenação de Curso",

  "Docente",

  "Família",

  "Estudante",

  "Outro",
];

const OPCOES_SIM_NAO = [
  { value: "nao", label: "Não" },

  { value: "sim", label: "Sim" },
];

const CHECKLIST_APOIOS = [
  {
    key: "acessibilidade",

    label: "Acessibilidade e ambiente",

    options: [
      "Acesso físico",

      "Lugar em sala",

      "Iluminação",

      "Redução de estímulos",

      "Outro",
    ],
  },

  {
    key: "comunicacaoMateriais",

    label: "Comunicação e materiais",

    options: [
      "Material ampliado",

      "Libras/intérprete",

      "Linguagem objetiva",

      "Recursos visuais",

      "Outro",
    ],
  },

  {
    key: "metodologia",

    label: "Metodologia",

    options: [
      "Fragmentação de tarefas",

      "Mediação",

      "Antecipação de rotina",

      "Recursos concretos/digitais",

      "Outro",
    ],
  },

  {
    key: "avaliacao",

    label: "Avaliação",

    options: [
      "Tempo adicional",

      "Formato acessível",

      "Ambiente adequado",

      "Forma alternativa de resposta",

      "Outro",
    ],
  },

  {
    key: "curriculo",

    label: "Currículo",

    options: [
      "Adaptação de pequeno porte",

      "Adaptação de grande porte",

      "Temporalidade",

      "Priorização de objetivos",

      "Outro",
    ],
  },

  {
    key: "apoiosInstitucionais",

    label: "Apoios institucionais",

    options: [
      "Assistência estudantil",

      "Monitoria",

      "Assistente inclusivo",

      "Cuidador",

      "Psicopedagogia",

      "Outro",
    ],
  },
];

const CAMPOS_ANAMNESE = [
  {
    name: "historicoEscolar",

    label: "Histórico escolar (escolas, mudanças, retenções, interrupções)",
  },

  { name: "experienciasPositivas", label: "Experiências escolares positivas" },

  {
    name: "experienciasNegativas",

    label: "Experiências escolares negativas/barreiras vivenciadas",
  },

  {
    name: "adaptacoesRecursos",

    label: "Adaptações/recursos já utilizados e resultados",
  },

  {
    name: "conhecimentosConsolidados",

    label: "Objetivos/conhecimentos já consolidados",
  },

  { name: "areasFacilidade", label: "Áreas/disciplinas de maior facilidade" },

  { name: "areasDificuldade", label: "Áreas/disciplinas de maior dificuldade" },
];

const CAMPOS_PERFIL = [
  {
    name: "comunicacaoCompreensao",

    label: "Comunicação e compreensão de orientações",
  },

  { name: "leituraEscritaLinguagem", label: "Leitura, escrita e linguagem" },

  { name: "raciocinioLogico", label: "Raciocínio lógico-matemático" },

  { name: "atencaoMemoria", label: "Atenção, memória e funções executivas" },

  {
    name: "organizacaoTarefas",

    label: "Organização, planejamento e realização de tarefas",
  },

  { name: "interacaoSocial", label: "Interação social e participação em sala" },

  { name: "aspectosSensoriais", label: "Aspectos sensoriais relevantes" },

  {
    name: "mobilidadeTecnologia",

    label: "Mobilidade, acesso físico e uso de tecnologias/recursos",
  },

  { name: "autonomiaFamiliar", label: "Autonomia no contexto familiar" },

  { name: "autonomiaEscolar", label: "Autonomia no contexto escolar" },

  {
    name: "estrategiasAprendizagem",

    label: "Estratégias que favorecem a aprendizagem",
  },

  {
    name: "situacoesDificultam",

    label: "Situações que dificultam/desorganizam a aprendizagem",
  },
];

const CAMPOS_CONTEXTO = [
  {
    name: "relacaoCursoExpectativas",

    label: "Relação com o curso e expectativas acadêmicas/profissionais",
  },

  { name: "redeApoio", label: "Rede de apoio familiar/social" },

  {
    name: "fatoresPsicossociais",

    label: "Conflitos ou fatores psicossociais com repercussão acadêmica",
  },

  {
    name: "frequenciaRotina",

    label: "Observações sobre frequência, rotina e permanência",
  },
];

const CAMPOS_POTENCIALIDADES = [
  { name: "potencialidadesAcademicas", label: "Potencialidades acadêmicas" },

  { name: "interessesHabilidades", label: "Interesses/habilidades" },

  {
    name: "preferenciasAprendizagem",

    label: "Formas preferenciais de aprender e demonstrar conhecimento",
  },

  {
    name: "recursosPessoaisTecnologicos",

    label: "Recursos pessoais/tecnológicos que favorecem o desempenho",
  },
];

const CAMPOS_SINTESE = [
  {
    name: "sinteseNecessidades",

    label: "A) Identificação da(s) necessidade(s) específica(s)",
  },

  {
    name: "sinteseAvancos",

    label: "B) Avanços e objetivos/conhecimentos já alcançados",
  },

  {
    name: "sinteseBarreiras",

    label: "C) Dificuldades/barreiras com repercussão educacional",
  },

  {
    name: "sintesePotencialidades",

    label: "D) Potencialidades e condições facilitadoras",
  },

  {
    name: "sinteseDemandas",

    label: "E) Principais demandas identificadas no caso",
  },
];

function criarEstudoCasoVazio() {
  const dados = {
    dataAtendimentos: "",

    profissionalResponsavel: "",

    origemEncaminhamento: "",

    origemOutro: "",

    motivoPrincipal: "",

    demandaEstudante: "",

    demandaFamilia: "",

    demandaEquipe: "",

    necessidadeEspecifica: "",

    diagnosticos: "",

    documentosApresentados: "nao",

    documentos: [],

    condicaoAssociada: "nao",

    condicaoAssociadaQual: "",

    medicacaoContinua: "nao",

    medicacaoQual: "",

    encaminhamentosAnteriores: "",

    servicosApoio: "",

    relacaoCursoExpectativas: "",

    redeApoio: "",

    fatoresPsicossociais: "",

    frequenciaRotina: "",

    potencialidadesAcademicas: "",

    interessesHabilidades: "",

    preferenciasAprendizagem: "",

    recursosPessoaisTecnologicos: "",

    sinteseNecessidades: "",

    sinteseAvancos: "",

    sinteseBarreiras: "",

    sintesePotencialidades: "",

    sinteseDemandas: "",

    encaminhamentosExternos: "",

    assinaturaPsicopedagogo: "",

    assinaturaCoordenador: "",

    dataEstudoCaso: "",

    apoios: Object.fromEntries(
      CHECKLIST_APOIOS.flatMap(({ key }) => [
        [key, []],

        [`${key}Outro`, ""],
      ]),
    ),

    barreiras: DIMENSOES_BARREIRAS.map((dimensao) => ({
      dimensao,

      identificada: "",

      evidenciasImpactos: "",

      prioridade: "",
    })),
  };

  for (const campo of [...CAMPOS_ANAMNESE, ...CAMPOS_PERFIL]) {
    dados[campo.name] = "";
  }

  return dados;
}

function obterMatricula(aluno) {
  return String(aluno?.alunoMatricula ?? aluno?.matricula ?? "");
}

function obterChaveAluno(aluno) {
  return String(aluno?.id ?? "");
}

function obterNomeAluno(aluno) {
  return aluno?.alunoNome ?? aluno?.nome ?? "";
}

function obterCursoAluno(aluno) {
  return aluno?.alunoCurso ?? aluno?.curso ?? "";
}

function estudanteMenorDeIdade(dataNascimento) {
  if (!dataNascimento) return false;

  const hoje = new Date();

  const nascimento = new Date(`${dataNascimento}T00:00:00`);

  if (Number.isNaN(nascimento.getTime())) return false;

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade -= 1;
  }

  return idade < 18;
}

function FormSection({ title, description, children, defaultOpen = false }) {
  const [aberta, setAberta] = useState(defaultOpen);

  function alternarSecao() {
    setAberta((atual) => !atual);
  }

  return (
    <section
      className={`estudo-section ${aberta ? "estudo-section-aberta" : ""}`}
    >
      <h2 className="estudo-section-heading">
        <button
          type="button"
          className="estudo-section-toggle"
          onClick={alternarSecao}
          aria-expanded={aberta}
        >
          <span className="estudo-section-title">{title}</span>
          <span
            className={`estudo-section-chevron ${aberta ? "expandido" : ""}`}
            aria-hidden="true"
          >
            ⌄
          </span>
        </button>
      </h2>

      {aberta && (
        <div className="estudo-section-panel">
          {description && (
            <p className="estudo-section-description">{description}</p>
          )}
          <div className="estudo-section-content">{children}</div>
        </div>
      )}
    </section>
  );
}

function CampoTextoLongo({ campo, values, onChange, disabled }) {
  return (
    <FormTextarea
      key={campo.name}
      name={campo.name}
      label={campo.label}
      value={values[campo.name]}
      onChange={onChange}
      disabled={disabled}
      rows={3}
    />
  );
}

export default function EstudoCasoForm({
  modo = "novo",

  alunos = [],

  alunoInicial = null,

  isLoadingAlunos = false,

  isPending = false,

  error = null,

  onSubmit,

  onCancel,
}) {

  const [alunoData, setAlunoData] = useState( alunoInicial ? () => ({ ...alunoInicial }) : () => ({ ...DADOS_ALUNO_VAZIOS }));

  const [estudoCaso, setEstudoCaso] = useState(criarEstudoCasoVazio);

  const [idAlunoSelecionado, setIdAlunoSelecionado] = useState(
    obterChaveAluno(alunoInicial)
  );

  const [feedback, setFeedback] = useState("");

  const [cadastroCombinado, setCadastroCombinado] = useState(false);

  const alunosDisponiveis = [...alunos];

  const alunoSelecionado = alunosDisponiveis.find(
    (aluno) => obterChaveAluno(aluno) === idAlunoSelecionado,
  ) || alunoInicial;

  const errorResponse = error?.response?.data || {};

  const errorText = errorResponse.detail || error?.message || "";

  const invalidFields = errorResponse.invalidFields || {};

  const menorDeIdade = estudanteMenorDeIdade(alunoData.alunoNascimento);

  function handleAlunoChange(event) {
    const { name, value } = event.target;

    setAlunoData((prev) => ({ ...prev, [name]: value }));
  }

  function handleCasoChange(event) {
    const { name, value } = event.target;

    setEstudoCaso((prev) => ({ ...prev, [name]: value }));
  }

  function handleApoioChange(key, value) {
    setEstudoCaso((prev) => ({
      ...prev,

      apoios: { ...prev.apoios, [key]: value },
    }));
  }

  function handleBarreiraChange(index, key, value) {
    setEstudoCaso((prev) => ({
      ...prev,

      barreiras: prev.barreiras.map((barreira, currentIndex) =>
        currentIndex === index ? { ...barreira, [key]: value } : barreira,
      ),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");

    if (!cadastroCombinado && !alunoSelecionado) {
      setFeedback(
        "Selecione um estudante antes de preencher o estudo de caso.",
      );

      return;
    }

    if (cadastroCombinado) {
      const alunoPayload = {
        ...alunoData
      }

      if (!menorDeIdade) {
        alunoPayload.nomeResponsavel = null
        alunoPayload.grauParentesco = null
        alunoPayload.responsavelTelefone = null;
        alunoPayload.responsavelEmail = null;
      }

      const payloadCombinado = mapearParaEstudoCasoDTOCombinado(estudoCaso, alunoData, "INCOMPLETO");

      onSubmit(payloadCombinado);
      return;
    }

    const payloadEstudoCaso = mapearParaEstudoCasoDTO(estudoCaso, alunoSelecionado.id, "INCOMPLETO");

    onSubmit(payloadEstudoCaso);
  }

  return (
    <div className="estudo-caso-body">
      <div className="estudo-caso-header">
        <div>
          <h1 className="estudo-caso-title">
            {modo === "editar"
              ? "Editar Estudo de Caso"
              : "Novo Estudo de Caso"}  
          </h1>

          <p className="estudo-caso-subtitle">
            Preencha as informações pertinentes ao acompanhamento educacional do
            estudante.
          </p>
        </div>

        <span className="estudo-caso-private-label">
          Uso institucional restrito
        </span>
      </div>

      <form className="estudo-caso-form" onSubmit={handleSubmit}>
        {(errorText || feedback) && (
          <div
            className={
              errorText ? "estudo-alert estudo-alert-error" : "estudo-alert"
            }
            role="status"
          >
            {errorText || feedback}
          </div>
        )}

        <FormSection
          title="1. Identificação do(a) estudante"
          description="Os dados acadêmicos são vinculados ao estudante selecionado ou ao cadastro realizado nesta página."
          defaultOpen={!cadastroCombinado}
        >
          {!alunoInicial && (
            <>
              <label className="clai-checkbox-option" htmlFor="checkboxCadastroCombinado" key="checkboxCadastroCombinado">
                <input
                  id="checkboxCadastroCombinado"
                  type="checkbox"
                  name="checkboxCadastroCombinado"
                  checked={cadastroCombinado}
                  onChange={() => setCadastroCombinado(!cadastroCombinado)}
                />
                <span>Criar Novo Aluno</span>
              </label>

              {!cadastroCombinado && (
                <div className="estudo-form-grid">
                  <FormSelect
                    name="estudanteSelecionado"
                    label="Selecione o estudante"
                    value={idAlunoSelecionado}
                    onChange={(event) =>
                      setIdAlunoSelecionado(event.target.value)
                    }
                    options={alunosDisponiveis.map((aluno) => ({
                      value: obterChaveAluno(aluno),

                      label: `${obterNomeAluno(aluno) || "Nome não informado"} — ${obterMatricula(aluno) || obterChaveAluno(aluno)}`,
                    }))}
                    placeholder={
                      isLoadingAlunos
                        ? "Carregando estudantes..."
                        : "Selecione o estudante"
                    }
                    required
                    disabled={isPending || isLoadingAlunos}
                  />
                </div>
              )}

              {!isLoadingAlunos && alunosDisponiveis.length === 0 && (
                <p className="estudo-helper-text">
                  A lista de estudantes ainda precisa ser conectada à consulta
                  de alunos da API.
                </p>
              )}


            </>
          )}


              {alunoSelecionado && !cadastroCombinado && (
                <div className="estudo-student-summary">
                  <strong>
                    {obterNomeAluno(alunoSelecionado) || "Nome não informado"}
                  </strong>

                  <span>
                    Matrícula:{" "}
                    {obterMatricula(alunoSelecionado) || "Não informada"}
                  </span>

                  <span>
                    Curso/turma:{" "}
                    {obterCursoAluno(alunoSelecionado) || "Não informado"}
                  </span>

                  <span>
                    Período letivo:{" "}
                    {alunoSelecionado.periodoAluno || "Não informado"}
                  </span>

                  <span>
                    Período de ingresso:{" "}
                    {alunoSelecionado.periodoIngresso ||
                      alunoSelecionado.log ||
                      "Não informado"}
                  </span>
                </div>
              )}

          {cadastroCombinado && (
            <>
              <div className="estudo-form-grid">
                <FormField
                  name="alunoNome"
                  label="Nome do aluno"
                  value={alunoData.alunoNome}
                  onChange={handleAlunoChange}
                  required
                  disabled={isPending}
                  error={invalidFields.alunoNome}
                />

                <FormField
                  name="alunoNascimento"
                  label="Data de nascimento"
                  type="date"
                  value={alunoData.alunoNascimento}
                  onChange={handleAlunoChange}
                  required
                  disabled={isPending}
                  error={invalidFields.alunoNascimento}
                />

                <FormField
                  name="alunoTelefone"
                  label="Telefone do aluno"
                  value={alunoData.alunoTelefone}
                  onChange={handleAlunoChange}
                  placeholder="DDD e número"
                  disabled={isPending}
                  error={invalidFields.alunoTelefone}
                />

                <FormField
                  name="alunoEmail"
                  label="E-mail do aluno"
                  type="email"
                  value={alunoData.alunoEmail}
                  onChange={handleAlunoChange}
                  placeholder="aluno@email.com"
                  disabled={isPending}
                  error={invalidFields.alunoEmail}
                />

                <FormField
                  name="alunoMatricula"
                  label="Matrícula"
                  value={alunoData.alunoMatricula}
                  onChange={handleAlunoChange}
                  required
                  disabled={isPending}
                  error={invalidFields.alunoMatricula}
                />

                <FormField
                  name="alunoCurso"
                  label="Curso/turma"
                  value={alunoData.alunoCurso}
                  onChange={handleAlunoChange}
                  required
                  disabled={isPending}
                  error={invalidFields.alunoCurso}
                />

                <FormField
                  name="periodoIngresso"
                  label="Período de ingresso"
                  value={alunoData.periodoIngresso}
                  onChange={handleAlunoChange}
                  placeholder="Ex.: 2026.1"
                  required
                  disabled={isPending}
                  error={invalidFields.periodoIngresso}
                />

                <FormField
                  name="periodoAluno"
                  label="Período letivo"
                  value={alunoData.periodoAluno}
                  onChange={handleAlunoChange}
                  placeholder="Ex.: 2026.2"
                  required
                  disabled={isPending}
                  error={invalidFields.periodoAluno}
                />
              </div>

              <div className="estudo-form-grid estudo-guardian-grid">
                  <FormField
                    name="nomeResponsavel"
                    label="Nome do responsável"
                    value={alunoData.nomeResponsavel}
                    onChange={handleAlunoChange}
                    disabled={isPending}
                    error={invalidFields.nomeResponsavel}
                  />

                  <FormField
                    name="grauParentesco"
                    label="Grau de parentesco"
                    value={alunoData.grauParentesco}
                    onChange={handleAlunoChange}
                    disabled={isPending}
                    error={invalidFields.grauParentesco}
                  />

                  <FormField
                    name="responsavelTelefone"
                    label="Telefone do responsável"
                    value={alunoData.responsavelTelefone}
                    onChange={handleAlunoChange}
                    disabled={isPending}
                    error={invalidFields.responsavelTelefone}
                  />

                  <FormField
                    name="responsavelEmail"
                    label="E-mail do responsável"
                    type="email"
                    value={alunoData.responsavelEmail}
                    onChange={handleAlunoChange}
                    disabled={isPending}
                    error={invalidFields.responsavelEmail}
                  />
                </div>
            </>
          )}

          <div className="estudo-form-grid estudo-top-spacing">
            <FormField
              name="dataAtendimentos"
              label="Data(s) do atendimento/anamnese"
              value={estudoCaso.dataAtendimentos}
              onChange={handleCasoChange}
              placeholder="Informe uma ou mais datas (Separadas por vírgula)"
              disabled={isPending}
            />

            <FormField
              name="profissionalResponsavel"
              label="Profissional responsável pelo estudo de caso"
              value={estudoCaso.profissionalResponsavel}
              onChange={handleCasoChange}
              disabled={isPending}
            />
          </div>
        </FormSection>

        <FormSection
          title="2. Motivo do encaminhamento e demanda inicial"
          description="Registre a origem do encaminhamento, a demanda relatada e as expectativas em relação ao acompanhamento."
        >
          <div className="estudo-form-grid">
            <FormSelect
              name="origemEncaminhamento"
              label="Origem do encaminhamento"
              value={estudoCaso.origemEncaminhamento}
              onChange={handleCasoChange}
              options={OPCOES_ORIGEM}
              disabled={isPending}
            />

            {estudoCaso.origemEncaminhamento === "Outro" && (
              <FormField
                name="origemOutro"
                label="Especifique a origem"
                value={estudoCaso.origemOutro}
                onChange={handleCasoChange}
                disabled={isPending}
              />
            )}
          </div>

          <FormTextarea
            name="motivoPrincipal"
            label="Motivo principal"
            value={estudoCaso.motivoPrincipal}
            onChange={handleCasoChange}
            disabled={isPending}
          />

          <div className="estudo-form-grid">
            <FormTextarea
              name="demandaEstudante"
              label="Demanda percebida pelo(a) estudante"
              value={estudoCaso.demandaEstudante}
              onChange={handleCasoChange}
              disabled={isPending}
            />

            <FormTextarea
              name="demandaFamilia"
              label="Demanda percebida pela família/responsável"
              value={estudoCaso.demandaFamilia}
              onChange={handleCasoChange}
              disabled={isPending}
            />
          </div>

          <FormTextarea
            name="demandaEquipe"
            label="Demanda percebida pela equipe escolar"
            value={estudoCaso.demandaEquipe}
            onChange={handleCasoChange}
            disabled={isPending}
          />
        </FormSection>

        <FormSection
          title="3. Dados sobre a necessidade específica e documentação"
          description="Registre apenas informações pertinentes à compreensão das condições de aprendizagem, participação e acessibilidade."
        >
          <FormTextarea
            name="necessidadeEspecifica"
            label="Deficiência/necessidade específica informada"
            value={estudoCaso.necessidadeEspecifica}
            onChange={handleCasoChange}
            disabled={isPending}
          />

          <FormTextarea
            name="diagnosticos"
            label="Diagnóstico(s), quando houver"
            value={estudoCaso.diagnosticos}
            onChange={handleCasoChange}
            disabled={isPending}
          />

          <div className="estudo-form-grid">
            <FormSelect
              name="documentosApresentados"
              label="Documentos comprobatórios apresentados"
              value={estudoCaso.documentosApresentados}
              onChange={handleCasoChange}
              options={OPCOES_SIM_NAO}
              disabled={isPending}
            />

            {estudoCaso.documentosApresentados === "sim" && (
              <FormField
                name="documentosQuais"
                label="Quais documentos?"
                value={estudoCaso.documentosQuais}
                onChange={handleCasoChange}
                disabled={isPending}
              />
            )}
          </div>

          {estudoCaso.documentosApresentados === "sim" && (
              <DocumentList
                documentos={estudoCaso.documentos}
                onChange={(novosDocumentos) => handleCasoChange({ target: { name: "documentos", value: novosDocumentos } })}
              >
              </DocumentList>
          )}

          {estudoCaso.documentosApresentados === "sim" && (
            <FormField
              name="documentosDataProfissional"
              label="Data/profissional dos documentos"
              value={estudoCaso.documentosDataProfissional}
              onChange={handleCasoChange}
              disabled={isPending}
            />
          )}

          <div className="estudo-form-grid">
            <FormSelect
              name="condicaoAssociada"
              label="Condição associada"
              value={estudoCaso.condicaoAssociada}
              onChange={handleCasoChange}
              options={OPCOES_SIM_NAO}
              disabled={isPending}
            />

            {estudoCaso.condicaoAssociada === "sim" && (
              <FormField
                name="condicaoAssociadaQual"
                label="Qual(is)?"
                value={estudoCaso.condicaoAssociadaQual}
                onChange={handleCasoChange}
                disabled={isPending}
              />
            )}
          </div>

          <div className="estudo-form-grid">
            <FormSelect
              name="medicacaoContinua"
              label="Medicação de uso contínuo"
              value={estudoCaso.medicacaoContinua}
              onChange={handleCasoChange}
              options={OPCOES_SIM_NAO}
              disabled={isPending}
            />

            {estudoCaso.medicacaoContinua === "sim" && (
              <FormField
                name="medicacaoQual"
                label="Qual(is)?"
                value={estudoCaso.medicacaoQual}
                onChange={handleCasoChange}
                disabled={isPending}
              />
            )}
          </div>

          <FormTextarea
            name="encaminhamentosAnteriores"
            label="Encaminhamentos anteriores"
            value={estudoCaso.encaminhamentosAnteriores}
            onChange={handleCasoChange}
            disabled={isPending}
          />

          <FormTextarea
            name="servicosApoio"
            label="Serviços de apoio atuais/anteriores"
            value={estudoCaso.servicosApoio}
            onChange={handleCasoChange}
            disabled={isPending}
          />
        </FormSection>

        <FormSection
          title="4. Anamnese — histórico de desenvolvimento e vida escolar"
          description="Registre apenas informações pertinentes à compreensão das condições de aprendizagem, participação, autonomia e acessibilidade."
        >
          <div className="estudo-form-grid">
            {CAMPOS_ANAMNESE.map((campo) => (
              <CampoTextoLongo
                key={campo.name}
                campo={campo}
                values={estudoCaso}
                onChange={handleCasoChange}
                disabled={isPending}
              />
            ))}
          </div>
        </FormSection>

        <FormSection
          title="5. Perfil de aprendizagem, comunicação, participação e autonomia"
          description="Descreva o funcionamento do estudante no contexto educacional, evitando reduzir o caso ao diagnóstico."
        >
          <div className="estudo-form-grid">
            {CAMPOS_PERFIL.map((campo) => (
              <CampoTextoLongo
                key={campo.name}
                campo={campo}
                values={estudoCaso}
                onChange={handleCasoChange}
                disabled={isPending}
              />
            ))}
          </div>
        </FormSection>

        <FormSection title="6. Contexto psicossocial e escolha/pertencimento ao curso">
          <div className="estudo-form-grid">
            {CAMPOS_CONTEXTO.map((campo) => (
              <CampoTextoLongo
                key={campo.name}
                campo={campo}
                values={estudoCaso}
                onChange={handleCasoChange}
                disabled={isPending}
              />
            ))}
          </div>
        </FormSection>

        <FormSection
          title="7. Potencialidades, interesses e recursos do(a) estudante"
          description="Registre capacidades, interesses, formas de expressão, estratégias próprias e recursos que ampliam a participação e aprendizagem."
        >
          <div className="estudo-form-grid">
            {CAMPOS_POTENCIALIDADES.map((campo) => (
              <CampoTextoLongo
                key={campo.name}
                campo={campo}
                values={estudoCaso}
                onChange={handleCasoChange}
                disabled={isPending}
              />
            ))}
          </div>
        </FormSection>

        <FormSection
          title="8. Barreiras e necessidades educacionais identificadas"
          description="Identifique barreiras observadas ou relatadas e seus impactos no acesso, participação, aprendizagem e avaliação."
        >
          <div className="estudo-barrier-list">
            {estudoCaso.barreiras.map((barreira, index) => (
              <div className="estudo-barrier-card" key={barreira.dimensao}>
                <h3>{barreira.dimensao}</h3>

                <FormTextarea
                  name={`barreira-${index}-identificada`}
                  label="Barreira/necessidade identificada"
                  value={barreira.identificada}
                  onChange={(event) =>
                    handleBarreiraChange(
                      index,

                      "identificada",

                      event.target.value,
                    )
                  }
                  disabled={isPending}
                  rows={2}
                  error={invalidFields[`necessidadesEducacionais.barreiras[${index}]`]}
                />

                <FormTextarea
                  name={`barreira-${index}-evidencias`}
                  label="Evidências/impactos na aprendizagem"
                  value={barreira.evidenciasImpactos}
                  onChange={(event) =>
                    handleBarreiraChange(
                      index,

                      "evidenciasImpactos",

                      event.target.value,
                    )
                  }
                  disabled={isPending}
                  rows={2}
                />

                <FormSelect
                  name={`barreira-${index}-prioridade`}
                  label="Prioridade"
                  value={barreira.prioridade}
                  onChange={(event) =>
                    handleBarreiraChange(
                      index,

                      "prioridade",

                      event.target.value,
                    )
                  }
                  options={["Alta", "Média", "Baixa"]}
                  disabled={isPending}
                  placeholder="Defina a prioridade"
                />
              </div>
            ))}
          </div>
        </FormSection>

        <FormSection
          title="9. Síntese psicopedagógica do estudo de caso"
          description="Síntese construída a partir da anamnese, escuta, observação e documentos disponíveis, que poderá apoiar o Plano de Ação da CLAI."
        >
          <div className="estudo-form-grid">
            {CAMPOS_SINTESE.map((campo) => (
              <CampoTextoLongo
                key={campo.name}
                campo={campo}
                values={estudoCaso}
                onChange={handleCasoChange}
                disabled={isPending}
              />
            ))}
          </div>
        </FormSection>

        <FormSection title="10. Checklist de apoios/adaptações a considerar">
          <div className="estudo-checklist-list">
            {CHECKLIST_APOIOS.map((grupo) => (
              <div className="estudo-checklist-item" key={grupo.key}>
                <FormCheckboxGroup
                  name={grupo.key}
                  label={grupo.label}
                  options={grupo.options}
                  value={estudoCaso.apoios[grupo.key]}
                  onChange={(value) => handleApoioChange(grupo.key, value)}
                  disabled={isPending}
                />

                {estudoCaso.apoios[grupo.key].includes("Outro") && (
                  <FormField
                    name={`${grupo.key}Outro`}
                    label="Especifique outra opção"
                    value={estudoCaso.apoios[`${grupo.key}Outro`]}
                    onChange={(event) =>
                      handleApoioChange(`${grupo.key}Outro`, event.target.value)
                    }
                    disabled={isPending}
                  />
                )}
              </div>
            ))}
          </div>

          <FormTextarea
            name="encaminhamentosExternos"
            label="Apoios externos/encaminhamentos"
            value={estudoCaso.encaminhamentosExternos}
            onChange={handleCasoChange}
            disabled={isPending}
          />

          <div className="estudo-form-grid estudo-signatures">
            <FormField
              name="assinaturaPsicopedagogo"
              label="Profissional psicopedagogo(a)"
              value={estudoCaso.assinaturaPsicopedagogo}
              onChange={handleCasoChange}
              disabled={isPending}
            />

            <FormField
              name="assinaturaCoordenador"
              label="Coordenador(a) da CLAI"
              value={estudoCaso.assinaturaCoordenador}
              onChange={handleCasoChange}
              disabled={isPending}
            />

            <FormField
              name="dataEstudoCaso"
              label="Data"
              type="date"
              value={estudoCaso.dataEstudoCaso}
              onChange={handleCasoChange}
              disabled={isPending}
            />
          </div>
        </FormSection>

        <div className="estudo-form-actions">
          <p className="estudo-footer-note">
            Preencha somente informações pertinentes ao acompanhamento
            educacional.
          </p>

          <div className="estudo-buttons-group">
            <button
              type="button"
              className="estudo-btn-cancel"
              disabled={isPending}
              onClick={onCancel}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="estudo-btn-submit"
              disabled={isPending}
            >
              {isPending
                ? "Salvando..."
                : cadastroCombinado
                  ? "Cadastrar aluno e estudo de caso"
                  : "Salvar estudo de caso"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
