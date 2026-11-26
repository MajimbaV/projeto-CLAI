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

export default function PeaView({ dados, onEdit }) {
  if (!dados) {
    return <p>Nenhum dado encontrado.</p>;
  }

  return (
    <div className="pea-view-container">
      <SecaoSanfona
        titulo="1. Identificação do componente curricular"
        padraoAberto
      >
        <div className="pea-view-grid">
          <CampoExibicao
            label="Componente curricular"
            valor={dados.componenteCurricular}
          />

          <CampoExibicao label="Semestre/Ano" valor={dados.semestreAno} />

          <CampoExibicao label="Docente" valor={dados.docente} largo />
        </div>
      </SecaoSanfona>

      <SecaoSanfona titulo="2. Planejamento pedagógico adaptado">
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

      <SecaoSanfona titulo="3. Referências bibliográficas">
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
