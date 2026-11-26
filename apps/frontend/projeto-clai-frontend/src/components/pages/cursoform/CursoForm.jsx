import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CursoForm.css";
import { useToast } from "../../../hooks/useToast";

const TEXTOS_POR_MODO = {
  create: {
    title: "Adicionar curso",
    submitLabel: "Cadastrar curso",
    pendingLabel: "Salvando...",
    footerNote:
      "O identificador do curso será gerado automaticamente ao salvar.",
    successMessage: "Curso cadastrado com sucesso!",
  },
  edit: {
    title: "Editar curso",
    submitLabel: "Salvar alterações",
    pendingLabel: "Salvando alterações...",
    footerNote: "As alterações serão aplicadas ao curso selecionado.",
    successMessage: "Curso atualizado com sucesso!",
  },
};

const FORM_DATA_VAZIO = {
  nomeCurso: "",
  cursoSigla: "",
  nivelEnsino: "",
  cursoModalidade: "",
  cursoTurno: "",
};

const OPCOES_NIVEL_ENSINO = [
  { value: "TECNICO_INTEGRADO", label: "Técnico Integrado" },
  { value: "TECNICO_SUBSEQUENTE", label: "Técnico Subsequente" },
  { value: "GRADUACAO", label: "Graduação" },
  { value: "POS_GRADUACAO", label: "Pós-graduação" },
];

const OPCOES_MODALIDADE = [
  { value: "PRESENCIAL", label: "Presencial" },
  { value: "EAD", label: "EAD" },
];

const OPCOES_TURNO = [
  { value: "MATUTINO", label: "Matutino" },
  { value: "VESPERTINO", label: "Vespertino" },
  { value: "NOTURNO", label: "Noturno" },
  { value: "INTEGRAL", label: "Integral" },
];

function normalizarDefaultValues(valores) {
  if (!valores) {
    return { ...FORM_DATA_VAZIO };
  }

  const normalizado = {};

  for (const chave of Object.keys(FORM_DATA_VAZIO)) {
    normalizado[chave] = valores[chave] ?? "";
  }

  return normalizado;
}

function validarCampo(nome, valor) {
  const valorNormalizado = String(valor ?? "").trim();

  switch (nome) {
    case "nomeCurso":
      if (!valorNormalizado) {
        return "O nome do curso é obrigatório.";
      }

      if (/\d/.test(valorNormalizado)) {
        return "O nome do curso não pode conter números.";
      }

      return "";

    case "cursoSigla":
      if (!valorNormalizado) {
        return "A sigla do curso é obrigatória.";
      }

      if (!/^[A-Z-]{2,}$/.test(valorNormalizado)) {
        return "A sigla deve ter ao menos 2 caracteres, utilizando somente letras maiúsculas e hífens.";
      }

      return "";

    case "nivelEnsino":
      if (!OPCOES_NIVEL_ENSINO.some((opcao) => opcao.value === valor)) {
        return "Selecione um nível de ensino.";
      }

      return "";

    case "cursoModalidade":
      if (!OPCOES_MODALIDADE.some((opcao) => opcao.value === valor)) {
        return "Selecione uma modalidade.";
      }

      return "";

    case "cursoTurno":
      if (!OPCOES_TURNO.some((opcao) => opcao.value === valor)) {
        return "Selecione um turno.";
      }

      return "";

    default:
      return "";
  }
}

function validarFormulario(formData) {
  const erros = {};

  Object.keys(FORM_DATA_VAZIO).forEach((campo) => {
    const erro = validarCampo(campo, formData[campo]);

    if (erro) {
      erros[campo] = erro;
    }
  });

  return erros;
}

