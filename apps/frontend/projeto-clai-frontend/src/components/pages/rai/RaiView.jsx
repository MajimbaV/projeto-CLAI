import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";

import "./RaiView.css";

function exibir(valor) {
  if (Array.isArray(valor)) {
    return valor.length > 0 ? valor.join(", ") : "Não informado";
  }

  if (valor === null || valor === undefined || valor === "") {
    return "Não informado";
  }

  return valor;
}

function formatarData(data) {
  if (!data) return "Não informado";

  const texto = String(data);
  const partes = texto.slice(0, 10).split("-");

  if (partes.length !== 3 || partes[0].length !== 4) return texto;

  const [ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
}

function CampoExibicao({ label, valor, largo = false }) {
  return (
    <div className={`rai-view-campo ${largo ? "rai-view-campo-largo" : ""}`}>
      <span className="rai-view-label">{label}</span>
      <div className="rai-view-valor">{exibir(valor)}</div>
    </div>
  );
}

function SecaoSanfona({ titulo, children, padraoAberto = false }) {
  const [aberta, setAberta] = useState(padraoAberto);

  return (
    <section className="rai-view-section">
      <button
        type="button"
        className="rai-view-section-toggle"
        onClick={() => setAberta((atual) => !atual)}
        aria-expanded={aberta}
      >
        <span className="rai-view-section-title">{titulo}</span>

        <span
          className={`rai-view-section-chevron ${aberta ? "expandido" : ""}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {aberta && <div className="rai-view-section-panel">{children}</div>}
    </section>
  );
}

function GrupoObservado({ titulo, selecionados, outro, comentario }) {
  return (
    <div className="rai-view-grupo-observado">
      <CampoExibicao label={titulo} valor={selecionados} />

      {selecionados?.includes("Outros") && (
        <CampoExibicao label="Outros" valor={outro} />
      )}

      <CampoExibicao label="Comentário" valor={comentario} largo />
    </div>
  );
}

function possuiDadosHabilidade(habilidade) {
  return Boolean(
    habilidade?.habilidadeDesenvolvida ||
    habilidade?.nivelAprendizado ||
    habilidade?.observacoes,
  );
}

function DadosPeaAssociado({ dados }) {
  const pea = dados.pea ?? {};

  const componenteCurricular =
    pea.componenteCurricular ?? dados.componenteCurricular;

  const periodoLetivo = pea.semestreAno ?? dados.periodoLetivo;

  const docente = pea.docente ?? dados.docente;

  const peaId = pea.id ?? dados.peaId;

  return (
    <section className="rai-view-pea-associado">
      <div className="rai-view-pea-header">
        <div>
          <h2>PEA associado</h2>
          <p>
            Este Relatório de Acompanhamento Individualizado está vinculado ao
            seguinte Plano de Ensino Adaptado.
          </p>
        </div>
      </div>

      {peaId || componenteCurricular || periodoLetivo || docente ? (
        <div className="rai-view-grid">
          <CampoExibicao
            label="Componente curricular"
            valor={componenteCurricular}
          />

          <CampoExibicao label="Período letivo" valor={periodoLetivo} />

          <CampoExibicao label="Docente" valor={docente} />

          <CampoExibicao label="Identificador do PEA" valor={peaId} largo />
        </div>
      ) : (
        <p className="rai-view-vazio-secao">
          Os dados do PEA associado não estão disponíveis.
        </p>
      )}
    </section>
  );
}

export default function RaiView({ dados, onEdit }) {
  if (!dados) {
    return <p className="rai-view-vazio">Nenhum dado encontrado.</p>;
  }

  const habilidades = Array.isArray(dados.habilidadesCompetencias)
    ? dados.habilidadesCompetencias
        .map((habilidade, index) => ({ habilidade, index }))
        .filter(({ habilidade }) => possuiDadosHabilidade(habilidade))
    : [];

  return (
    <div className="rai-view-container">
      <DadosPeaAssociado dados={dados} />

      <SecaoSanfona titulo="1. Aspectos observados" padraoAberto>
        <div className="rai-view-lista-grupos">
          <GrupoObservado
            titulo="Relacionamento"
            selecionados={dados.relacionamento}
            outro={dados.relacionamentoOutro}
            comentario={dados.comentarioRelacionamento}
          />

          <GrupoObservado
            titulo="Principais habilidades cognitivas"
            selecionados={dados.habilidadesCognitivas}
            outro={dados.habilidadesCognitivasOutro}
            comentario={dados.comentarioHabilidadesCognitivas}
          />

          <GrupoObservado
            titulo="Principais habilidades socioemocionais"
            selecionados={dados.habilidadesSocioemocionais}
            outro={dados.habilidadesSocioemocionaisOutro}
            comentario={dados.comentarioHabilidadesSocioemocionais}
          />
        </div>
      </SecaoSanfona>

      <SecaoSanfona titulo="2. Acompanhamento do estudante no período">
        <div className="rai-view-grid">
          <CampoExibicao
            label="Avanços gerais do(a) estudante no período"
            valor={dados.avancosGerais}
            largo
          />

          <CampoExibicao
            label="Dificuldades de aprendizagem observadas"
            valor={dados.dificuldadesAprendizagem}
            largo
          />

          <CampoExibicao
            label="Fatores externos que influenciam o processo escolar"
            valor={dados.fatoresExternos}
            largo
          />
        </div>
      </SecaoSanfona>

      <SecaoSanfona titulo="3. Habilidades e competências desenvolvidas">
        {habilidades.length === 0 ? (
          <p className="rai-view-vazio-secao">
            Nenhuma habilidade ou competência foi registrada.
          </p>
        ) : (
          <div className="rai-view-habilidades-lista">
            {habilidades.map(({ habilidade, index }) => (
              <article className="rai-view-habilidade" key={index}>
                <h3>Habilidade desenvolvida {index + 1}</h3>

                <div className="rai-view-grid">
                  <CampoExibicao
                    label="Habilidade desenvolvida"
                    valor={habilidade.habilidadeDesenvolvida}
                    largo
                  />

                  <CampoExibicao
                    label="Nível de aprendizado"
                    valor={habilidade.nivelAprendizado}
                  />

                  <CampoExibicao
                    label="Observações"
                    valor={habilidade.observacoes}
                    largo
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </SecaoSanfona>

      <SecaoSanfona titulo="4. Parecer">
        <div className="rai-view-grid">
          <CampoExibicao
            label="Parecer do(a) docente"
            valor={dados.parecer}
            largo
          />
        </div>
      </SecaoSanfona>

      <SecaoSanfona titulo="5. Finalização">
        <div className="rai-view-grid">
          <CampoExibicao label="Data" valor={formatarData(dados.data)} />
        </div>
      </SecaoSanfona>

      {typeof onEdit === "function" && (
        <div className="rai-view-rodape">
          <button
            type="button"
            className="rai-view-btn-editar"
            onClick={() => onEdit(dados)}
          >
            <HiOutlinePencilAlt className="action-icon" />
            <span>Editar este RAI</span>
          </button>
        </div>
      )}
    </div>
  );
}
