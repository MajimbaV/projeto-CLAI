import { useState } from "react";
import ChevronLeft from "../../../assets/ChevronLeft.png";
import ChevronRight from "../../../assets/ChevronRight.png";
import { useGetAlunos } from "../../../hooks/useGetAlunos";

import "../alunolist/AlunoList.css";
import "./PlanejamentoAlunos.css";

const TIPOS_DOCUMENTO = [
  {
    id: "estudoCaso",
    titulo: "Estudo de caso",
    chaves: ["estudocaso", "estudoscaso", "estudodecaso", "estudosdecaso"],
    termos: ["estudodecaso", "estudosdecaso", "estudocaso"],
  },
  {
    id: "planoAtendimento",
    titulo: "Plano de atendimento",
    chaves: ["planoatendimento", "planosatendimento"],
    termos: ["planoatendimento", "planosatendimento"],
  },
  {
    id: "adaptacoes",
    titulo: "Adaptações",
    chaves: [
      "adaptacao",
      "adaptacoes",
      "adaptacaoeducacional",
      "adaptacoeseducacionais",
    ],
    termos: ["adaptacao", "adaptacoes"],
  },
  {
    id: "outrosDocumentos",
    titulo: "Outros documentos",
    chaves: ["outrosdocumentos"],
    termos: ["outrodocumento", "outrosdocumentos"],
  },
];

