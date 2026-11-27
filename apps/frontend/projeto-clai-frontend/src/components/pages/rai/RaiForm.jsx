import { useState } from "react";

import FormField from "../../forms/FormField";
import FormTextarea from "../../forms/FormTextarea";

import "./RaiForm.css";

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

const NIVEIS_APRENDIZADO = ["Satisfatório", "Bom", "Ótimo"];

function criarHabilidadeVazia() {
  return {
    habilidadeDesenvolvida: "",
    nivelAprendizado: "",
    observacoes: "",
  };
}

function criarValoresPadrao() {
  return {
    periodoLetivo: "",
    componenteCurricular: "",
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
    habilidadesCompetencias: [],
    parecer: "",
    data: "",
  };
}

function normalizarDefaultValues(defaultValues = {}) {
  const valores = {
    ...criarValoresPadrao(),
    ...defaultValues,
  };

  valores.relacionamento = Array.isArray(defaultValues.relacionamento)
    ? [...defaultValues.relacionamento]
    : [];

  valores.habilidadesCognitivas = Array.isArray(
    defaultValues.habilidadesCognitivas,
  )
    ? [...defaultValues.habilidadesCognitivas]
    : [];

  valores.habilidadesSocioemocionais = Array.isArray(
    defaultValues.habilidadesSocioemocionais,
  )
    ? [...defaultValues.habilidadesSocioemocionais]
    : [];

  valores.habilidadesCompetencias = Array.isArray(
    defaultValues.habilidadesCompetencias,
  )
    ? defaultValues.habilidadesCompetencias.map((habilidade) => ({
        habilidadeDesenvolvida: habilidade?.habilidadeDesenvolvida ?? "",
        nivelAprendizado: habilidade?.nivelAprendizado ?? "",
        observacoes: habilidade?.observacoes ?? "",
      }))
    : [];

  // Compatibilidade com registros antigos.
  // A assinatura não faz mais parte do formulário.
  delete valores.assinaturaDocente;

  return valores;
}

function obterErroCampo(campo, invalidFields, errors) {
  const erro = errors?.[campo] ?? invalidFields?.[campo];

  if (Array.isArray(erro)) return erro.join(", ");

  if (typeof erro === "object" && erro !== null) {
    return erro.message ?? erro.detail ?? "";
  }

  return erro ?? "";
}

function FormSection({ title, description, children }) {
  return (
    <section className="rai-section">
      <div className="rai-section-header">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      <div className="rai-section-content">{children}</div>
    </section>
  );
}

