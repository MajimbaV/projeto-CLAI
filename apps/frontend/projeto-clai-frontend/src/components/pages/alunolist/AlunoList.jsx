import { useState } from "react";
import "./AlunoList.css";
import SearchBar from "../../queries/searchBar/SearchBar.jsx";
import Selector from "../../queries/selector/Selector.jsx";
import { contemApenasNumeros } from "../../../utils/validations.js";
import { useGetAlunos } from "../../../hooks/useGetAlunos";
import { HiOutlineArchive, HiOutlinePencilAlt, HiChevronLeft, HiChevronRight} from "react-icons/hi";


const filtrosIniciais = {
  nome: undefined,
  matricula: undefined,
  curso: undefined,
  periodo: undefined,
  maioridade: undefined,
  statusAtivo: true
};

const opcoesSort = [
  {value: "alunoNome,asc", label: "Nome (A-Z)"},
  {value: "alunoNome,desc", label: "Nome (Z-A)"},
  {value: "alunoMatricula,asc", label: "Matrícula (Crescente)"},
  {value: "alunoMatricula,desc", label: "Matrícula (Decrescente)"},
  {value: "alunoCurso,asc", label: "Curso (A-Z)"},
  {value: "alunoCurso,desc", label: "Curso (Z-A)"},
]


const opcoesCurso = [
  {value: "Integrado em Informática", label: "Integrado em Informática"},
  {value: "Integrado em Eletromecânica", label: "Integrado em Eletromecânica"},
  {value: "Integrado em Meio Ambiente", label: "Integrado em Meio Ambiente"},
  {value: "Bacharelado em Engenharia de Controle e Automação", label: "Bacharelado em Engenharia de Controle e Automação"},
  {value: "Análise e Desenvolvimento de Sistemas", label: "Análise e Desenvolvimento de Sistemas"},
  {value: "Licenciatura em Matemática", label: "Licenciatura em Matemática"},
  {value: "Licenciatura em Química", label: "Licenciatura em Química"},
  {value: "Bacharelado em Engenharia Civil", label: "Bacharelado em Engenharia Civil"},
  {value: "Tecnologia em Automação Industrial", label: "Tecnologia em Automação Industrial"},
];

const opcoesPeriodo = [
  {value: "2026.2", label: "2026.2"},
  {value: "2026.1", label: "2026.1"},
  {value: "2025.2", label: "2025.2"},
  {value: "2025.1", label: "2025.1"},
  {value: "2024.2", label: "2024.2"},
  {value: "2024.1", label: "2024.1"},
  {value: "2023.2", label: "2023.2"},
  {value: "2023.1", label: "2023.1"},
]

function AlunoList({ onDelete, onEdit, onView, onAdd }) {
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [sort, setSort] = useState("alunoNome,asc");
  const [tabAtual, setTabAtual] = useState("ativos"); 
  const [termoBusca, setTermoBusca] = useState("");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const { data, isLoading, error } = useGetAlunos({page: paginaAtual, size: itensPorPagina, filters: filtros, sort: sort});

  const alunos = data?.content || [];
  const quantidadeAlunos = data?.numberOfElements || 0;
  const totalPaginas = data?.totalPages || 0;
  const totalAlunosNoBanco = data?.totalElements || 0;

  function handleDelete(aluno) {
    onDelete(aluno);
  }

  function handleEdit(aluno) {
    onEdit(aluno);
  }

  function handleView(aluno) {
    onView(aluno);
  }

  function handleAdd() {
    onAdd();
  }

  function handleSearch (termoDebounced) {
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
  };

  function handleTabChange (tab){
    setTabAtual(tab);
    setFiltros((prev) => ({
      ...prev,
      statusAtivo: tab === "ativos" ? true : false,
    }));
    setPaginaAtual(1);
  }


  if (isLoading) {
    return (
      <div className="aluno-list-body">
        <div className="header">
          <h1 className="header-text">Alunos</h1>
        </div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aluno-list-body">
        <div className="header">
          <h1 className="header-text">Alunos</h1>
        </div>
        <p>Erro: {error.detail || error.message || String(error)}</p>
      </div>
    );
  }

  return (
    <div className="aluno-list-body">
      <div className="header">
        <h1 className="header-text">Alunos</h1>

        <button onClick={handleAdd} className="btn-add">
          + Adicionar Aluno
        </button>
      </div>

      <div className="aluno-card">
        <div className="filters">
          <button
            onClick={() => {
              handleTabChange("ativos");
            }}
            className={tabAtual === "ativos" ? "btn-ativo" : ""}
          >
            Ativos
          </button>
          <button
            onClick={() => {
              handleTabChange("arquivados");
            }}
            className={tabAtual === "arquivados" ? "btn-ativo" : ""}
          >
            Arquivados
          </button>
        </div>
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
              options={opcoesSort}/>
            
            <Selector
              value={filtros.curso}
              onChange={(e) => setFiltros((prev) => ({ ...prev, curso: e.target.value }))}
              options={[{value: "", label: "Todos os cursos"}, ...opcoesCurso]}/>

            <Selector
              value={filtros.periodo}
              onChange={(e) => setFiltros((prev) => ({ ...prev, periodo: e.target.value }))}
              options={[{value: "", label: "Todos os períodos"}, ...opcoesPeriodo]}/>

            <Selector
              value={filtros.maioridade}
              onChange={(e) => setFiltros((prev) => ({ ...prev, maioridade: e.target.value }))}
              options={[{value: "", label: "Todas as maioridades"},
                {value: true, label: "Maiores de idade"},
                {value: false, label: "Menores de idade"}
              ]}/>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Curso</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {alunos.length > 0 ? (
              alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td onClick={() => handleView(aluno)}>
                    <div className="aluno-info">
                      <span className="aluno-nome">{aluno.alunoNome}</span>
                      <span className="aluno-matricula">
                        {aluno.alunoMatricula}
                      </span>
                    </div>
                  </td>

                  <td>{aluno.alunoCurso}</td>

                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(aluno)}>
                        {<HiOutlinePencilAlt className="action-icon"/>} 
                      </button>

                      <button onClick={() => handleDelete(aluno)}>
                        {<HiOutlineArchive className="action-icon archive-icon"/>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Nenhum aluno encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        {alunos.length > 0 && (
          <div className="table-footer">
            <span className="footer-info">
              Mostrando {quantidadeAlunos} de {totalAlunosNoBanco} alunos
            </span>

            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaAtual === 1}
              >
                <HiChevronLeft className="page-icon" />
              </button>

              {Array.from({ length: totalPaginas }, (_, index) => {
                const numeroPagina = index + 1;

                return (
                  <button
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
                className="page-btn"
                onClick={() =>
                  setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
                }
                disabled={paginaAtual === totalPaginas || totalPaginas === 0}
              >
                <HiChevronRight className="page-icon" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlunoList;
