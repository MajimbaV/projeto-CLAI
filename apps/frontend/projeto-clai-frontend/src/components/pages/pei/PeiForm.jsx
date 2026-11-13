import FormTextarea from "../../forms/FormTextarea";

import "./PeiForm.css";

const VALORES_PADRAO = {
  historico: "",
  necessidadesEspecificas: "",
  conhecimentosHabilidadesCapacidadesInteressesNecessidades: "",
  dificuldadesApresentadas: "",
  propostasAdaptacoesCurriculares: "",
};

function FormSection({ title, description, note, children }) {
  return (
    <section className="pei-section">
      <div className="pei-section-heading">
        <h2 className="pei-section-title">{title}</h2>

        {description && (
          <p className="pei-section-description">{description}</p>
        )}

        {note && <p className="pei-section-note">{note}</p>}
      </div>

      <div className="pei-section-content">{children}</div>
    </section>
  );
}

export default function PeiForm({
  initialValues = {},
  alunoSelecionado = null,
  onChange,
  onSubmit,
  onCancel,
  isLoading = false,
  errors = {},
}) {
  const valores = {
    ...VALORES_PADRAO,
    ...initialValues,
  };

  const fieldErrors = errors?.invalidFields || errors || {};

  const errorMessage =
    typeof errors === "string"
      ? errors
      : errors?.detail || errors?.message || "";

  const handleChange = (event) => {
    onChange?.(event);
  };

  const identificacao = {
    nomeEstudante:
      alunoSelecionado?.alunoNome ?? alunoSelecionado?.nome ?? "Não informado",

    matricula:
      alunoSelecionado?.alunoMatricula ??
      alunoSelecionado?.matricula ??
      "Não informada",

    curso:
      alunoSelecionado?.alunoCurso ??
      alunoSelecionado?.curso ??
      "Não informado",

    semestreAno:
      alunoSelecionado?.periodoAluno ??
      alunoSelecionado?.semestreAno ??
      "Não informado",
  };

  return (
    <div className="pei-body">
      <div className="pei-header">
        <div>
          <h1 className="pei-title">Plano Educacional Individualizado (PEI)</h1>

          <p className="pei-subtitle">
            Registre as informações e estratégias necessárias ao acompanhamento
            educacional do estudante.
          </p>
        </div>

        <span className="pei-private-label">Uso institucional restrito</span>
      </div>

      <form className="pei-form" onSubmit={onSubmit}>
        {errorMessage && (
          <div className="pei-alert" role="alert">
            {errorMessage}
          </div>
        )}

        <FormSection
          title="1. Identificação do(a) estudante"
          description="Dados acadêmicos do estudante ao qual o Plano Educacional Individualizado está vinculado."
        >
          {alunoSelecionado ? (
            <div className="pei-student-summary">
              <div>
                <span>Nome do estudante</span>
                <strong>{identificacao.nomeEstudante}</strong>
              </div>

              <div>
                <span>Matrícula</span>
                <strong>{identificacao.matricula}</strong>
              </div>

              <div>
                <span>Curso</span>
                <strong>{identificacao.curso}</strong>
              </div>

              <div>
                <span>Semestre/Ano</span>
                <strong>{identificacao.semestreAno}</strong>
              </div>
            </div>
          ) : (
            <div className="pei-document-note">
              <p>
                Nenhum estudante selecionado. Selecione um aluno para visualizar
                seus dados e preencher o Plano Educacional Individualizado.
              </p>
            </div>
          )}
        </FormSection>

        <FormSection
          title="2. Histórico (antes e na instituição)"
          description="Apresente um breve histórico da trajetória do estudante, considerando sua vida escolar anterior e sua experiência na instituição."
          note="Preenchido pela Equipe Pedagógica, Assistência Estudantil e CLAI."
        >
          <FormTextarea
            name="historico"
            label="Histórico do estudante"
            value={valores.historico}
            onChange={handleChange}
            disabled={isLoading}
            rows={5}
            error={fieldErrors.historico}
          />
        </FormSection>

        <FormSection
          title="3. Necessidades Específicas"
          description="Detalhe as condições do estudante e os recursos ou apoios de que necessita. Por exemplo: um estudante com cegueira pode necessitar de Braille e leitor de telas."
          note="Preenchido pela Equipe Pedagógica, Assistência Estudantil e CLAI."
        >
          <FormTextarea
            name="necessidadesEspecificas"
            label="Descrição das necessidades específicas"
            value={valores.necessidadesEspecificas}
            onChange={handleChange}
            disabled={isLoading}
            rows={5}
            error={fieldErrors.necessidadesEspecificas}
          />
        </FormSection>

        <FormSection
          title="4. Conhecimentos, Habilidades, Capacidades, Interesses e Necessidades"
          description="Registre o que o estudante já sabe, suas habilidades, capacidades, interesses, afinidades e outras necessidades relevantes."
          note="Preenchido pela Equipe Pedagógica e CLAI."
        >
          <FormTextarea
            name="conhecimentosHabilidadesCapacidadesInteressesNecessidades"
            label="Conhecimentos, habilidades, capacidades, interesses e necessidades"
            value={
              valores.conhecimentosHabilidadesCapacidadesInteressesNecessidades
            }
            onChange={handleChange}
            disabled={isLoading}
            rows={5}
            error={
              fieldErrors.conhecimentosHabilidadesCapacidadesInteressesNecessidades
            }
          />
        </FormSection>

        <FormSection
          title="5. Dificuldades apresentadas"
          description="Descreva as dificuldades apresentadas pelo estudante no contexto educacional."
          note="Preenchido pela Equipe Pedagógica e CLAI."
        >
          <FormTextarea
            name="dificuldadesApresentadas"
            label="Descrição das dificuldades"
            value={valores.dificuldadesApresentadas}
            onChange={handleChange}
            disabled={isLoading}
            rows={5}
            error={fieldErrors.dificuldadesApresentadas}
          />
        </FormSection>

        <FormSection
          title="6. Propostas de Adaptações Curriculares"
          description="Registre as propostas de adaptações curriculares necessárias ao estudante."
          note="Preenchido pela Equipe Pedagógica, CLAI e docentes. Podem ser consideradas adaptações de pequeno e grande porte, alterações na matriz curricular, diminuição de disciplinas e dilatação do tempo para integralização curricular."
        >
          <FormTextarea
            name="propostasAdaptacoesCurriculares"
            label="Propostas de adaptações curriculares"
            value={valores.propostasAdaptacoesCurriculares}
            onChange={handleChange}
            disabled={isLoading}
            rows={6}
            error={fieldErrors.propostasAdaptacoesCurriculares}
          />

          <div className="pei-document-note">
            <strong>Planos de Ensino Adaptados (PEA)</strong>

            <p>
              Devem ser anexados os Planos de Ensino Adaptados dos componentes
              curriculares que necessitarem de alguma adaptação curricular.
            </p>
          </div>

          {/* Os componentes internos de PEA e RAI serão integrados posteriormente. */}
        </FormSection>

        <div className="pei-form-actions">
          <p className="pei-footer-note">
            As informações registradas devem estar relacionadas às necessidades
            educacionais e ao acompanhamento do estudante.
          </p>

          <div className="pei-buttons-group">
            {onCancel && (
              <button
                type="button"
                className="pei-btn-cancel"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancelar
              </button>
            )}

            <button
              type="submit"
              className="pei-btn-submit"
              disabled={isLoading || !alunoSelecionado}
            >
              {isLoading ? "Salvando..." : "Salvar PEI"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
