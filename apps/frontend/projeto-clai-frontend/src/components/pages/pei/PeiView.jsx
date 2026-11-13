import { useState } from "react";

import { HiOutlinePencilAlt } from "react-icons/hi";

import "./PeiView.css";

const ValorNulo = () => (
  <span className="pei-view-valor-vazio">Não informado</span>
);

const CampoExibicao = ({ label, valor, largo = false }) => (
  <div className={`pei-view-campo ${largo ? "pei-view-campo-largo" : ""}`}>
    <span className="pei-view-label">{label}</span>

    <div className="pei-view-valor">
      {valor !== null && valor !== undefined && valor !== "" ? (
        valor
      ) : (
        <ValorNulo />
      )}
    </div>
  </div>
);

const SecaoSanfona = ({ titulo, children, padraoAberto = false }) => {
  const [aberta, setAberta] = useState(padraoAberto);

  return (
    <section className="pei-view-section">
      <button
        type="button"
        className="pei-view-section-toggle"
        onClick={() => setAberta((atual) => !atual)}
        aria-expanded={aberta}
      >
        <span className="pei-view-section-title">{titulo}</span>

        <span
          className={`pei-view-section-chevron ${aberta ? "expandido" : ""}`}
        >
          ▼
        </span>
      </button>

      {aberta && <div className="pei-view-section-panel">{children}</div>}
    </section>
  );
};

export default function PeiView({ dados, onEdit }) {
  if (!dados) {
    return <p>Nenhum dado encontrado.</p>;
  }

  const identificacao = dados.identificacao || {};
  const aluno = identificacao.aluno || dados.aluno || {};

  const nomeEstudante =
    aluno.alunoNome || identificacao.nomeEstudante || dados.nomeEstudante;

  const matricula =
    aluno.alunoMatricula || identificacao.matricula || dados.matricula;

  const curso = aluno.alunoCurso || identificacao.curso || dados.curso;

  const semestreAno =
    identificacao.semestreAno || aluno.periodoAluno || dados.semestreAno;

  return (
    <div className="pei-view-container">
      <div className="pei-view-metadados">
        <div className="pei-view-metadados-grupo">
          <div className="pei-view-metadado-item">
            <span className="pei-view-metadado-label">Estudante</span>

            <span className="pei-view-metadado-valor">
              {nomeEstudante || "N/A"}
            </span>
          </div>

          <div className="pei-view-metadado-item">
            <span className="pei-view-metadado-label">Matrícula</span>

            <span className="pei-view-metadado-valor">
              {matricula || "N/A"}
            </span>
          </div>

          <div className="pei-view-metadado-item">
            <span className="pei-view-metadado-label">Curso</span>

            <span className="pei-view-metadado-valor">{curso || "N/A"}</span>
          </div>

          <div className="pei-view-metadado-item">
            <span className="pei-view-metadado-label">Semestre/Ano</span>

            <span className="pei-view-metadado-valor">
              {semestreAno || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <SecaoSanfona titulo="1. Identificação do(a) estudante" padraoAberto>
        <div className="pei-view-grid">
          <CampoExibicao label="Nome do estudante" valor={nomeEstudante} />

          <CampoExibicao label="Matrícula" valor={matricula} />

          <CampoExibicao label="Curso" valor={curso} />

          <CampoExibicao label="Semestre/Ano" valor={semestreAno} />
        </div>
      </SecaoSanfona>

      <SecaoSanfona titulo="2. Histórico (antes e na instituição)">
        <div className="pei-view-grid">
          <CampoExibicao
            label="Histórico do estudante"
            valor={dados.historico}
            largo
          />
        </div>

        <p className="pei-view-note">
          Preenchido pela Equipe Pedagógica, Assistência Estudantil e CLAI.
        </p>
      </SecaoSanfona>

      <SecaoSanfona titulo="3. Necessidades Específicas">
        <div className="pei-view-grid">
          <CampoExibicao
            label="Descrição das necessidades específicas"
            valor={dados.necessidadesEspecificas}
            largo
          />
        </div>

        <p className="pei-view-note">
          Preenchido pela Equipe Pedagógica, Assistência Estudantil e CLAI.
        </p>
      </SecaoSanfona>

      <SecaoSanfona titulo="4. Conhecimentos, Habilidades, Capacidades, Interesses e Necessidades">
        <div className="pei-view-grid">
          <CampoExibicao
            label="Conhecimentos, habilidades, capacidades, interesses e necessidades"
            valor={
              dados.conhecimentosHabilidadesCapacidadesInteressesNecessidades
            }
            largo
          />
        </div>

        <p className="pei-view-note">
          Preenchido pela Equipe Pedagógica e CLAI.
        </p>
      </SecaoSanfona>

      <SecaoSanfona titulo="5. Dificuldades apresentadas">
        <div className="pei-view-grid">
          <CampoExibicao
            label="Descrição das dificuldades"
            valor={dados.dificuldadesApresentadas}
            largo
          />
        </div>

        <p className="pei-view-note">
          Preenchido pela Equipe Pedagógica e CLAI.
        </p>
      </SecaoSanfona>

      <SecaoSanfona titulo="6. Propostas de Adaptações Curriculares">
        <div className="pei-view-grid">
          <CampoExibicao
            label="Propostas de adaptações curriculares"
            valor={dados.propostasAdaptacoesCurriculares}
            largo
          />
        </div>

        <div className="pei-view-document-note">
          <strong>Planos de Ensino Adaptados (PEA)</strong>

          <p>
            Devem ser anexados os Planos de Ensino Adaptados dos componentes
            curriculares que necessitaram de alguma adaptação curricular.
          </p>
        </div>

        <p className="pei-view-note">
          Preenchido pela Equipe Pedagógica, CLAI e docentes.
        </p>
      </SecaoSanfona>

      <SecaoSanfona titulo="7. Assinaturas">
        <div className="pei-view-grid">
          <CampoExibicao
            label="Assinatura da CLAI"
            valor={dados.assinaturaClai}
          />

          <CampoExibicao
            label="Assinatura do Setor Pedagógico (responsável)"
            valor={dados.assinaturaSetorPedagogico}
          />

          <CampoExibicao
            label="Assinatura do(a) Coordenador(a) de Curso"
            valor={dados.assinaturaCoordenadorCurso}
          />

          <CampoExibicao
            label="Assinatura do Estudante ou Responsável"
            valor={dados.assinaturaEstudanteResponsavel}
          />

          <CampoExibicao
            label="Assinatura do Docente"
            valor={dados.assinaturaDocente}
          />
        </div>
      </SecaoSanfona>

      {typeof onEdit === "function" && (
        <div className="pei-view-rodape">
          <button
            type="button"
            className="pei-view-btn-editar"
            onClick={() => onEdit(dados)}
          >
            <HiOutlinePencilAlt className="action-icon" />
            <span>Editar este PEI</span>
          </button>
        </div>
      )}
    </div>
  );
}
