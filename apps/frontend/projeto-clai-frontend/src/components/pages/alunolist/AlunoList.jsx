import TrashImg from "../../../assets/TrashCan.png";
import EditImg from "../../../assets/Edit.png";

function AlunoList({ alunos, isLoading, erro, onDelete, onEdit, onView }) {
  function handleDelete(aluno) {
    onDelete(aluno);
  }

  function handleEdit(aluno) {
    onEdit(aluno);
  }

  function handleView(aluno) {
    onView(aluno);
  }

  // Se estiver carregando, mostra só isso e para a execução
  if (isLoading) {
    return (
      <div className="aluno-list-body">
        <p>Carregando...</p>
      </div>
    );
  }

  // Se houver erro, mostra só o erro e para a execução
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

  return (
    <div className="aluno-list-body">
      <h1>Lista de Alunos</h1>
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Log</th>
            <th>Status</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td onClick={() => handleView(aluno)}>
                <div className="aluno-avatar">
                  {aluno.nome} <br />
                  {aluno.matricula}
                </div>
              </td>
              <td>{aluno.log}</td>
              <td>{aluno.ativo ? "Ativo" : "Arquivado"}</td>
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
  );
}

export default AlunoList;
