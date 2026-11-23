import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";

import "./RaiView.css";

const ValorNulo = () => (
  <span className="rai-view-valor-vazio">Não informado</span>
);

const CampoExibicao = ({ label, valor, largo = false }) => (
  <div className={`rai-view-campo ${largo ? "rai-view-campo-largo" : ""}`}>
    <span className="rai-view-label">{label}</span>

    <div className="rai-view-valor">
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
};

function formatarOpcoes(opcoes, outro) {
  const selecionadas = Array.isArray(opcoes)
    ? opcoes
    : typeof opcoes === "string" && opcoes
      ? [opcoes]
      : [];

  const resultado = selecionadas.filter((opcao) => opcao !== "Outros");

  if (selecionadas.includes("Outros")) {
    resultado.push(outro?.trim() ? `Outros: ${outro}` : "Outros");
  }

  return resultado.length > 0 ? resultado.join(", ") : "";
}

function formatarData(data) {
  if (!data) return "";

  const texto = String(data);
  const partes = texto.slice(0, 10).split("-");

  if (partes.length !== 3 || partes[0].length !== 4) {
    return texto;
  }

  const [ano, mes, dia] = partes;

  return `${dia}/${mes}/${ano}`;
}

export default function RaiView({ dados, onEdit }) {
  if (!dados) {
    return <p>Nenhum dado encontrado.</p>;
  }

  const identificacao = dados.identificacao || {};
  const aluno = identificacao.aluno || dados.aluno || {};

  const nomeEstudante =
    aluno.alunoNome ||
    identificacao.nomeEstudante ||
    dados.nomeEstudante ||
    dados.alunoNome;

  const matricula =
    aluno.alunoMatricula ||
    identificacao.matricula ||
    dados.matricula ||
    dados.alunoMatricula;

  const curso =
    aluno.alunoCurso || identificacao.curso || dados.curso || dados.alunoCurso;

  const periodoLetivo = dados.periodoLetivo || identificacao.periodoLetivo;

  const componenteCurricular =
    dados.componenteCurricular || identificacao.componenteCurricular;

  const docente = dados.docente || identificacao.docente;

  const peiId = dados.peiId ?? dados.pei?.id ?? dados.pei?._id;

  const habilidadesDesenvolvidas = Array.isArray(dados.habilidadesDesenvolvidas)
    ? dados.habilidadesDesenvolvidas
    : [];

  const habilidadesPreenchidas = habilidadesDesenvolvidas
    .map((habilidade, index) => ({
      ...habilidade,
      numero: index + 1,
    }))
    .filter(
      (habilidade) =>
        habilidade.habilidade ||
        habilidade.nivelAprendizado ||
        habilidade.observacoes,
    );

  return (
    <div className="rai-view-container">
      {/* Cabeçalho / Metadados */}
      <div className="rai-view-metadados">
        <div className="rai-view-metadados-grupo">
          <div className="rai-view-metadado-item">
            <span className="rai-view-metadado-label">Estudante</span>

            <span className="rai-view-metadado-valor">
              {nomeEstudante || "N/A"}
            </span>
          </div>

          <div className="rai-view-metadado-item">
            <span className="rai-view-metadado-label">Matrícula</span>

            <span className="rai-view-metadado-valor">
              {matricula || "N/A"}
            </span>
          </div>

          <div className="rai-view-metadado-item">
            <span className="rai-view-metadado-label">Curso</span>

            <span className="rai-view-metadado-valor">{curso || "N/A"}</span>
          </div>

          <div className="rai-view-metadado-item">
            <span className="rai-view-metadado-label">Período letivo</span>

            <span className="rai-view-metadado-valor">
              {periodoLetivo || "N/A"}
            </span>
          </div>

          <div className="rai-view-metadado-item">
            <span className="rai-view-metadado-label">
              Componente curricular
            </span>

            <span className="rai-view-metadado-valor">
              {componenteCurricular || "N/A"}
            </span>
          </div>

          <div className="rai-view-metadado-item">
            <span className="rai-view-metadado-label">Docente</span>

            <span className="rai-view-metadado-valor">{docente || "N/A"}</span>
          </div>
        </div>
      </div>

      <SecaoSanfona titulo="1. Aspectos observados" padraoAberto>
        <div className="rai-view-grid">
          <CampoExibicao
            label="Relacionamento"
            valor={formatarOpcoes(
              dados.relacionamento,
              dados.relacionamentoOutro,
            )}
            largo
          />

          <CampoExibicao
            label="Comentário sobre relacionamento"
            valor={dados.comentarioRelacionamento}
            largo
          />

          <CampoExibicao
            label="Principais habilidades cognitivas"
            valor={formatarOpcoes(
              dados.habilidadesCognitivas,
              dados.habilidadesCognitivasOutro,
            )}
            largo
          />

          <CampoExibicao
            label="Comentário sobre habilidades cognitivas"
            valor={dados.comentarioHabilidadesCognitivas}
            largo
          />

          <CampoExibicao
            label="Principais habilidades socioemocionais"
            valor={formatarOpcoes(
              dados.habilidadesSocioemocionais,
              dados.habilidadesSocioemocionaisOutro,
            )}
            largo
          />

          <CampoExibicao
            label="Comentário sobre habilidades socioemocionais"
            valor={dados.comentarioHabilidadesSocioemocionais}
            largo
          />
        </div>
      </SecaoSanfona>

      <SecaoSanfona titulo="2. Acompanhamento do estudante">
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
        {habilidadesPreenchidas.length > 0 ? (
          <div className="rai-view-habilidades">
            {habilidadesPreenchidas.map((habilidade) => (
              <div className="rai-view-habilidade" key={habilidade.numero}>
                <h3>Habilidade {habilidade.numero}</h3>

                <div className="rai-view-grid">
                  <CampoExibicao
                    label="Habilidade desenvolvida"
                    valor={habilidade.habilidade}
                    largo
                  />

                  <CampoExibicao
                    label="Nível de aprendizado"
                    valor={habilidade.nivelAprendizado}
                  />

                  <CampoExibicao
                    label="Observações"
                    valor={habilidade.observacoes}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rai-view-vazio">
            Nenhuma habilidade desenvolvida foi registrada.
          </p>
        )}
      </SecaoSanfona>

      <SecaoSanfona titulo="4. Parecer">
        <div className="rai-view-grid">
          <CampoExibicao
            label="Parecer do acompanhamento"
            valor={dados.parecer}
            largo
          />

          <CampoExibicao label="Data" valor={formatarData(dados.data)} />

          <CampoExibicao
            label="Assinatura do(a) docente"
            valor={dados.assinaturaDocente}
          />

          <CampoExibicao label="Identificador do PEI associado" valor={peiId} />
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
