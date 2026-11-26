import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";

import "./PeaView.css";

const ValorNulo = () => (
  <span className="pea-view-valor-vazio">Não informado</span>
);

const CampoExibicao = ({ label, valor, largo = false }) => (
  <div className={`pea-view-campo ${largo ? "pea-view-campo-largo" : ""}`}>
    <span className="pea-view-label">{label}</span>
    <div className="pea-view-valor">
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
    <section className="pea-view-section">
      <button
        type="button"
        className="pea-view-section-toggle"
        onClick={() => setAberta((atual) => !atual)}
        aria-expanded={aberta}
      >
        <span className="pea-view-section-title">{titulo}</span>

        <span
          className={`pea-view-section-chevron ${aberta ? "expandido" : ""}`}
        >
          ▼
        </span>
      </button>

      {aberta && <div className="pea-view-section-panel">{children}</div>}
    </section>
  );
};

export default function PeaView({ dados, aluno, pei, onEdit }) {
  if (!dados) {
    return <p>Nenhum dado encontrado.</p>;
  }

  const alunoAtual = aluno || dados.aluno || {};

  const nomeEstudante =
    alunoAtual.alunoNome || alunoAtual.nome || dados.alunoNome;

  const matricula =
    alunoAtual.alunoMatricula || alunoAtual.matricula || dados.alunoMatricula;

  const curso = alunoAtual.alunoCurso || alunoAtual.curso || dados.alunoCurso;

  const peiId = pei?.id ?? pei?._id ?? dados.peiId;

  const nomePei = pei?.titulo
    ? pei.titulo
    : peiId
      ? `PEI #${peiId}`
      : "PEI não identificado";

  return (
    <div className="pea-view-container">
      {/* Cabeçalho / Metadados */}
      <div className="pea-view-metadados">
        <div className="pea-view-metadados-grupo">
          <div className="pea-view-metadado-item">
            <span className="pea-view-metadado-label">Estudante</span>
            <span className="pea-view-metadado-valor">
              {nomeEstudante || "N/A"}
            </span>
          </div>

          <div className="pea-view-metadado-item">
            <span className="pea-view-metadado-label">Matrícula</span>
            <span className="pea-view-metadado-valor">
              {matricula || "N/A"}
            </span>
          </div>

          <div className="pea-view-metadado-item">
            <span className="pea-view-metadado-label">Curso</span>
            <span className="pea-view-metadado-valor">{curso || "N/A"}</span>
          </div>

          <div className="pea-view-metadado-item">
            <span className="pea-view-metadado-label">
              Componente curricular
            </span>
            <span className="pea-view-metadado-valor">
              {dados.componenteCurricular || "N/A"}
            </span>
          </div>

          <div className="pea-view-metadado-item">
            <span className="pea-view-metadado-label">Semestre/Ano</span>
            <span className="pea-view-metadado-valor">
              {dados.semestreAno || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <SecaoSanfona titulo="1. Identificação e vínculos" padraoAberto>
        <div className="pea-view-grid">
          <CampoExibicao label="Estudante" valor={nomeEstudante} />

          <CampoExibicao label="Matrícula" valor={matricula} />

          <CampoExibicao label="Curso" valor={curso} />

          <CampoExibicao
            label="Plano de Ensino Individualizado"
            valor={nomePei}
          />

          <CampoExibicao label="Identificador do PEI" valor={peiId} largo />
        </div>
      </SecaoSanfona>

      <SecaoSanfona titulo="2. Identificação do componente curricular">
        <div className="pea-view-grid">
          <CampoExibicao
            label="Componente curricular"
            valor={dados.componenteCurricular}
          />

          <CampoExibicao label="Semestre/Ano" valor={dados.semestreAno} />

          <CampoExibicao label="Docente" valor={dados.docente} largo />
        </div>
      </SecaoSanfona>

      <SecaoSanfona titulo="3. Planejamento pedagógico adaptado">
        <div className="pea-view-grid">
          <CampoExibicao
            label="Objetivo geral do componente curricular"
            valor={dados.objetivoGeral}
            largo
          />

          <CampoExibicao
            label="Objetivos específicos"
            valor={dados.objetivosEspecificos}
            largo
          />

          <CampoExibicao
            label="Conteúdos programáticos"
            valor={dados.conteudosProgramaticos}
            largo
          />

          <CampoExibicao label="Metodologia" valor={dados.metodologia} largo />

          <CampoExibicao label="Avaliação" valor={dados.avaliacao} largo />
        </div>
      </SecaoSanfona>

      <SecaoSanfona titulo="4. Referências bibliográficas">
        <div className="pea-view-grid">
          <CampoExibicao
            label="Bibliografia básica"
            valor={dados.bibliografiaBasica}
            largo
          />

          <CampoExibicao
            label="Bibliografia complementar"
            valor={dados.bibliografiaComplementar}
            largo
          />
        </div>
      </SecaoSanfona>

      {typeof onEdit === "function" && (
        <div className="pea-view-rodape">
          <button
            type="button"
            className="pea-view-btn-editar"
            onClick={() => onEdit(dados)}
          >
            <HiOutlinePencilAlt className="action-icon" />
            <span>Editar este PEA</span>
          </button>
        </div>
      )}
    </div>
  );
}
