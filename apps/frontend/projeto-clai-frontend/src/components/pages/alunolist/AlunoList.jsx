import { useState } from "react";
import "./AlunoList.css";
import { useGetAlunos } from "../../../hooks/useGetAlunos";
import { HiOutlineArchive, HiOutlinePencilAlt, HiChevronLeft, HiChevronRight} from "react-icons/hi";

function AlunoList({ onDelete, onEdit, onView, onAdd }) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const { data, isLoading, error } = useGetAlunos(paginaAtual, itensPorPagina);

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

        <p>
          Erro:{" "}
          {error.response?.data?.detail ||
            error.detail ||
            error.message ||
            String(error)}
        </p>
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
