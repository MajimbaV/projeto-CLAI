import AlunoForm from "./AlunoForm";
import { useCreateAluno } from "../../../hooks/aluno/useCreateAluno";
import { useGetCursos } from "../../../hooks/curso/useGetCursos";

function CreateAlunoPage() {
  const { mutate: createAluno, isLoading, error, isPending} = useCreateAluno();
  const { data: cursos } = useGetCursos({size: 100, filters: {statusAtivo: true}});

  const opcoesCursos = cursos?.content?.map((curso) => ({
    value: curso.id,
    label: `${curso.nomeCurso} (${curso.cursoSigla})`,
  }));

  return (
    <AlunoForm
      mode="create"
      onSubmit={createAluno}
      isPending={isPending}
      isLoading={isLoading}
      opcoesCursos={opcoesCursos}
      error={error}
    />
  );
}

export default CreateAlunoPage;