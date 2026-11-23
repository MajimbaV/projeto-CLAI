import { useState } from "react";

import FormField from "../../forms/FormField";
import FormSelect from "../../forms/FormSelect";
import FormTextarea from "../../forms/FormTextarea";
import FormCheckboxGroup from "../../forms/FormCheckboxGroup";

import "./RaiForm.css";

const QUANTIDADE_HABILIDADES = 7;

const VALORES_PADRAO = {
  alunoId: "",
  peiId: "",
  componenteCurricular: "",
  periodoLetivo: "",
  docente: "",

  relacionamento: [],
  relacionamentoOutro: "",
  comentarioRelacionamento: "",

  habilidadesCognitivas: [],
  habilidadesCognitivasOutro: "",
  comentarioHabilidadesCognitivas: "",

  habilidadesSocioemocionais: [],
  habilidadesSocioemocionaisOutro: "",
  comentarioHabilidadesSocioemocionais: "",

  avancosGerais: "",
  dificuldadesAprendizagem: "",
  fatoresExternos: "",

  habilidadesDesenvolvidas: Array.from(
    { length: QUANTIDADE_HABILIDADES },
    () => ({
      habilidade: "",
      nivelAprendizado: "",
      observacoes: "",
    }),
  ),

  parecer: "",
  data: "",
  assinaturaDocente: "",
};

const OPCOES_RELACIONAMENTO = [
  "Afetivo",
  "Agressivo",
  "Socializado",
  "Antissocial",
  "Outros",
];

const OPCOES_COGNITIVAS = [
  "Foco",
  "Memória",
  "Atenção",
  "Compreensão geral",
  "Criatividade",
  "Responsabilidades sociais",
  "Outros",
];

const OPCOES_SOCIOEMOCIONAIS = [
  "Empatia",
  "Autoestima",
  "Ética",
  "Autoconhecimento",
  "Confiança",
  "Compromisso",
  "Autonomia",
  "Criatividade",
  "Paciência",
  "Outros",
];

const OPCOES_NIVEL_APRENDIZADO = ["Satisfatório", "Bom", "Ótimo"];

function normalizarHabilidades(habilidades = []) {
  return Array.from({ length: QUANTIDADE_HABILIDADES }, (_, index) => ({
    habilidade: habilidades[index]?.habilidade ?? "",
    nivelAprendizado: habilidades[index]?.nivelAprendizado ?? "",
    observacoes: habilidades[index]?.observacoes ?? "",
  }));
}

function normalizarDefaultValues(defaultValues = {}) {
  const dados = defaultValues ?? {};

  return {
    ...VALORES_PADRAO,
    ...dados,

    alunoId: dados.alunoId ?? "",
    peiId: dados.peiId ?? "",

    relacionamento: Array.isArray(dados.relacionamento)
      ? [...dados.relacionamento]
      : [],

    habilidadesCognitivas: Array.isArray(dados.habilidadesCognitivas)
      ? [...dados.habilidadesCognitivas]
      : [],

    habilidadesSocioemocionais: Array.isArray(dados.habilidadesSocioemocionais)
      ? [...dados.habilidadesSocioemocionais]
      : [],

    habilidadesDesenvolvidas: normalizarHabilidades(
      dados.habilidadesDesenvolvidas,
    ),
  };
}

function obterNomeAluno(aluno) {
  return aluno?.alunoNome ?? aluno?.nome ?? "Não informado";
}

function obterMatriculaAluno(aluno) {
  return aluno?.alunoMatricula ?? aluno?.matricula ?? "Não informada";
}

function obterCursoAluno(aluno) {
  return aluno?.alunoCurso ?? aluno?.curso ?? "Não informado";
}

function obterNomePei(pei) {
  if (!pei) return "Não informado";

  return pei.titulo
    ? pei.titulo
    : (pei.id ?? pei._id)
      ? `PEI #${pei.id ?? pei._id}`
      : "PEI não identificado";
}

function obterErroCampo(campo, invalidFields, errors) {
  const erro = errors?.[campo] ?? invalidFields?.[campo];

  if (Array.isArray(erro)) {
    return erro.join(", ");
  }

  if (typeof erro === "object" && erro !== null) {
    return erro.message ?? erro.detail ?? "";
  }

  return erro ?? "";
}

