import { useEffect, useState } from "react";
import "./CursoList.css";

import SearchBar from "../../queries/searchBar/SearchBar.jsx";
import Selector from "../../queries/selector/Selector.jsx";

import { getCursos } from "../../../services/CursoServiceMock";

import {
  HiOutlineArchive,
  HiOutlinePencilAlt,
  HiOutlineCheck,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const filtrosIniciais = {
  nomeCurso: undefined,
  nivelEnsino: "",
  modalidade: "",
  turno: "",
};

const opcoesSort = [
  { value: "nomeCurso,asc", label: "Nome (A-Z)" },
  { value: "nomeCurso,desc", label: "Nome (Z-A)" },
  { value: "cursoSigla,asc", label: "Sigla (A-Z)" },
  { value: "cursoSigla,desc", label: "Sigla (Z-A)" },
];

const opcoesNivelEnsino = [
  { value: "", label: "Todos os níveis" },
  { value: "TECNICO_INTEGRADO", label: "Técnico Integrado" },
  { value: "TECNICO_SUBSEQUENTE", label: "Técnico Subsequente" },
  { value: "GRADUACAO", label: "Graduação" },
  { value: "POS_GRADUACAO", label: "Pós-graduação" },
];

const opcoesModalidade = [
  { value: "", label: "Todas as modalidades" },
  { value: "PRESENCIAL", label: "Presencial" },
  { value: "EAD", label: "EAD" },
];

const opcoesTurno = [
  { value: "", label: "Todos os turnos" },
  { value: "MATUTINO", label: "Matutino" },
  { value: "VESPERTINO", label: "Vespertino" },
  { value: "NOTURNO", label: "Noturno" },
  { value: "INTEGRAL", label: "Integral" },
];

const niveisEnsinoLabels = {
  TECNICO_INTEGRADO: "Técnico Integrado",
  TECNICO_SUBSEQUENTE: "Técnico Subsequente",
  GRADUACAO: "Graduação",
  POS_GRADUACAO: "Pós-graduação",
};

const modalidadesLabels = {
  PRESENCIAL: "Presencial",
  EAD: "EAD",
};

const turnosLabels = {
  MATUTINO: "Matutino",
  VESPERTINO: "Vespertino",
  NOTURNO: "Noturno",
  INTEGRAL: "Integral",
};

function CursoList({
  onAdd,
  onEdit,
  onView,
  onDelete,
  onActivate,
  refreshKey = 0,
}) {
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [sort, setSort] = useState("nomeCurso,asc");
  const [tabAtual, setTabAtual] = useState("ativos");
  const [termoBusca, setTermoBusca] = useState("");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const [cursos, setCursos] = useState([]);
  const [quantidadeCursos, setQuantidadeCursos] = useState(0);
  const [totalCursosNoBanco, setTotalCursosNoBanco] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let componenteAtivo = true;

    async function carregarCursos() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getCursos({
          page: paginaAtual - 1,
          size: itensPorPagina,
          sort,
          filters: {
            ...filtros,
            statusAtivo: tabAtual === "ativos",
          },
        });

        if (!componenteAtivo) return;

        const listaCursos = data?.content || [];

        setCursos(listaCursos);
        setQuantidadeCursos(data?.numberOfElements || 0);
        setTotalCursosNoBanco(data?.totalElements || 0);
        setTotalPaginas(data?.totalPages || 0);

        if (data?.totalPages > 0 && paginaAtual > data.totalPages) {
          setPaginaAtual(data.totalPages);
        } else if (!data?.totalPages && paginaAtual > 1) {
          setPaginaAtual(1);
        }
      } catch (erro) {
        if (!componenteAtivo) return;

        setError(erro);
        setCursos([]);
        setQuantidadeCursos(0);
        setTotalCursosNoBanco(0);
        setTotalPaginas(0);
      } finally {
        if (componenteAtivo) {
          setIsLoading(false);
        }
      }
    }

    carregarCursos();

    return () => {
      componenteAtivo = false;
    };
  }, [paginaAtual, sort, tabAtual, filtros, refreshKey]);

  function handleSearch(termoDebounced) {
    const nomeCurso =
      termoDebounced.trim().length >= 3 ? termoDebounced.trim() : undefined;

    setFiltros((prev) => ({
      ...prev,
      nomeCurso,
    }));

    setPaginaAtual(1);
  }

  function handleTabChange(tab) {
    setTabAtual(tab);
    setPaginaAtual(1);
  }

  function handleFiltroChange(campo, valor) {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));

    setPaginaAtual(1);
  }

  function handleAdd() {
    onAdd?.();
  }

  function handleView(curso) {
    onView?.(curso);
  }

  function handleEdit(curso) {
    onEdit?.(curso);
  }

  function handleDelete(curso) {
    onDelete?.(curso);
  }

  function handleActivate(curso) {
    onActivate?.(curso);
  }

  function obterMensagemVazia() {
    const possuiFiltros =
      Boolean(filtros.nomeCurso) ||
      Boolean(filtros.nivelEnsino) ||
      Boolean(filtros.modalidade) ||
      Boolean(filtros.turno);

    if (possuiFiltros) {
      return "Nenhum curso corresponde aos filtros informados.";
    }

    return tabAtual === "ativos"
      ? "Nenhum curso ativo cadastrado."
      : "Nenhum curso desativado cadastrado.";
  }

  function obterMensagemErro(erro) {
    return (
      erro?.response?.data?.detail ||
      erro?.message ||
      "Não foi possível carregar os cursos."
    );
  }

  if (isLoading) {
    return (
      <div className="curso-list-body">
        <div className="curso-header">
          <h1 className="curso-header-text">Cursos</h1>
        </div>

        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="curso-list-body">
        <div className="curso-header">
          <h1 className="curso-header-text">Cursos</h1>
        </div>

        <p>Erro: {obterMensagemErro(error)}</p>
      </div>
    );
  }

  return (
    <div className="curso-list-body">
      <div className="curso-header">
        <h1 className="curso-header-text">Cursos</h1>

        <button onClick={handleAdd} className="curso-btn-add">
          + Adicionar um Curso
        </button>
      </div>

      <div className="curso-card">
        <div className="curso-filters">
          <button
            onClick={() => handleTabChange("ativos")}
            className={tabAtual === "ativos" ? "btn-ativo" : ""}
          >
            Ativos
          </button>

          <button
            onClick={() => handleTabChange("desativados")}
            className={tabAtual === "desativados" ? "btn-ativo" : ""}
          >
            Desativados
          </button>
        </div>

        <div className="curso-table-toolbar">
          <div className="curso-search-container">
            <SearchBar
              value={termoBusca}
              onChange={setTermoBusca}
              onSearch={handleSearch}
              placeholder="Buscar por nome do curso..."
            />
          </div>

          <div className="curso-toolbar-right">
            <Selector
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPaginaAtual(1);
              }}
              options={opcoesSort}
            />

            <Selector
              value={filtros.nivelEnsino}
              onChange={(e) =>
                handleFiltroChange("nivelEnsino", e.target.value)
              }
              options={opcoesNivelEnsino}
            />

            <Selector
              value={filtros.modalidade}
              onChange={(e) => handleFiltroChange("modalidade", e.target.value)}
              options={opcoesModalidade}
            />

            <Selector
              value={filtros.turno}
              onChange={(e) => handleFiltroChange("turno", e.target.value)}
              options={opcoesTurno}
            />
          </div>
        </div>

        <table className="curso-table">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Nível de ensino</th>
              <th>Modalidade</th>
              <th>Turno</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {cursos.length > 0 ? (
              cursos.map((curso) => (
                <tr key={curso.id}>
                  <td>
                    <button
                      type="button"
                      className="curso-info curso-info-button"
                      onClick={() => handleView(curso)}
                      title={`Visualizar ${curso.nomeCurso}`}
                    >
                      <span className="curso-nome">{curso.nomeCurso}</span>

                      <span className="curso-sigla">{curso.cursoSigla}</span>
                    </button>
                  </td>

                  <td>
                    {niveisEnsinoLabels[curso.nivelEnsino] || "Não informado"}
                  </td>

                  <td>
                    {modalidadesLabels[curso.cursoModalidade] ||
                      "Não informado"}
                  </td>

                  <td>{turnosLabels[curso.cursoTurno] || "Não informado"}</td>

                  <td>
                    <span
                      className={`curso-status-badge ${
                        curso.statusAtivo
                          ? "curso-status-ativo"
                          : "curso-status-desativado"
                      }`}
                    >
                      <span className="curso-status-dot" />

                      {curso.statusAtivo ? "Ativo" : "Desativado"}
                    </span>
                  </td>

                  <td>
                    <div className="curso-action-buttons">
                      {curso.statusAtivo ? (
                        <>
                          <button
                            type="button"
                            title="Editar curso"
                            aria-label={`Editar ${curso.nomeCurso}`}
                            onClick={() => handleEdit(curso)}
                          >
                            <HiOutlinePencilAlt className="curso-action-icon" />
                          </button>

                          <button
                            type="button"
                            title="Desativar curso"
                            aria-label={`Desativar ${curso.nomeCurso}`}
                            onClick={() => handleDelete(curso)}
                          >
                            <HiOutlineArchive className="curso-action-icon" />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          title="Ativar curso"
                          aria-label={`Ativar ${curso.nomeCurso}`}
                          onClick={() => handleActivate(curso)}
                        >
                          <HiOutlineCheck className="curso-action-icon" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="curso-empty-message">
                  {obterMensagemVazia()}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {cursos.length > 0 && (
          <div className="curso-table-footer">
            <span className="curso-footer-info">
              Mostrando {quantidadeCursos} de {totalCursosNoBanco} cursos
            </span>

            <div className="curso-pagination">
              <button
                className="curso-page-btn"
                onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaAtual === 1}
                aria-label="Página anterior"
              >
                <HiChevronLeft className="curso-page-icon" />
              </button>

              {Array.from({ length: totalPaginas }, (_, index) => {
                const numeroPagina = index + 1;

                return (
                  <button
                    key={numeroPagina}
                    className={`curso-page-btn ${
                      paginaAtual === numeroPagina ? "active" : ""
                    }`}
                    onClick={() => setPaginaAtual(numeroPagina)}
                  >
                    {numeroPagina}
                  </button>
                );
              })}

              <button
                className="curso-page-btn"
                onClick={() =>
                  setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
                }
                disabled={paginaAtual === totalPaginas || totalPaginas === 0}
                aria-label="Próxima página"
              >
                <HiChevronRight className="curso-page-icon" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CursoList;
