import TrashImg from "../../../assets/TrashCan.png";
import EditImg from "../../../assets/Edit.png";
import { useState } from "react";
import "./AlunoList.css";
import Search from "../../../assets/Search.png";
import ArrowDown from "../../../assets/Chevron-down.png";
import ChevronLeft from "../../../assets/ChevronLeft.png";
import ChevronRight from "../../../assets/ChevronRight.png";
function AlunoList({
  alunos,
  isLoading,
  erro,
  onDelete,
  onEdit,
  onView,
  onAdd,
}) {
  const [tabAtiva, setTabAtiva] = useState("todos");

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

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;
  const [termoBusca, setTermoBusca] = useState("");

  // Se estiver carregando, mostra só isso e para
  if (isLoading) {
    return (
      <div className="aluno-list-body">
        <p>Carregando...</p>
      </div>
    );
  }

  // Se houver erro, mostra só o erro e para
  if (erro) {
    return (
      <div className="aluno-list-body">
        <p>Erro: {erro.detail || erro}</p>
      </div>
    );
  }

  // Se a lista estiver vazia
  if (!alunos || alunos.length === 0) {
    return (
      <div className="aluno-list-body">
        <p>Nenhum aluno encontrado.</p>
      </div>
    );
  }

  const alunosFiltrados = alunos.filter((aluno) => {
    let passaTab = true;
    if (tabAtiva === "ativos") {
      passaTab = aluno.ativo;
    } else if (tabAtiva === "arquivados") {
      passaTab = !aluno.ativo;
    }

    // filtro de busca
    const passaBusca =
      aluno.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      aluno.matricula.includes(termoBusca);

    // Retorna apenas se corresponder à aba ativa E ao texto da pesquisa
    return passaTab && passaBusca;
  });

  // Calcula os alunos que vão aparecer na página atual
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const alunosPaginados = alunosFiltrados.slice(
    indicePrimeiroItem,
    indiceUltimoItem,
  );

  // Calcula o número total de páginas necessárias
  const totalPaginas = Math.ceil(alunosFiltrados.length / itensPorPagina);

  const totalAlunos = alunos.length;
  const totalAtivos = alunos.filter((a) => a.ativo).length;
  const totalArquivado = alunos.filter((a) => !a.ativo).length;

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
              setTabAtiva("todos");
              setPaginaAtual(1);
            }}
            className={tabAtiva === "todos" ? "btn-ativo" : ""}
          >
            Todos os alunos <span className="badge">{totalAlunos}</span>
          </button>
          <button
            onClick={() => {
              setTabAtiva("ativos");
              setPaginaAtual(1);
            }}
            className={tabAtiva === "ativos" ? "btn-ativo" : ""}
          >
            Ativos <span className="badge">{totalAtivos}</span>
          </button>
          <button
            onClick={() => {
              setTabAtiva("arquivados");
              setPaginaAtual(1);
            }}
            className={tabAtiva === "arquivados" ? "btn-ativo" : ""}
          >
            Arquivados <span className="badge">{totalArquivado}</span>
          </button>
        </div>
        <div className="table-toolbar">
          <div className="search-container">
            <img src={Search} alt="Pesquisar" className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nome ou matrícula..."
              className="search-input"
              value={termoBusca}
              onChange={(e) => {
                setTermoBusca(e.target.value);
                setPaginaAtual(1); // Reseta para a página 1 ao pesquisar
              }}
            />
          </div>
          <div className="toolbar-right">
            <button className="toolbar-btn">
              <img src={ArrowDown} alt="Seta" className="arrow-icon" />
              Período / ano
            </button>

            <button className="toolbar-btn">
              <img src={ArrowDown} alt="Seta" className="arrow-icon" />
              Status
            </button>

            <button className="toolbar-btn">Filtros</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Log de Ingressão</th>
              <th>Status</th>
              <th>Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunosPaginados.map((aluno) => (
              <tr key={aluno.id}>
                <td onClick={() => handleView(aluno)}>
                  <div className="aluno-info">
                    <span className="aluno-nome">{aluno.nome}</span>
                    <span className="aluno-matricula">{aluno.matricula}</span>
                  </div>
                </td>
                <td>{aluno.log}</td>
                <td>
                  <span
                    className={`status-badge ${aluno.ativo ? "status-ativo" : "status-arquivado"}`}
                  >
                    <span className="status-dot"></span>
                    {aluno.ativo ? "Ativo" : "Arquivado"}
                  </span>
                </td>
                <td>{aluno.curso}</td>
                <td>
                  <button onClick={() => handleEdit(aluno)}>
                    <img src={EditImg} alt="Editar"></img>
                  </button>
                  <button onClick={() => handleDelete(aluno)}>
                    <img src={TrashImg} alt="Excluir"></img>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span className="footer-info">
            Mostrando {alunosFiltrados.length > 0 ? indicePrimeiroItem + 1 : 0}-
            {Math.min(indiceUltimoItem, alunosFiltrados.length)} de{" "}
            {alunosFiltrados.length} alunos
          </span>

          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaAtual === 1}
            >
              <img src={ChevronLeft} alt="Anterior" />
            </button>

            {Array.from({ length: totalPaginas }, (_, index) => {
              const numeroPagina = index + 1;
              return (
                <button
                  key={numeroPagina}
                  className={`page-btn ${paginaAtual === numeroPagina ? "active" : ""}`}
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
              <img src={ChevronRight} alt="Seguinte" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlunoList;
