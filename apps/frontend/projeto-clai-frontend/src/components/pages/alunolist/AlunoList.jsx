import TrashImg from "../../../assets/TrashCan.png";
import EditImg from "../../../assets/Edit.png";
import { useState } from "react";
import "./AlunoList.css";
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


  // Calcula os alunos que vão aparecer na página atual
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const alunosPaginados = alunos.slice(
    indicePrimeiroItem,
    indiceUltimoItem,
  );

  // Calcula o número total de páginas necessárias
  const totalPaginas = Math.ceil(alunos.length / itensPorPagina);

  return (
    <div className="aluno-list-body">
      <div className="header">
        <h1 className="header-text">Alunos</h1>
        <button onClick={handleAdd} className="btn-add">
          + Adicionar Aluno
        </button>
      </div>

      <div className="aluno-card">
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunosPaginados.map((aluno) => (
              <tr key={aluno.id}>
                <td onClick={() => handleView(aluno)}>
                  <div className="aluno-info">
                    <span className="aluno-nome">{aluno.alunoNome}</span>
                    <span className="aluno-matricula">{aluno.alunoMatricula}</span>
                  </div>
                </td>
                <td>{aluno.alunoCurso}</td>
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
            Mostrando {alunos.length > 0 ? indicePrimeiroItem + 1 : 0}-
            {Math.min(indiceUltimoItem, alunos.length)} de{" "}
            {alunos.length} alunos
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