function GrupoCheckbox({ name, label, options, value, onChange, disabled }) {
  function alternarOpcao(opcao, marcado) {
    const selecionadas = marcado
      ? [...value, opcao]
      : value.filter((item) => item !== opcao);

    onChange(selecionadas);
  }

  return (
    <fieldset className="rai-checkbox-fieldset" disabled={disabled}>
      <legend>{label}</legend>

      <div className="rai-checkbox-options">
        {options.map((opcao, index) => {
          const id = `${name}-${index}`;

          return (
            <label className="rai-checkbox-option" htmlFor={id} key={opcao}>
              <input
                id={id}
                type="checkbox"
                checked={value.includes(opcao)}
                onChange={(event) => alternarOpcao(opcao, event.target.checked)}
              />

              <span>{opcao}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function obterNomeAluno(aluno, defaultValues) {
  return aluno?.alunoNome ?? aluno?.nome ?? defaultValues?.alunoNome ?? "";
}

function obterMatriculaAluno(aluno, defaultValues) {
  return (
    aluno?.alunoMatricula ??
    aluno?.matricula ??
    defaultValues?.alunoMatricula ??
    ""
  );
}

function obterCursoAluno(aluno, defaultValues) {
  return (
    aluno?.curso?.nomeCurso ??
    aluno?.alunoCurso ??
    aluno?.curso ??
    defaultValues?.curso ??
    ""
  );
}

function exibirValor(valor) {
  return valor !== undefined && valor !== null && valor !== ""
    ? valor
    : "Não informado";
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
  pea = null,
}) {
  const [formData, setFormData] = useState(() =>
    normalizarDefaultValues(defaultValues ?? {}),
  );

  const [errosLocais, setErrosLocais] = useState({});

  const modoEdicao = mode === "edit" || mode === "editar";
  const formularioDesabilitado = isPending || isLoading;

  // Identificação dos registros associados.
  const alunoId = aluno?.id ?? pea?.alunoId ?? defaultValues?.alunoId ?? null;

  const peaId =
    pea?.id ??
    pea?._id ??
    defaultValues?.peaId ??
    defaultValues?.pea?.id ??
    null;

  const peiId =
    pea?.peiId ??
    pei?.id ??
    defaultValues?.peiId ??
    defaultValues?.pei?.id ??
    null;

  // Dados do aluno.
  const nomeAluno = obterNomeAluno(aluno, defaultValues);
  const matriculaAluno = obterMatriculaAluno(aluno, defaultValues);
  const cursoAluno = obterCursoAluno(aluno, defaultValues);

  // Dados acadêmicos provenientes do PEA.
  const componenteCurricular =
    pea?.componenteCurricular ?? defaultValues?.componenteCurricular ?? "";

  const periodoLetivo = pea?.semestreAno ?? defaultValues?.periodoLetivo ?? "";

  const docente = pea?.docente ?? defaultValues?.docente ?? "";

  const errorResponse = error?.response?.data || error?.data || {};

  const mensagemErro =
    errorResponse.detail || error?.detail || error?.message || "";

  const invalidFields = errorResponse.invalidFields || {};

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((atual) => ({
      ...atual,
      [name]: value,
    }));

    setErrosLocais((atual) => ({
      ...atual,
      [name]: "",
    }));
  }

  function handleCheckboxChange(campo, value) {
    setFormData((atual) => ({
      ...atual,
      [campo]: value,
    }));
  }

  function handleHabilidadeChange(index, campo, value) {
    setFormData((atual) => ({
      ...atual,
      habilidadesCompetencias: atual.habilidadesCompetencias.map(
        (habilidade, habilidadeIndex) =>
          habilidadeIndex === index
            ? { ...habilidade, [campo]: value }
            : habilidade,
      ),
    }));
  }

  function handleAdicionarHabilidade() {
    setFormData((atual) => ({
      ...atual,
      habilidadesCompetencias: [
        ...atual.habilidadesCompetencias,
        criarHabilidadeVazia(),
      ],
    }));
  }

  function handleRemoverHabilidade(index) {
    setFormData((atual) => ({
      ...atual,
      habilidadesCompetencias: atual.habilidadesCompetencias.filter(
        (_, habilidadeIndex) => habilidadeIndex !== index,
      ),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const novosErros = {};

    if (alunoId === null || alunoId === undefined || alunoId === "") {
      novosErros.alunoId = "O estudante associado não foi identificado.";
    }

    if (peiId === null || peiId === undefined || peiId === "") {
      novosErros.peiId = "O PEI associado não foi identificado.";
    }

    if (peaId === null || peaId === undefined || peaId === "") {
      novosErros.peaId = "O PEA associado não foi identificado.";
    }

    setErrosLocais(novosErros);

    if (Object.keys(novosErros).length > 0 || formularioDesabilitado) {
      return;
    }

    if (typeof onSubmit !== "function") {
      return;
    }

    const payload = {
      ...formData,
      alunoId,
      peiId,
      peaId,
      alunoNome: nomeAluno,
      alunoMatricula: matriculaAluno,
      curso: cursoAluno,
      periodoLetivo,
      componenteCurricular,
      docente,
      habilidadesCompetencias: formData.habilidadesCompetencias.map(
        (habilidade) => ({ ...habilidade }),
      ),
    };

    // Não enviar assinaturaDocente, inclusive em registros antigos.
    delete payload.assinaturaDocente;

    onSubmit(payload);
  }

  return (
    <div className="rai-body">
      <header className="rai-header">
        <div>
          <h1 className="rai-title">
            {modoEdicao
              ? "Editar Relatório de Acompanhamento Individualizado"
              : "Novo Relatório de Acompanhamento Individualizado"}
          </h1>

          <p className="rai-subtitle">
            Registre as observações, os avanços, as habilidades e o parecer do
            acompanhamento educacional.
          </p>
        </div>

        <span className="rai-private-label">Documento vinculado ao PEA</span>
      </header>

      <form className="rai-form" onSubmit={handleSubmit}>
        {mensagemErro && (
          <div className="rai-alert rai-alert-error" role="alert">
            {mensagemErro}
          </div>
        )}

        {Object.values(errosLocais)
          .filter(Boolean)
          .map((mensagem) => (
            <div
              className="rai-alert rai-alert-error"
              role="alert"
              key={mensagem}
            >
              {mensagem}
            </div>
          ))}

        <FormSection
          title="Dados do estudante e do PEA associado"
          description="Confira os dados do estudante e do Plano de Ensino Adaptado ao qual este relatório está vinculado."
        >
          <div className="rai-contexto-subsection">
            <h3>Dados do estudante</h3>

            <div className="rai-contexto-grid">
              <div className="rai-contexto-field">
                <span>Nome do estudante</span>
                <p>{exibirValor(nomeAluno)}</p>
              </div>

              <div className="rai-contexto-field">
                <span>Matrícula</span>
                <p>{exibirValor(matriculaAluno)}</p>
              </div>

              <div className="rai-contexto-field">
                <span>Curso</span>
                <p>{exibirValor(cursoAluno)}</p>
              </div>
            </div>
          </div>

          <div className="rai-contexto-subsection">
            <h3>PEA associado</h3>

            <div className="rai-contexto-grid">
              <div className="rai-contexto-field">
                <span>Componente curricular</span>
                <p>{exibirValor(componenteCurricular)}</p>
              </div>

              <div className="rai-contexto-field">
                <span>Período letivo</span>
                <p>{exibirValor(periodoLetivo)}</p>
              </div>

              <div className="rai-contexto-field">
                <span>Docente</span>
                <p>{exibirValor(docente)}</p>
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection
          title="1. Aspectos observados"
          description="Marque as características observadas no período e utilize os campos de comentário quando necessário."
        >
          <div className="rai-observacao-grupo">
            <GrupoCheckbox
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
              label="Comentário sobre o relacionamento (se necessário)"
              value={formData.comentarioRelacionamento}
              onChange={handleChange}
              rows={3}
              disabled={formularioDesabilitado}
            />
          </div>

          <div className="rai-observacao-grupo">
            <GrupoCheckbox
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
              label="Comentário sobre as habilidades cognitivas (se necessário)"
              value={formData.comentarioHabilidadesCognitivas}
              onChange={handleChange}
              rows={3}
              disabled={formularioDesabilitado}
            />
          </div>

          <div className="rai-observacao-grupo">
            <GrupoCheckbox
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
              label="Comentário sobre as habilidades socioemocionais (se necessário)"
              value={formData.comentarioHabilidadesSocioemocionais}
              onChange={handleChange}
              rows={3}
              disabled={formularioDesabilitado}
            />
          </div>
        </FormSection>

        <FormSection
          title="2. Acompanhamento do estudante no período"
          description="Descreva os avanços, as dificuldades de aprendizagem e os fatores externos que possam estar influenciando o processo escolar."
        >
          <FormTextarea
            name="avancosGerais"
            label="Avanços gerais do(a) estudante no período"
            value={formData.avancosGerais}
            onChange={handleChange}
            rows={5}
            disabled={formularioDesabilitado}
          />

          <FormTextarea
            name="dificuldadesAprendizagem"
            label="Relato das dificuldades de aprendizagem observadas"
            value={formData.dificuldadesAprendizagem}
            onChange={handleChange}
            rows={5}
            disabled={formularioDesabilitado}
          />

          <FormTextarea
            name="fatoresExternos"
            label="Fatores externos que estejam influenciando no processo escolar"
            value={formData.fatoresExternos}
            onChange={handleChange}
            rows={4}
            disabled={formularioDesabilitado}
          />
        </FormSection>

        <FormSection
          title="3. Habilidades e competências desenvolvidas"
          description="Adicione as habilidades desenvolvidas após as adaptações realizadas, indicando o nível de aprendizado e as observações pertinentes."
        >
          <div className="rai-habilidades-lista">
            {formData.habilidadesCompetencias.map((habilidade, index) => (
              <article className="rai-habilidade-card" key={index}>
                <div className="rai-habilidade-card-header">
                  <h3>Habilidade desenvolvida {index + 1}</h3>

                  <button
                    type="button"
                    className="rai-btn-remove-habilidade"
                    onClick={() => handleRemoverHabilidade(index)}
                    disabled={formularioDesabilitado}
                    aria-label={`Remover habilidade ${index + 1}`}
                  >
                    Remover
                  </button>
                </div>

                <FormTextarea
                  name={`habilidadeDesenvolvida-${index}`}
                  label="Habilidade desenvolvida"
                  value={habilidade.habilidadeDesenvolvida}
                  onChange={(event) =>
                    handleHabilidadeChange(
                      index,
                      "habilidadeDesenvolvida",
                      event.target.value,
                    )
                  }
                  rows={2}
                  disabled={formularioDesabilitado}
                />

                <div className="rai-form-grid">
                  <div className="rai-select-field">
                    <label htmlFor={`nivelAprendizado-${index}`}>
                      Nível de aprendizado
                    </label>

                    <select
                      id={`nivelAprendizado-${index}`}
                      value={habilidade.nivelAprendizado}
                      onChange={(event) =>
                        handleHabilidadeChange(
                          index,
                          "nivelAprendizado",
                          event.target.value,
                        )
                      }
                      disabled={formularioDesabilitado}
                    >
                      <option value="">Selecione o nível</option>

                      {NIVEIS_APRENDIZADO.map((nivel) => (
                        <option key={nivel} value={nivel}>
                          {nivel}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <FormTextarea
                  name={`observacoesHabilidade-${index}`}
                  label="Observações"
                  value={habilidade.observacoes}
                  onChange={(event) =>
                    handleHabilidadeChange(
                      index,
                      "observacoes",
                      event.target.value,
                    )
                  }
                  rows={2}
                  disabled={formularioDesabilitado}
                />
              </article>
            ))}
          </div>

          <button
            type="button"
            className="rai-btn-add-habilidade"
            onClick={handleAdicionarHabilidade}
            disabled={formularioDesabilitado}
          >
            + Adicionar habilidade
          </button>
        </FormSection>

        <FormSection
          title="4. Parecer"
          description="Considere os objetivos previstos no Plano de Ensino Adaptado, os avanços e as dificuldades, as propostas que tiveram êxito ou não e os objetivos para a próxima etapa."
        >
          <FormTextarea
            name="parecer"
            label="Parecer do(a) docente"
            value={formData.parecer}
            onChange={handleChange}
            rows={7}
            disabled={formularioDesabilitado}
          />
        </FormSection>

        <FormSection title="5. Finalização">
          <div className="rai-form-grid">
            <FormField
              name="data"
              label="Data"
              type="date"
              value={formData.data}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              error={obterErroCampo("data", invalidFields, errors)}
            />
          </div>
        </FormSection>

        <div className="rai-form-actions">
          <p className="rai-footer-note">
            Documento de uso institucional. Registre informações pertinentes ao
            acompanhamento educacional do estudante.
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
              disabled={formularioDesabilitado}
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
