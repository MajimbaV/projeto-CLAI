import { useState } from "react";
import ChevronLeft from "../../../assets/ChevronLeft.png";
import ChevronRight from "../../../assets/ChevronRight.png";
import { useGetPendenciaDocumentos } from "../../../hooks/aluno/useGetPendenciaDocumentos";
import { getAlunos, getCursos } from "../../../services/AlunoServiceMock";
import SearchBar from "../../queries/searchBar/SearchBar";
import Selector from "../../queries/selector/Selector";
import { contemApenasNumeros } from "../../../utils/validations";

import "../alunolist/AlunoList.css";
import "./PlanejamentoAlunos.css";

/*
 * Integração futura com a API:
 * import { useGetAlunos } from "../../../hooks/aluno/useGetAlunos";
 * import { useGetCursos } from "../../../hooks/curso/useGetCursos";
 */

const TIPOS_DOCUMENTO = [
  {
    id: "estudoCaso",
    titulo: "Estudo de Caso",
    chaves: ["estudocaso", "estudoscaso", "estudodecaso", "estudosdecaso"],
    termos: ["estudodecaso", "estudosdecaso", "estudocaso"],
  },
  {
    id: "planoAcao",
    titulo: "Plano de Ação",
    chaves: ["planoacao", "planosacao"],
    termos: ["planoacao", "planosacao"],
  },
  {
    id: "pei",
    titulo: "PEI",
    chaves: ["planoensinoindividual", "pei"],
    termos: ["planoensinoindividual", "pei"],
  },
];

