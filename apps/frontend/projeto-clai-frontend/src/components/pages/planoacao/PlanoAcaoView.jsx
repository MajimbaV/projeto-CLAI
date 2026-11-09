import "./PlanoAcaoView.css";

const CAMPOS_CLINICOS = [
  {
    pergunta: "Possui comorbidade relevante?",
    campoResposta: "comorbidadeRelevante",
    campoDescricao: "comorbidadeDescricao",
  },
  {
    pergunta: "Faz uso de medicação?",
    campoResposta: "fazUsoMedicacao",
    campoDescricao: "medicacaoDescricao",
  },
  {
    pergunta: "Frequenta serviços de apoio?",
    campoResposta: "frequentaServicoApoio",
    campoDescricao: "servicoApoioDescricao",
  },
  {
    pergunta: "Apresentou documentos comprobatórios?",
    campoResposta: "apresentouDocumentos",
    campoDescricao: "documentosDescricao",
  },
];

const SECOES_DESCRITIVAS = [
  {
    titulo: "Identificação das necessidades específicas",
    campo: "necessidades",
  },
  {
    titulo:
      "Relato de avanços, dificuldades e potencialidades no percurso educacional",
    campo: "relatoDificuldades",
  },
  {
    titulo: "Principais demandas identificadas",
    campo: "demandas",
  },
  {
    titulo: "Descrição das propostas iniciais de intervenção",
    campo: "propostas",
  },
];

function formatarData(data) {
  if (!data) return "Não informada";

  const partes = String(data).slice(0, 10).split("-");

  if (partes.length !== 3 || partes[0].length !== 4) {
    return String(data);
  }

  const [ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
}

function formatarResposta(resposta) {
  if (resposta === "SIM") return "Sim";
  if (resposta === "NAO") return "Não";
  return "Não informado";
}

function PlanoAcaoView({ plano }) {
  if (!plano) return null;

  const idPrefix = `plano-acao-view-${plano.id}`;

  return (
    <div className="plano-acao-view">
      <dl className="plano-acao-view-metadados">
        <div>
          <dt>Data do Plano de Ação</dt>
          <dd>{formatarData(plano.dataPlano)}</dd>
        </div>

        {plano.alunoNome && (
          <div>
            <dt>Aluno</dt>
            <dd>{plano.alunoNome}</dd>
          </div>
        )}

        {plano.matricula && (
          <div>
            <dt>Matrícula</dt>
            <dd>{plano.matricula}</dd>
          </div>
        )}
      </dl>

      <section
        className="plano-acao-view-bloco"
        aria-labelledby={`${idPrefix}-clinico`}
      >
        <h3 id={`${idPrefix}-clinico`}>
          Informações clínicas e de apoio
        </h3>

        <div className="plano-acao-view-campos-clinicos">
          {CAMPOS_CLINICOS.map((campo) => {
            const resposta = plano[campo.campoResposta];
            const descricoes = Array.isArray(plano[campo.campoDescricao])
              ? plano[campo.campoDescricao].filter(
                  (descricao) =>
                    typeof descricao === "string" && descricao.trim(),
                )
              : [];

            return (
              <section
                className="plano-acao-view-campo-clinico"
                key={campo.campoResposta}
              >
                <div className="plano-acao-view-campo-cabecalho">
                  <h4>{campo.pergunta}</h4>
                  <span
                    className={`plano-acao-view-resposta ${
                      resposta === "SIM"
                        ? "positiva"
                        : resposta === "NAO"
                          ? "negativa"
                          : "indefinida"
                    }`}
                  >
                    {formatarResposta(resposta)}
                  </span>
                </div>

                {resposta === "SIM" &&
                  (descricoes.length > 0 ? (
                    <ul className="plano-acao-view-lista">
                      {descricoes.map((descricao, index) => (
                        <li key={`${campo.campoDescricao}-${index}`}>
                          {descricao}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="plano-acao-view-sem-descricao">
                      Nenhuma descrição informada.
                    </p>
                  ))}
              </section>
            );
          })}
        </div>
      </section>

      <section
        className="plano-acao-view-bloco plano-acao-view-descritivo"
        aria-labelledby={`${idPrefix}-descritivo`}
      >
        <h3 id={`${idPrefix}-descritivo`}>Informações descritivas</h3>

        {SECOES_DESCRITIVAS.map((secao) => (
          <section
            className="plano-acao-view-secao"
            key={secao.campo}
            aria-labelledby={`${idPrefix}-${secao.campo}`}
          >
            <h4 id={`${idPrefix}-${secao.campo}`}>{secao.titulo}</h4>
            <p>{plano[secao.campo] || "Não informado."}</p>
          </section>
        ))}
      </section>
    </div>
  );
}

export default PlanoAcaoView;
