import { useState } from "react";
import FormField from "../../forms/FormField";
import FormTextarea from "../../forms/FormTextarea";
import "./PeaForm.css";

const VALORES_PADRAO = {
  alunoId: "",
  peiId: "",
  componenteCurricular: "",
  semestreAno: "",
  docente: "",
  objetivoGeral: "",
  objetivosEspecificos: "",
  conteudosProgramaticos: "",
  metodologia: "",
  avaliacao: "",
  bibliografiaBasica: "",
  bibliografiaComplementar: "",
};

const CAMPOS_TEXTO = [
  "componenteCurricular",
  "semestreAno",
  "docente",
  "objetivoGeral",
  "objetivosEspecificos",
  "conteudosProgramaticos",
  "metodologia",
  "avaliacao",
  "bibliografiaBasica",
  "bibliografiaComplementar",
];

function normalizarDefaultValues(defaultValues = {}) {
  const dados = defaultValues ?? {};
  const valores = { ...VALORES_PADRAO };

  for (const campo of CAMPOS_TEXTO) {
    valores[campo] = dados[campo] ?? "";
  }

  valores.alunoId = dados.alunoId ?? "";
  valores.peiId = dados.peiId ?? "";

  return valores;
}

function obterNomeAluno(aluno) {
  return aluno?.alunoNome ?? aluno?.nome ?? "Não informado";
}

function obterMatriculaAluno(aluno) {
  return aluno?.alunoMatricula ?? aluno?.matricula ?? "Não informada";
}

function obterNomePei(pei) {
  if (!pei) return "Não informado";

  return pei.titulo
    ? pei.titulo
    : pei.id
      ? `PEI #${pei.id}`
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

export default function PeaForm(props) {
  const chaveDefaultValues = JSON.stringify(props.defaultValues ?? {});

  return <PeaFormContent key={chaveDefaultValues} {...props} />;
}

function PeaFormContent({
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

  const alunoId = aluno?.id ?? defaultValues?.alunoId ?? formData.alunoId;
  const peiId = pei?.id ?? defaultValues?.peiId ?? formData.peiId;

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
      alunoId,
      peiId,
      ...Object.fromEntries(
        CAMPOS_TEXTO.map((campo) => [campo, formData[campo] ?? ""]),
      ),
    };

    onSubmit(payload);
  }

  return (
    <div className="pea-body">
      <div className="pea-header">
        <div>
          <h1 className="pea-title">
            {modoEdicao
              ? "Editar Plano de Ensino Adaptado"
              : "Novo Plano de Ensino Adaptado"}
          </h1>

          <p className="pea-subtitle">
            Preencha as informações referentes às adaptações do componente
            curricular para o estudante.
          </p>
        </div>

        <span className="pea-private-label">Documento vinculado ao PEI</span>
      </div>

      <form className="pea-form" onSubmit={handleSubmit}>
        {mensagemErro && (
          <div className="pea-alert pea-alert-error" role="alert">
            {mensagemErro}
          </div>
        )}

        <section className="pea-section">
          <div className="pea-section-header">
            <h2>Identificação e vínculos</h2>

            <p>
              Confira os dados do estudante e do PEI ao qual este documento
              estará associado.
            </p>
          </div>

          <div className="pea-associacoes">
            <div className="pea-associacao-card">
              <span className="pea-associacao-label">Estudante</span>

              <strong>{obterNomeAluno(aluno)}</strong>

              <span>Matrícula: {obterMatriculaAluno(aluno)}</span>

              {errosLocais.alunoId && (
                <small className="pea-field-error">{errosLocais.alunoId}</small>
              )}
            </div>

            <div className="pea-associacao-card">
              <span className="pea-associacao-label">
                Plano de Ensino Individualizado
              </span>

              <strong>{obterNomePei(pei)}</strong>

              <span>Identificador: {peiId || "Não informado"}</span>

              {errosLocais.peiId && (
                <small className="pea-field-error">{errosLocais.peiId}</small>
              )}
            </div>
          </div>
        </section>

        <section className="pea-section">
          <div className="pea-section-header">
            <h2>Identificação do componente curricular</h2>

            <p>
              Informe os dados do componente curricular e do docente responsável
              pelo preenchimento do PEA.
            </p>
          </div>

          <div className="pea-form-grid">
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

            <FormField
              name="semestreAno"
              label="Semestre/Ano"
              value={formData.semestreAno}
              onChange={handleChange}
              placeholder="Ex.: 2026.1"
              disabled={formularioDesabilitado}
              error={obterErroCampo("semestreAno", invalidFields, errors)}
            />

            <div className="pea-form-grid-full">
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

        <section className="pea-section">
          <div className="pea-section-header">
            <h2>Planejamento pedagógico adaptado</h2>

            <p>
              Descreva os objetivos, conteúdos e estratégias que serão
              utilizados no componente curricular.
            </p>
          </div>

          <div className="pea-section-content">
            <FormTextarea
              name="objetivoGeral"
              label="Objetivo geral do componente curricular"
              value={formData.objetivoGeral}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              rows={4}
              error={obterErroCampo("objetivoGeral", invalidFields, errors)}
            />

            <FormTextarea
              name="objetivosEspecificos"
              label="Objetivos específicos"
              value={formData.objetivosEspecificos}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              rows={4}
              error={obterErroCampo(
                "objetivosEspecificos",
                invalidFields,
                errors,
              )}
            />

            <FormTextarea
              name="conteudosProgramaticos"
              label="Conteúdos programáticos"
              value={formData.conteudosProgramaticos}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              rows={4}
              error={obterErroCampo(
                "conteudosProgramaticos",
                invalidFields,
                errors,
              )}
            />

            <FormTextarea
              name="metodologia"
              label="Metodologia"
              value={formData.metodologia}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              rows={4}
              error={obterErroCampo("metodologia", invalidFields, errors)}
            />

            <FormTextarea
              name="avaliacao"
              label="Avaliação"
              value={formData.avaliacao}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              rows={4}
              error={obterErroCampo("avaliacao", invalidFields, errors)}
            />
          </div>
        </section>

        <section className="pea-section">
          <div className="pea-section-header">
            <h2>Referências bibliográficas</h2>

            <p>
              Informe as referências utilizadas no planejamento do componente
              curricular.
            </p>
          </div>

          <div className="pea-section-content">
            <FormTextarea
              name="bibliografiaBasica"
              label="Bibliografia básica"
              value={formData.bibliografiaBasica}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              rows={3}
              error={obterErroCampo(
                "bibliografiaBasica",
                invalidFields,
                errors,
              )}
            />

            <FormTextarea
              name="bibliografiaComplementar"
              label="Bibliografia complementar"
              value={formData.bibliografiaComplementar}
              onChange={handleChange}
              disabled={formularioDesabilitado}
              rows={3}
              error={obterErroCampo(
                "bibliografiaComplementar",
                invalidFields,
                errors,
              )}
            />
          </div>
        </section>

        <div className="pea-form-actions">
          <p className="pea-footer-note">
            Este documento integra o PEI e deve ser preenchido por cada docente
            que precisar realizar adaptações em seu componente curricular.
          </p>

          <div className="pea-buttons-group">
            <button
              type="button"
              className="pea-btn-cancel"
              disabled={formularioDesabilitado}
              onClick={onCancel}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="pea-btn-submit"
              disabled={formularioDesabilitado || !alunoId || !peiId}
            >
              {isPending
                ? "Salvando..."
                : modoEdicao
                  ? "Salvar alterações"
                  : "Salvar PEA"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
