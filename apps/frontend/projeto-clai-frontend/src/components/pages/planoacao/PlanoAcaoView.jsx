import EditImg from "../../../assets/Edit.png";
import "./PlanoAcaoView.css";

const CAMPOS_CLINICOS = [
  {
    pergunta: "Possui comorbidades relevantes?",
    campoResposta: "comorbidadeRelevante",
    campoDescricao: "comorbidadeDescricao",
    emptyPositiveMessage: "Nenhuma comorbidade informada.",
  },
  {
    pergunta: "Faz uso de medicação contínua?",
    campoResposta: "fazUsoMedicacao",
    campoDescricao: "medicacaoDescricao",
    emptyPositiveMessage: "Nenhuma medicação informada.",
  },
  {
    pergunta: "Frequenta serviços de apoio externos (ex.: FUNAD, APAE)?",
    campoResposta: "frequentaServicoApoio",
    campoDescricao: "servicoApoioDescricao",
    emptyPositiveMessage: "Nenhum serviço de apoio informado.",
  },
  {
    pergunta: "Apresentou documentos comprobatórios?",
    campoResposta: "apresentouDocumentos",
    campoDescricao: "documentosDescricao",
    emptyPositiveMessage: "Nenhum documento comprobatório informado.",
  },
];

const SECOES_DESCRITIVAS = [
  {
    titulo: "Identificação das necessidades específicas",
    campo: "necessidades",
    placeholder: "Não informado.",
  },
  {
    titulo:
      "Relato sistematizado (Avanços, dificuldades e potencialidades no percurso educacional)",
    campo: "relatoDificuldades",
    campoAlternativo: "relatoSistematizado",
    placeholder: "Não informado.",
  },
  {
    titulo: "Principais demandas identificadas",
    campo: "demandas",
    placeholder: "Não informado.",
  },
  {
    titulo: "Descrição das propostas iniciais de intervenção",
    campo: "propostas",
    placeholder: "Não informado.",
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

function normalizarDescricoes(valor) {
  if (!valor) return [];

  if (Array.isArray(valor)) {
    return valor
      .filter((item) => typeof item === "string" && item.trim() !== "")
      .map((item) => item.trim());
  }

  if (typeof valor === "string") {
    return valor
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function formatarResposta(resposta) {
  if (resposta === "SIM" || resposta === true) return "Sim";
  if (resposta === "NAO" || resposta === false) return "Não";
  return "Não informado";
}

function PlanoAcaoView({ plano, onEdit }) {
  if (!plano) return null;

  const idPrefix = `plano-acao-view-${plano.id || "detalhe"}`;

  return (
    <div className="plano-acao-view">
      {/* Bloco de Metadados Básicos do Plano */}
      <div className="plano-acao-view-metadados">
        <div className="plano-acao-metadado-item">
          <span className="plano-acao-metadado-label">Data de elaboração</span>
          <strong className="plano-acao-metadado-valor">
            {formatarData(plano.dataPlano || plano.dataCriacao || plano.createdAt)}
          </strong>
        </div>

        {typeof plano.statusAtivo === "boolean" && (
          <div className="plano-acao-metadado-item">
            <span className="plano-acao-metadado-label">Situação</span>
            <span
              className={`plano-acao-badge-situacao ${
                plano.statusAtivo ? "ativa" : "inativa"
              }`}
            >
              {plano.statusAtivo ? "Ativo" : "Inativo"}
            </span>
          </div>
        )}
      </div>

      {/* Bloco Clínico e de Apoio */}
      <section
        className="plano-acao-view-bloco"
        aria-labelledby={`${idPrefix}-clinico`}
      >
        <div className="plano-acao-bloco-cabecalho">
          <h3 id={`${idPrefix}-clinico`}>Informações clínicas e de apoio</h3>
          <span className="plano-acao-bloco-subtitulo">
            Acompanhamento de saúde, medicamentos e serviços externos
          </span>
        </div>

        <div className="plano-acao-view-campos-clinicos">
          {CAMPOS_CLINICOS.map((campo) => {
            const resposta = plano[campo.campoResposta];
            const isSim = resposta === "SIM" || resposta === true;
            const isNao = resposta === "NAO" || resposta === false;
            const descricoes = normalizarDescricoes(plano[campo.campoDescricao]);

            return (
              <div
                className="plano-acao-view-campo-clinico"
                key={campo.campoResposta}
              >
                <div className="plano-acao-view-campo-cabecalho">
                  <h4>{campo.pergunta}</h4>
                  <span
                    className={`plano-acao-view-resposta ${
                      isSim
                        ? "positiva"
                        : isNao
                          ? "negativa"
                          : "indefinida"
                    }`}
                  >
                    {formatarResposta(resposta)}
                  </span>
                </div>

                {isSim && (
                  <div className="plano-acao-view-campo-detalhe">
                    {descricoes.length > 0 ? (
                      <ul className="plano-acao-view-lista">
                        {descricoes.map((descricao, index) => (
                          <li key={`${campo.campoDescricao}-${index}`}>
                            {descricao}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="plano-acao-view-sem-descricao">
                        {campo.emptyPositiveMessage}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Blocos de Texto Extenso */}
      <section
        className="plano-acao-view-bloco plano-acao-view-descritivo"
        aria-labelledby={`${idPrefix}-descritivo`}
      >
        <div className="plano-acao-bloco-cabecalho">
          <h3 id={`${idPrefix}-descritivo`}>
            Planejamento pedagógico e intervenções
          </h3>
          <span className="plano-acao-bloco-subtitulo">
            Diagnóstico, relato formativo, demandas prioritárias e propostas de intervenção
          </span>
        </div>

        <div className="plano-acao-view-secoes-container">
          {SECOES_DESCRITIVAS.map((secao) => {
            const conteudo =
              plano[secao.campo] ||
              (secao.campoAlternativo ? plano[secao.campoAlternativo] : "") ||
              secao.placeholder;

            return (
              <article
                className="plano-acao-view-secao"
                key={secao.campo}
                aria-labelledby={`${idPrefix}-${secao.campo}`}
              >
                <div className="plano-acao-view-secao-cabecalho">
                  <span className="plano-acao-view-secao-indicador" />
                  <h4 id={`${idPrefix}-${secao.campo}`}>{secao.titulo}</h4>
                </div>
                <div className="plano-acao-view-secao-conteudo">
                  <p>{conteudo}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Ação de Edição no rodapé do componente (opcional) */}
      {typeof onEdit === "function" && (
        <div className="plano-acao-view-rodape">
          <button
            type="button"
            className="plano-acao-view-btn-editar"
            onClick={() => onEdit(plano)}
          >
            <img src={EditImg} alt="" />
            <span>Editar este Plano de Ação</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default PlanoAcaoView;