export default function RaiForm(props) {
  const chaveDefaultValues = JSON.stringify(props.defaultValues ?? {});

  return <RaiFormContent key={chaveDefaultValues} {...props} />;
}

function RaiFormContent({
  defaultValues = null,
  mode = "create",
  onSubmit,
  onCancel,
  isPending = false,
  isLoading = false,
  error = null,
  errors = {},
  aluno = null,
  pei = null,
}) {
  const [formData, setFormData] = useState(() =>
    normalizarDefaultValues(defaultValues),
  );

  const [errosLocais, setErrosLocais] = useState({});

  const modoEdicao = mode === "edit" || mode === "editar";
  const formularioDesabilitado = isPending || isLoading;

  const alunoId =
    aluno?.id ?? aluno?._id ?? defaultValues?.alunoId ?? formData.alunoId;

  const peiId = pei?.id ?? pei?._id ?? defaultValues?.peiId ?? formData.peiId;

  const errorResponse = error?.response?.data || error?.data || {};

  const mensagemErro =
    errorResponse.detail || error?.detail || error?.message || "";

  const invalidFields = errorResponse.invalidFields || {};

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrosLocais((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function handleCheckboxChange(campo, value) {
    setFormData((prev) => ({
      ...prev,
      [campo]: value,
    }));
  }

  function handleHabilidadeChange(index, campo, value) {
    setFormData((prev) => ({
      ...prev,
      habilidadesDesenvolvidas: prev.habilidadesDesenvolvidas.map(
        (habilidade, currentIndex) =>
          currentIndex === index
            ? { ...habilidade, [campo]: value }
            : habilidade,
      ),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const novosErros = {};

    if (!alunoId) {
      novosErros.alunoId = "O aluno associado não foi identificado.";
    }

    if (!peiId) {
      novosErros.peiId = "O PEI associado não foi identificado.";
    }

    setErrosLocais(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    if (!onSubmit || formularioDesabilitado) {
      return;
    }

    const payload = {
      ...formData,
      alunoId,
      peiId,
      relacionamento: [...formData.relacionamento],
      habilidadesCognitivas: [...formData.habilidadesCognitivas],
      habilidadesSocioemocionais: [...formData.habilidadesSocioemocionais],
      habilidadesDesenvolvidas: formData.habilidadesDesenvolvidas.map(
        (habilidade) => ({ ...habilidade }),
      ),
    };

    onSubmit(payload);
  }

  return (
    <div className="rai-body">
      <div className="rai-header">
        <div>
          <h1 className="rai-title">
            {modoEdicao
              ? "Editar Relatório de Acompanhamento Individualizado"
              : "Novo Relatório de Acompanhamento Individualizado"}
          </h1>

          <p className="rai-subtitle">
            Registre o acompanhamento do estudante no componente curricular
            durante o período letivo.
          </p>
        </div>

        <span className="rai-private-label">Documento vinculado ao PEI</span>
      </div>

      <form className="rai-form" onSubmit={handleSubmit}>
        {mensagemErro && (
          <div className="rai-alert rai-alert-error" role="alert">
            {mensagemErro}
          </div>
        )}

        <section className="rai-section">
          <div className="rai-section-header">
            <h2>Identificação e vínculos</h2>

            <p>
              Confira os dados do estudante e do PEI ao qual este relatório
              estará associado.
            </p>
          </div>

          <div className="rai-associacoes">
            <div className="rai-associacao-card">
              <span className="rai-associacao-label">Estudante</span>

              <strong>{obterNomeAluno(aluno)}</strong>

              <span>Matrícula: {obterMatriculaAluno(aluno)}</span>

              <span>Curso: {obterCursoAluno(aluno)}</span>

              {errosLocais.alunoId && (
                <small className="rai-field-error">{errosLocais.alunoId}</small>
              )}
            </div>

            <div className="rai-associacao-card">
              <span className="rai-associacao-label">
                Plano de Ensino Individualizado
              </span>

              <strong>{obterNomePei(pei)}</strong>

              <span>Identificador: {peiId || "Não informado"}</span>

              {errosLocais.peiId && (
                <small className="rai-field-error">{errosLocais.peiId}</small>
              )}
            </div>
          </div>
        </section>

        <section className="rai-section">
          <div className="rai-section-header">
            <h2>Identificação do componente curricular</h2>

            <p>
              Informe o período, o componente curricular e o docente responsável
              pelo acompanhamento.
            </p>
          </div>

          <div className="rai-form-grid">
            <FormField
              name="periodoLetivo"
              label="Período letivo"
              value={formData.periodoLetivo}
              onChange={handleChange}
              placeholder="Ex.: 2026.1"
              disabled={formularioDesabilitado}
              error={obterErroCampo("periodoLetivo", invalidFields, errors)}
            />

            <FormField
              name="componenteCurricular"
              label="Componente curricular"
              value={formData.componenteCurricular}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              error={obterErroCampo(
                "componenteCurricular",
                invalidFields,
                errors,
              )}
            />

            <div className="rai-form-grid-full">
              <FormField
                name="docente"
                label="Docente"
                value={formData.docente}
                onChange={handleChange}
                disabled={formularioDesabilitado}
                error={obterErroCampo("docente", invalidFields, errors)}
              />
            </div>
          </div>
        </section>

        <section className="rai-section">
          <div className="rai-section-header">
            <h2>1. Aspectos observados</h2>

            <p>
              Selecione as características observadas durante o acompanhamento e
              registre comentários quando necessário.
            </p>
          </div>

          <div className="rai-checkbox-area">
            <div className="rai-checkbox-item">
              <FormCheckboxGroup
                name="relacionamento"
                label="Relacionamento"
                options={OPCOES_RELACIONAMENTO}
                value={formData.relacionamento}
                onChange={(value) =>
                  handleCheckboxChange("relacionamento", value)
                }
                disabled={formularioDesabilitado}
              />

              {formData.relacionamento.includes("Outros") && (
                <FormField
                  name="relacionamentoOutro"
                  label="Especifique outros aspectos do relacionamento"
                  value={formData.relacionamentoOutro}
                  onChange={handleChange}
                  disabled={formularioDesabilitado}
                />
              )}

              <FormTextarea
                name="comentarioRelacionamento"
                label="Comentário (se necessário)"
                value={formData.comentarioRelacionamento}
                onChange={handleChange}
                disabled={formularioDesabilitado}
                rows={3}
              />
            </div>

            <div className="rai-checkbox-item">
              <FormCheckboxGroup
                name="habilidadesCognitivas"
                label="Principais habilidades cognitivas"
                options={OPCOES_COGNITIVAS}
                value={formData.habilidadesCognitivas}
                onChange={(value) =>
                  handleCheckboxChange("habilidadesCognitivas", value)
                }
                disabled={formularioDesabilitado}
              />

              {formData.habilidadesCognitivas.includes("Outros") && (
                <FormField
                  name="habilidadesCognitivasOutro"
                  label="Especifique outras habilidades cognitivas"
                  value={formData.habilidadesCognitivasOutro}
                  onChange={handleChange}
                  disabled={formularioDesabilitado}
                />
              )}

              <FormTextarea
                name="comentarioHabilidadesCognitivas"
                label="Comentário (se necessário)"
                value={formData.comentarioHabilidadesCognitivas}
                onChange={handleChange}
                disabled={formularioDesabilitado}
                rows={3}
              />
            </div>

            <div className="rai-checkbox-item">
              <FormCheckboxGroup
                name="habilidadesSocioemocionais"
                label="Principais habilidades socioemocionais"
                options={OPCOES_SOCIOEMOCIONAIS}
                value={formData.habilidadesSocioemocionais}
                onChange={(value) =>
                  handleCheckboxChange("habilidadesSocioemocionais", value)
                }
                disabled={formularioDesabilitado}
              />

              {formData.habilidadesSocioemocionais.includes("Outros") && (
                <FormField
                  name="habilidadesSocioemocionaisOutro"
                  label="Especifique outras habilidades socioemocionais"
                  value={formData.habilidadesSocioemocionaisOutro}
                  onChange={handleChange}
                  disabled={formularioDesabilitado}
                />
              )}

              <FormTextarea
                name="comentarioHabilidadesSocioemocionais"
                label="Comentário (se necessário)"
                value={formData.comentarioHabilidadesSocioemocionais}
                onChange={handleChange}
                disabled={formularioDesabilitado}
                rows={3}
              />
            </div>
          </div>
        </section>

        <section className="rai-section">
          <div className="rai-section-header">
            <h2>2. Acompanhamento do estudante</h2>

            <p>
              Descreva os avanços, as dificuldades observadas e os fatores
              externos que influenciam o processo escolar.
            </p>
          </div>

          <div className="rai-section-content">
            <FormTextarea
              name="avancosGerais"
              label="Avanços gerais do(a) estudante no período"
              value={formData.avancosGerais}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              rows={5}
            />

            <FormTextarea
              name="dificuldadesAprendizagem"
              label="Relato das dificuldades de aprendizagem observadas"
              value={formData.dificuldadesAprendizagem}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              rows={5}
            />

            <FormTextarea
              name="fatoresExternos"
              label="Fatores externos que estejam influenciando no processo escolar"
              value={formData.fatoresExternos}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              rows={4}
            />
          </div>
        </section>

        <section className="rai-section">
          <div className="rai-section-header">
            <h2>3. Habilidades e competências desenvolvidas</h2>

            <p>
              Registre as habilidades desenvolvidas pelo estudante após as
              adaptações realizadas no componente curricular.
            </p>
          </div>

          <div className="rai-habilidade-list">
            {formData.habilidadesDesenvolvidas.map((habilidade, index) => (
              <div className="rai-habilidade-card" key={index}>
                <h3>Habilidade {index + 1}</h3>

                <div className="rai-habilidade-full">
                  <FormTextarea
                    name={`habilidade-${index}`}
                    label="Habilidade desenvolvida"
                    value={habilidade.habilidade}
                    onChange={(event) =>
                      handleHabilidadeChange(
                        index,
                        "habilidade",
                        event.target.value,
                      )
                    }
                    disabled={formularioDesabilitado}
                    rows={3}
                  />
                </div>

                <FormSelect
                  name={`nivelAprendizado-${index}`}
                  label="Nível de aprendizado"
                  value={habilidade.nivelAprendizado}
                  onChange={(event) =>
                    handleHabilidadeChange(
                      index,
                      "nivelAprendizado",
                      event.target.value,
                    )
                  }
                  options={OPCOES_NIVEL_APRENDIZADO}
                  placeholder="Selecione o nível"
                  disabled={formularioDesabilitado}
                />

                <FormTextarea
                  name={`observacoes-${index}`}
                  label="Observações"
                  value={habilidade.observacoes}
                  onChange={(event) =>
                    handleHabilidadeChange(
                      index,
                      "observacoes",
                      event.target.value,
                    )
                  }
                  disabled={formularioDesabilitado}
                  rows={3}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rai-section">
          <div className="rai-section-header">
            <h2>4. Parecer</h2>

            <p>
              Descreva os avanços do estudante, os objetivos previstos no Plano
              de Ensino Adaptado, as dificuldades e as propostas para a próxima
              etapa.
            </p>
          </div>

          <div className="rai-section-content">
            <FormTextarea
              name="parecer"
              label="Parecer do acompanhamento"
              value={formData.parecer}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              rows={8}
            />
          </div>

          <div className="rai-form-grid rai-assinatura">
            <FormField
              name="data"
              label="Data"
              type="date"
              value={formData.data}
              onChange={handleChange}
              disabled={formularioDesabilitado}
            />

            <FormField
              name="assinaturaDocente"
              label="Assinatura do(a) docente"
              value={formData.assinaturaDocente}
              onChange={handleChange}
              disabled={formularioDesabilitado}
            />
          </div>
        </section>

        <div className="rai-form-actions">
          <p className="rai-footer-note">
            Este relatório registra o acompanhamento individualizado do
            estudante no componente curricular e integra seu PEI.
          </p>

          <div className="rai-buttons-group">
            <button
              type="button"
              className="rai-btn-cancel"
              disabled={formularioDesabilitado}
              onClick={onCancel}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rai-btn-submit"
              disabled={formularioDesabilitado || !alunoId || !peiId}
            >
              {isPending
                ? "Salvando..."
                : modoEdicao
                  ? "Salvar alterações"
                  : "Salvar RAI"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
