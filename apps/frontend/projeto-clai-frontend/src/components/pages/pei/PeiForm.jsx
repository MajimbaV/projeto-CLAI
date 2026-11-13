import FormField from "../../forms/FormField";
import FormTextarea from "../../forms/FormTextarea";

import "./PeiForm.css";

const VALORES_PADRAO = {
  nomeEstudante: "",
  matricula: "",
  curso: "",
  semestreAno: "",
  historico: "",
  necessidadesEspecificas: "",
  conhecimentosHabilidadesCapacidadesInteressesNecessidades: "",
  dificuldadesApresentadas: "",
  propostasAdaptacoesCurriculares: "",
  assinaturaClai: "",
  assinaturaSetorPedagogico: "",
  assinaturaCoordenadorCurso: "",
  assinaturaEstudanteResponsavel: "",
  assinaturaDocente: "",
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
      alunoSelecionado?.alunoNome ??
      alunoSelecionado?.nome ??
      valores.nomeEstudante,

    matricula:
      alunoSelecionado?.alunoMatricula ??
      alunoSelecionado?.matricula ??
      valores.matricula,

    curso:
      alunoSelecionado?.alunoCurso ?? alunoSelecionado?.curso ?? valores.curso,

    semestreAno:
      alunoSelecionado?.semestreAno ??
      alunoSelecionado?.periodoAluno ??
      valores.semestreAno,
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
                <strong>
                  {identificacao.nomeEstudante || "Não informado"}
                </strong>
              </div>

              <div>
                <span>Matrícula</span>
                <strong>{identificacao.matricula || "Não informada"}</strong>
              </div>

              <div>
                <span>Curso</span>
                <strong>{identificacao.curso || "Não informado"}</strong>
              </div>

              <div>
                <span>Semestre/Ano</span>
                <strong>{identificacao.semestreAno || "Não informado"}</strong>
              </div>
            </div>
          ) : (
            <div className="pei-form-grid">
              <FormField
                name="nomeEstudante"
                label="Nome do estudante"
                value={valores.nomeEstudante}
                onChange={handleChange}
                disabled={isLoading}
                error={fieldErrors.nomeEstudante}
              />

              <FormField
                name="matricula"
                label="Matrícula"
                value={valores.matricula}
                onChange={handleChange}
                disabled={isLoading}
                error={fieldErrors.matricula}
              />

              <FormField
                name="curso"
                label="Curso"
                value={valores.curso}
                onChange={handleChange}
                disabled={isLoading}
                error={fieldErrors.curso}
              />

              <FormField
                name="semestreAno"
                label="Semestre/Ano"
                value={valores.semestreAno}
                onChange={handleChange}
                placeholder="Ex.: 2026.2"
                disabled={isLoading}
                error={fieldErrors.semestreAno}
              />
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

        <FormSection
          title="7. Assinaturas"
          description="Identificação dos responsáveis pela elaboração e validação do Plano Educacional Individualizado."
        >
          <div className="pei-form-grid">
            <FormField
              name="assinaturaClai"
              label="Assinatura da CLAI"
              value={valores.assinaturaClai}
              onChange={handleChange}
              disabled={isLoading}
              error={fieldErrors.assinaturaClai}
            />

            <FormField
              name="assinaturaSetorPedagogico"
              label="Assinatura do Setor Pedagógico (responsável)"
              value={valores.assinaturaSetorPedagogico}
              onChange={handleChange}
              disabled={isLoading}
              error={fieldErrors.assinaturaSetorPedagogico}
            />

            <FormField
              name="assinaturaCoordenadorCurso"
              label="Assinatura do(a) Coordenador(a) de Curso"
              value={valores.assinaturaCoordenadorCurso}
              onChange={handleChange}
              disabled={isLoading}
              error={fieldErrors.assinaturaCoordenadorCurso}
            />

            <FormField
              name="assinaturaEstudanteResponsavel"
              label="Assinatura do Estudante ou Responsável"
              value={valores.assinaturaEstudanteResponsavel}
              onChange={handleChange}
              disabled={isLoading}
              error={fieldErrors.assinaturaEstudanteResponsavel}
            />

            <FormField
              name="assinaturaDocente"
              label="Assinatura do Docente"
              value={valores.assinaturaDocente}
              onChange={handleChange}
              disabled={isLoading}
              error={fieldErrors.assinaturaDocente}
            />
          </div>
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
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar PEI"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
