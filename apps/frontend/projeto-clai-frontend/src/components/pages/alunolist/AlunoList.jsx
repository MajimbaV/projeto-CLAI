import TrashImg from "../../../assets/TrashCan.png";
import EditImg from "../../../assets/Edit.png";
import { useState } from "react";
import "./AlunoList.css";
import ChevronLeft from "../../../assets/ChevronLeft.png";
import ChevronRight from "../../../assets/ChevronRight.png";
import { useGetAlunos } from "../../../hooks/useGetAlunos";

function AlunoList({
  onDelete,
  onEdit,
  onView,
  onAdd,
}) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const { data, isLoading, error} = useGetAlunos(paginaAtual, itensPorPagina);

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

  // Se estiver carregando, mostra só isso e para
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

  // Se houver erro, mostra só o erro e para
  if (error) {
    return (
      <div className="aluno-list-body">
        <div className="header">
          <h1 className="header-text">Alunos</h1>
        </div>
        <p>Erro: {error.detail || error}</p>
      </div>
    );
  }

  // Se a lista estiver vazia
  if (!alunos || alunos.length === 0) {
    return (
      <div className="aluno-list-body">
        <div className="header">
          <h1 className="header-text">Alunos</h1>
          <button onClick={handleAdd} className="btn-add">
          + Adicionar Aluno
          </button>
        </div>
        <p>Nenhum aluno encontrado.</p>
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
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
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
            Mostrando {quantidadeAlunos} de{" "}
            {totalAlunosNoBanco} alunos
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