function CursoForm({
  onSubmit,
  isPending = false,
  isLoading = false,
  error = null,
  defaultValues,
  mode = "create",
}) {
  const [formData, setFormData] = useState(() =>
    normalizarDefaultValues(defaultValues),
  );

  const [errosValidacao, setErrosValidacao] = useState({});
  const [camposTocados, setCamposTocados] = useState({});
  const [erroEnvio, setErroEnvio] = useState(null);

  const cursoCarregadoRef = useRef(defaultValues?.id ?? null);

  const textos = TEXTOS_POR_MODO[mode] ?? TEXTOS_POR_MODO.create;

  const navigate = useNavigate();
  const { success } = useToast();

  const cursoId = defaultValues?.id;

  const previousRedirect =
    mode === "create"
      ? "/dados-academicos/cursos"
      : `/dados-academicos/cursos/${encodeURIComponent(cursoId ?? "")}`;

  // Atualiza os campos quando os dados do curso são carregados para edição.
  useEffect(() => {
    if (
      mode === "edit" &&
      defaultValues?.id &&
      cursoCarregadoRef.current !== defaultValues.id
    ) {
      setFormData(normalizarDefaultValues(defaultValues));
      setErrosValidacao({});
      setCamposTocados({});
      setErroEnvio(null);

      cursoCarregadoRef.current = defaultValues.id;
    }
  }, [defaultValues, mode]);

  function handleChangeForm(e) {
    const { name, value } = e.target;

    // A sigla é convertida automaticamente para letras maiúsculas.
    const valorAtualizado = name === "cursoSigla" ? value.toUpperCase() : value;

    setFormData((prev) => ({
      ...prev,
      [name]: valorAtualizado,
    }));

    setErroEnvio(null);

    if (camposTocados[name]) {
      setErrosValidacao((prev) => ({
        ...prev,
        [name]: validarCampo(name, valorAtualizado),
      }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;

    setCamposTocados((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrosValidacao((prev) => ({
      ...prev,
      [name]: validarCampo(name, value),
    }));
  }

  function obterErrosApi(erro) {
    return (
      erro?.validationErrors ||
      erro?.response?.data?.invalidFields ||
      erro?.response?.data?.errors ||
      {}
    );
  }

  function obterMensagemErro(erro) {
    const errorResponse = erro?.response?.data || {};

    if (erro?.response?.status === 404) {
      return "Curso não encontrado.";
    }

    return (
      errorResponse.detail ||
      errorResponse.message ||
      erro?.message ||
      "Ocorreu um erro inesperado ao salvar os dados."
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const erros = validarFormulario(formData);

    setErrosValidacao(erros);

    setCamposTocados(
      Object.keys(FORM_DATA_VAZIO).reduce((acc, campo) => {
        acc[campo] = true;
        return acc;
      }, {}),
    );

    if (Object.keys(erros).length > 0) {
      return;
    }

    if (!onSubmit || isPending) {
      return;
    }

    setErroEnvio(null);

    const payload = {
      ...formData,
      nomeCurso: formData.nomeCurso.trim(),
      cursoSigla: formData.cursoSigla.trim(),
      nivelEnsino: formData.nivelEnsino,
      cursoModalidade: formData.cursoModalidade,
      cursoTurno: formData.cursoTurno,
      statusAtivo: defaultValues?.statusAtivo ?? true,
    };

    try {
      await onSubmit(payload);

      success(textos.successMessage);
      navigate(previousRedirect);
    } catch (erro) {
      const errosApi = obterErrosApi(erro);

      if (Object.keys(errosApi).length > 0) {
        setErrosValidacao((prev) => ({
          ...prev,
          ...errosApi,
        }));
      }

      setErroEnvio(obterMensagemErro(erro));
    }
  }

  if (isLoading) {
    return (
      <div className="curso-form-body">
        <p>Carregando dados do curso...</p>
      </div>
    );
  }

  const erroExterno = error ? obterMensagemErro(error) : null;

  return (
    <div className="curso-form-body">
      <div className="curso-form-header">
        <h1 className="curso-form-header-text">{textos.title}</h1>

        <span className="curso-form-header-comment">* Campos obrigatórios</span>
      </div>

      <form className="curso-form" onSubmit={handleSubmit}>
        {(erroEnvio || erroExterno) && (
          <div className="curso-form-error-banner">
            <p>Erro: {erroEnvio || erroExterno}</p>
          </div>
        )}

        <fieldset className="curso-form-section">
          <legend>Identificação do curso</legend>

          <span className="curso-form-section-desc">
            Informações de identificação do curso.
          </span>

          <div className="curso-form-row">
            <div className="curso-form-input-group">
              <label htmlFor="nomeCurso">Nome do curso *</label>

              <input
                type="text"
                id="nomeCurso"
                name="nomeCurso"
                placeholder="Ex.: Análise e Desenvolvimento de Sistemas"
                value={formData.nomeCurso}
                onChange={handleChangeForm}
                onBlur={handleBlur}
                disabled={isPending}
                required
              />

              {errosValidacao.nomeCurso && (
                <span className="curso-form-error-message">
                  {errosValidacao.nomeCurso}
                </span>
              )}
            </div>

            <div className="curso-form-input-group">
              <label htmlFor="cursoSigla">Sigla *</label>

              <input
                type="text"
                id="cursoSigla"
                name="cursoSigla"
                placeholder="Ex.: ADS"
                value={formData.cursoSigla}
                onChange={handleChangeForm}
                onBlur={handleBlur}
                disabled={isPending}
                required
              />

              {errosValidacao.cursoSigla && (
                <span className="curso-form-error-message">
                  {errosValidacao.cursoSigla}
                </span>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset className="curso-form-section">
          <legend>Dados acadêmicos</legend>

          <span className="curso-form-section-desc">
            Defina o nível de ensino, a modalidade e o turno de funcionamento do
            curso.
          </span>

          <div className="curso-form-row curso-form-row-three">
            <div className="curso-form-input-group">
              <label htmlFor="nivelEnsino">Nível de ensino *</label>

              <select
                id="nivelEnsino"
                name="nivelEnsino"
                value={formData.nivelEnsino}
                onChange={handleChangeForm}
                onBlur={handleBlur}
                disabled={isPending}
                required
              >
                <option value="" disabled>
                  Selecione um nível...
                </option>

                {OPCOES_NIVEL_ENSINO.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </option>
                ))}
              </select>

              {errosValidacao.nivelEnsino && (
                <span className="curso-form-error-message">
                  {errosValidacao.nivelEnsino}
                </span>
              )}
            </div>

            <div className="curso-form-input-group">
              <label htmlFor="cursoModalidade">Modalidade *</label>

              <select
                id="cursoModalidade"
                name="cursoModalidade"
                value={formData.cursoModalidade}
                onChange={handleChangeForm}
                onBlur={handleBlur}
                disabled={isPending}
                required
              >
                <option value="" disabled>
                  Selecione uma modalidade...
                </option>

                {OPCOES_MODALIDADE.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </option>
                ))}
              </select>

              {errosValidacao.cursoModalidade && (
                <span className="curso-form-error-message">
                  {errosValidacao.cursoModalidade}
                </span>
              )}
            </div>

            <div className="curso-form-input-group">
              <label htmlFor="cursoTurno">Turno *</label>

              <select
                id="cursoTurno"
                name="cursoTurno"
                value={formData.cursoTurno}
                onChange={handleChangeForm}
                onBlur={handleBlur}
                disabled={isPending}
                required
              >
                <option value="" disabled>
                  Selecione um turno...
                </option>

                {OPCOES_TURNO.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </option>
                ))}
              </select>

              {errosValidacao.cursoTurno && (
                <span className="curso-form-error-message">
                  {errosValidacao.cursoTurno}
                </span>
              )}
            </div>
          </div>
        </fieldset>

        <div className="curso-form-actions">
          <span className="curso-form-footer-note">{textos.footerNote}</span>

          <div className="curso-form-buttons-group">
            <button
              type="button"
              className="curso-form-btn-cancel"
              disabled={isPending}
              onClick={() => navigate(previousRedirect)}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="curso-form-btn-submit"
              disabled={isPending}
            >
              {isPending ? textos.pendingLabel : textos.submitLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CursoForm;
