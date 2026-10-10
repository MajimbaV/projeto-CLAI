import TrashImg from "../../../assets/TrashCan.png";
import EditImg from "../../../assets/Edit.png";
import { useState } from "react";
import "./AlunoList.css";
import Search from "../../../assets/Search.png";
import ArrowDown from "../../../assets/Chevron-down.png";

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
    if (tabAtiva === "ativos") {
      return aluno.ativo;
    } else if (tabAtiva === "arquivados") {
      return !aluno.ativo;
    }
    return true; // "todos"
  });

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
            onClick={() => setTabAtiva("todos")}
            className={tabAtiva === "todos" ? "btn-ativo" : false}
          >
            Todos os alunos <span className="badge">{totalAlunos}</span>
          </button>
          <button
            onClick={() => setTabAtiva("ativos")}
            className={tabAtiva === "ativos" ? "btn-ativo" : false}
          >
            Ativos <span className="badge">{totalAtivos}</span>
          </button>
          <button
            onClick={() => setTabAtiva("arquivados")}
            className={tabAtiva === "arquivados" ? "btn-ativo" : false}
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
            {alunosFiltrados.map((aluno) => (
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
      </div>
    </div>
  );
}

export default AlunoList;