function StatusDocumentos({ matricula }) {
  // As pendências seguem o hook existente; a lista de alunos é que usa o mock.
  const pendencias = useGetPendenciaDocumentos(matricula);

  return (
    <div className="planejamento-cronologia">
      {TIPOS_DOCUMENTO.map((tipo) => {
        const pendencia = pendencias[tipo.id];

        const classeStatus =
          pendencia == null ? "desconhecido" : !pendencia ? "feito" : "pendente";

        let textoStatus = "Não consultado";

        if (pendencia != null) {
          textoStatus = !pendencia ? "Cadastrado" : "Pendente";
        }

        return (
          <div
            className={`planejamento-documento-status ${classeStatus}`}
            key={tipo.id}
          >
            <span className="planejamento-documento-ponto" />

            <span className="planejamento-documento-textos">
              <span className="planejamento-documento-nome">
                {tipo.titulo}
              </span>

              <span className="planejamento-documento-resumo">
                {textoStatus}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

const filtrosIniciais = {
  nome: undefined,
  matricula: undefined,
  cursoId: undefined,
  periodo: undefined,
  maioridade: undefined,
  statusAtivo: true,
};

const opcoesSort = [
  { value: "alunoNome,asc", label: "Nome (A-Z)" },
  { value: "alunoNome,desc", label: "Nome (Z-A)" },
  { value: "alunoMatricula,asc", label: "Matrícula (Crescente)" },
  { value: "alunoMatricula,desc", label: "Matrícula (Decrescente)" },
  { value: "alunoCurso,asc", label: "Curso (A-Z)" },
  { value: "alunoCurso,desc", label: "Curso (Z-A)" },
];

const opcoesPeriodo = [
  { value: "2026.2", label: "2026.2" },
  { value: "2026.1", label: "2026.1" },
  { value: "2025.2", label: "2025.2" },
  { value: "2025.1", label: "2025.1" },
  { value: "2024.2", label: "2024.2" },
  { value: "2024.1", label: "2024.1" },
  { value: "2023.2", label: "2023.2" },
  { value: "2023.1", label: "2023.1" },
];

function PlanejamentoAlunos({ onViewPlanning, onNovoEstudoCaso }) {
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [sort, setSort] = useState("alunoNome,asc");
  const [termoBusca, setTermoBusca] = useState("");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  // Mock para teste local: alunos e cursos vêm de AlunoServiceMock.
  const data = getAlunos({
    page: paginaAtual - 1,
    size: itensPorPagina,
    filters: filtros,
    sort: sort,
  });
  const cursosData = getCursos({ size: 100 });

  /*
   * Integração futura com a API: descomente os hooks e substitua as chamadas
   * mock acima. A página do hook é 1-based; a do mock é 0-based.
   *
   * const { data, isLoading, error } = useGetAlunos({
   *   page: paginaAtual,
   *   size: itensPorPagina,
   *   filters: filtros,
   *   sort,
   * });
   * const {
   *   data: cursosData,
   *   isLoading: isCursosLoading,
   *   error: cursosError,
   * } = useGetCursos({ size: 100 });
   *
   * if (isLoading || isCursosLoading) {
   *   return (
   *     <div className="aluno-list-body">
   *       {renderizarCabecalho(false)}
   *       <p>Carregando...</p>
   *     </div>
   *   );
   * }
   *
   * if (error) {
   *   return (
   *     <div className="aluno-list-body">
   *       {renderizarCabecalho(false)}
   *       <p>Erro: {error.detail || error.message || String(error)}</p>
   *     </div>
   *   );
   * }
   */

  const opcoesCurso =
    cursosData?.content?.map((curso) => ({
      value: curso.id,
      label: `${curso.nomeCurso} (${curso.cursoSigla})`,
    })) || [];

  const alunos = data?.content || [];
  const quantidadeAlunos = data?.numberOfElements || 0;
  const totalPaginas = data?.totalPages || 0;
  const totalAlunos = data?.totalElements || 0;

  function abrirPlanejamento(aluno) {
    const matricula = aluno.alunoMatricula || aluno.matricula;

    if (!matricula || !onViewPlanning) return;

    onViewPlanning(aluno);
  }

  function handleSearch(termoDebounced) {
    let nome = undefined;
    let matricula = undefined;

    // Só aplica o filtro se tiver 3 ou mais caracteres
    if (termoDebounced.trim().length >= 3) {
      if (contemApenasNumeros(termoDebounced)) {
        matricula = termoDebounced;
      } else {
        nome = termoDebounced;
      }
    }

    setFiltros((prev) => ({
      ...prev,
      nome,
      matricula,
    }));

    setPaginaAtual(1);
  }

  function renderizarCabecalho(mostrarAcoes) {
    return (
      <div className="header">
        <h1 className="header-text">Planejamento</h1>

        {mostrarAcoes && (
          <div className="planejamento-alunos-header-acoes">
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

  return (
    <div className="aluno-list-body">
      {renderizarCabecalho(true)}

      <div className="aluno-card planejamento-alunos-card">
        <div className="table-toolbar">
          <div className="search-container">
            <SearchBar
              value={termoBusca}
              onChange={setTermoBusca}
              onSearch={handleSearch}
              placeholder="Buscar por nome ou matrícula..."
            />
          </div>
          <div className="toolbar-right">
            <Selector
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              options={opcoesSort}
            />

            <Selector
              value={filtros.cursoId}
              onChange={(e) =>
                setFiltros((prev) => ({ ...prev, cursoId: e.target.value }))
              }
              options={[{ value: "", label: "Todos os cursos" }, ...opcoesCurso]}
            />

            <Selector
              value={filtros.periodo}
              onChange={(e) =>
                setFiltros((prev) => ({ ...prev, periodo: e.target.value }))
              }
              options={[
                { value: "", label: "Todos os períodos" },
                ...opcoesPeriodo,
              ]}
            />

            <Selector
              value={filtros.maioridade}
              onChange={(e) =>
                setFiltros((prev) => ({ ...prev, maioridade: e.target.value }))
              }
              options={[
                { value: "", label: "Todas as maioridades" },
                { value: true, label: "Maiores de idade" },
                { value: false, label: "Menores de idade" },
              ]}
            />
          </div>
        </div>

        <div className="planejamento-tabela-wrapper">
          <table className="planejamento-alunos-table">
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Curso</th>
                <th>Status dos documentos</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {alunos.length > 0 ? (
                alunos.map((aluno, index) => {
                  const matricula = aluno.alunoMatricula || aluno.matricula;

                  return (
                    <tr
                      key={aluno.id ?? matricula ?? `${paginaAtual}-${index}`}
                    >
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
                        <StatusDocumentos matricula={matricula} />
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
                })
              ) : (
                <tr>
                  <td colSpan={4}>Nenhum aluno encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {alunos.length > 0 && (
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
        )}
      </div>
    </div>
  );
}

export default PlanejamentoAlunos;