function normalizarTexto(valor) {
  return String(valor ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function formatarData(data) {
  if (!data) return null;

  const texto = String(data);
  const partes = texto.slice(0, 10).split("-");

  if (partes.length !== 3 || partes[0].length !== 4) {
    return texto;
  }

  const [ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
}

function obterDataDocumento(documento) {
  if (!documento || typeof documento !== "object") return null;

  return (
    documento.dataCriacao ||
    documento.createdAt ||
    documento.dataAtualizacao ||
    documento.updatedAt ||
    documento.data ||
    null
  );
}

function obterFonteCronologia(aluno, matricula, cronologiaPorMatricula) {
  if (
    cronologiaPorMatricula &&
    Object.prototype.hasOwnProperty.call(cronologiaPorMatricula, matricula)
  ) {
    return cronologiaPorMatricula[matricula];
  }

  return (
    aluno.documentosPlanejamento ??
    aluno.cronologiaPlanejamento ??
    aluno.planejamentoDocumentos ??
    aluno.planejamento?.documentos ??
    null
  );
}

function identificarTipoDocumento(documento) {
  const tipo = normalizarTexto(
    documento?.tipoDocumento ||
      documento?.tipo ||
      documento?.categoria ||
      documento?.nome ||
      documento?.titulo,
  );

  if (!tipo) return null;

  return (
    TIPOS_DOCUMENTO.find((item) =>
      item.termos.some((termo) => tipo.includes(termo)),
    )?.id || "outrosDocumentos"
  );
}

function resumirRegistros(registros) {
  const quantidade = registros.length;

  const datas = registros
    .map(obterDataDocumento)
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a));

  return {
    quantidade,
    ultimaData: datas.length > 0 ? formatarData(datas[0]) : null,
  };
}

function resumirValorDocumento(valor) {
  if (valor === undefined || valor === null || valor === false) {
    return { quantidade: 0, ultimaData: null };
  }

  if (valor === true) {
    return { quantidade: 1, ultimaData: null };
  }

  if (typeof valor === "number") {
    return {
      quantidade: Math.max(0, valor),
      ultimaData: null,
    };
  }

  if (Array.isArray(valor)) {
    return resumirRegistros(valor);
  }

  if (typeof valor === "object") {
    const registros =
      valor.content ?? valor.items ?? valor.registros ?? valor.documentos;

    if (Array.isArray(registros)) {
      return resumirRegistros(registros);
    }

    const quantidade =
      valor.quantidade ?? valor.totalElements ?? valor.total ?? valor.count;

    if (typeof quantidade === "number") {
      return {
        quantidade: Math.max(0, quantidade),
        ultimaData: formatarData(obterDataDocumento(valor)),
      };
    }

    if (
      typeof valor.existe === "boolean" ||
      typeof valor.concluido === "boolean"
    ) {
      const existe = valor.existe ?? valor.concluido;

      return {
        quantidade: existe ? 1 : 0,
        ultimaData: formatarData(obterDataDocumento(valor)),
      };
    }

    const temIdentificador =
      valor.id != null || valor._id != null || valor.estudoCasoId != null;

    const temData = Boolean(obterDataDocumento(valor));

    return {
      quantidade:
        temIdentificador || temData || Object.keys(valor).length > 0 ? 1 : 0,
      ultimaData: formatarData(obterDataDocumento(valor)),
    };
  }

  return { quantidade: 0, ultimaData: null };
}

function obterCronologia(fonte, tipoDocumento) {
  if (fonte == null) {
    return { conhecido: false, quantidade: 0, ultimaData: null };
  }

  const fonteLista = Array.isArray(fonte)
    ? fonte
    : Array.isArray(fonte.documentos)
      ? fonte.documentos
      : Array.isArray(fonte.content)
        ? fonte.content
        : null;

  if (fonteLista) {
    const registros = fonteLista.filter(
      (documento) => identificarTipoDocumento(documento) === tipoDocumento.id,
    );

    return {
      conhecido: true,
      ...resumirRegistros(registros),
    };
  }

  const entradas = Object.entries(fonte);
  const aliases = tipoDocumento.chaves;

  const entrada = entradas.find(([chave]) =>
    aliases.includes(normalizarTexto(chave)),
  );

  if (entrada) {
    return {
      conhecido: true,
      ...resumirValorDocumento(entrada[1]),
    };
  }

  // Há uma fonte de cronologia disponível, mas esse tipo de documento
  // não aparece nela.
  return {
    conhecido: true,
    quantidade: 0,
    ultimaData: null,
  };
}

function CronologiaDocumentos({ aluno, matricula, cronologiaPorMatricula }) {
  const fonte = obterFonteCronologia(aluno, matricula, cronologiaPorMatricula);

  return (
    <div className="planejamento-cronologia">
      {TIPOS_DOCUMENTO.map((tipo) => {
        const resumo = obterCronologia(fonte, tipo);

        const classeStatus = !resumo.conhecido
          ? "desconhecido"
          : resumo.quantidade > 0
            ? "feito"
            : "pendente";

        let textoStatus = "Não consultado";

        if (resumo.conhecido) {
          textoStatus =
            resumo.quantidade > 0
              ? `${resumo.quantidade} ${
                  resumo.quantidade === 1 ? "registro" : "registros"
                }`
              : "Não cadastrado";
        }

        return (
          <div
            className={`planejamento-documento-status ${classeStatus}`}
            key={tipo.id}
            title={
              resumo.ultimaData
                ? `${tipo.titulo} — último registro em ${resumo.ultimaData}`
                : tipo.titulo
            }
          >
            <span className="planejamento-documento-ponto" />

            <span className="planejamento-documento-textos">
              <span className="planejamento-documento-nome">{tipo.titulo}</span>

              <span className="planejamento-documento-resumo">
                {textoStatus}
              </span>

              {resumo.ultimaData && (
                <span className="planejamento-documento-data">
                  Último: {resumo.ultimaData}
                </span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PlanejamentoAlunos({
  onViewPlanning,
  onAddAluno,
  onNovoEstudoCaso,
  cronologiaPorMatricula,
}) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const { data, isLoading, error } = useGetAlunos(paginaAtual, itensPorPagina);

  const alunos = data?.content || [];
  const quantidadeAlunos = data?.numberOfElements || 0;
  const totalPaginas = data?.totalPages || 0;
  const totalAlunos = data?.totalElements || 0;

  function abrirPlanejamento(aluno) {
    const matricula = aluno.alunoMatricula || aluno.matricula;

    if (!matricula || !onViewPlanning) return;

    onViewPlanning(aluno);
  }

  function renderizarCabecalho(mostrarAcoes) {
    return (
      <div className="header">
        <h1 className="header-text">Planejamento</h1>

        {mostrarAcoes && (
          <div className="planejamento-alunos-header-acoes">
            <button type="button" className="btn-add" onClick={onAddAluno}>
              + Adicionar Aluno
            </button>

            <button
              type="button"
              className="btn-add"
              onClick={onNovoEstudoCaso}
            >
              + Novo estudo de caso
            </button>
          </div>
        )}
      </div>
    );
  }

  // Mesmo comportamento do AlunoList durante o carregamento.
  if (isLoading) {
    return (
      <div className="aluno-list-body">
        {renderizarCabecalho(false)}
        <p>Carregando...</p>
      </div>
    );
  }

  // Mesmo comportamento do AlunoList quando ocorre um erro.
  if (error) {
    return (
      <div className="aluno-list-body">
        {renderizarCabecalho(false)}
        <p>Erro: {error.detail || error.message || String(error)}</p>
      </div>
    );
  }

  // Sem alunos: cabeçalho e mensagem, sem cartão ou tabela.
  if (!alunos || alunos.length === 0) {
    return (
      <div className="aluno-list-body">
        {renderizarCabecalho(true)}
        <p>Nenhum aluno encontrado.</p>
      </div>
    );
  }

  return (
    <div className="aluno-list-body">
      {renderizarCabecalho(true)}

      <div className="aluno-card planejamento-alunos-card">
        <div className="planejamento-tabela-wrapper">
          <table className="planejamento-alunos-table">
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Curso</th>
                <th>Cronologia do planejamento</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {alunos.map((aluno, index) => {
                const matricula = aluno.alunoMatricula || aluno.matricula;

                return (
                  <tr key={aluno.id ?? matricula ?? `${paginaAtual}-${index}`}>
                    <td>
                      <button
                        type="button"
                        className="aluno-info planejamento-aluno-info"
                        onClick={() => abrirPlanejamento(aluno)}
                        disabled={!matricula || !onViewPlanning}
                      >
                        <span className="aluno-nome">
                          {aluno.alunoNome ||
                            aluno.nome ||
                            "Nome não informado"}
                        </span>

                        <span className="aluno-matricula">
                          {matricula || "Matrícula não informada"}
                        </span>
                      </button>
                    </td>

                    <td>
                      {aluno.alunoCurso || aluno.curso || "Não informado"}
                    </td>

                    <td>
                      <CronologiaDocumentos
                        aluno={aluno}
                        matricula={matricula}
                        cronologiaPorMatricula={cronologiaPorMatricula}
                      />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="planejamento-btn-acessar"
                        onClick={() => abrirPlanejamento(aluno)}
                        disabled={!matricula || !onViewPlanning}
                      >
                        Visualizar planejamento
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span className="footer-info">
            Mostrando {quantidadeAlunos} de {totalAlunos} alunos
          </span>

          <div className="pagination">
            <button
              type="button"
              className="page-btn"
              onClick={() =>
                setPaginaAtual((pagina) => Math.max(pagina - 1, 1))
              }
              disabled={paginaAtual === 1}
            >
              <img src={ChevronLeft} alt="Anterior" />
            </button>

            {Array.from({ length: totalPaginas }, (_, index) => {
              const numeroPagina = index + 1;

              return (
                <button
                  type="button"
                  key={numeroPagina}
                  className={`page-btn ${
                    paginaAtual === numeroPagina ? "active" : ""
                  }`}
                  onClick={() => setPaginaAtual(numeroPagina)}
                >
                  {numeroPagina}
                </button>
              );
            })}

            <button
              type="button"
              className="page-btn"
              onClick={() =>
                setPaginaAtual((pagina) => Math.min(pagina + 1, totalPaginas))
              }
              disabled={paginaAtual === totalPaginas || totalPaginas === 0}
            >
              <img src={ChevronRight} alt="Seguinte" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanejamentoAlunos;
