import { useParams } from "react-router-dom";
import AlunoForm from "./AlunoForm";
import { useUpdateAluno } from "../../../hooks/aluno/useUpdateAluno";
import { useGetAlunoByMatricula } from "../../../hooks/aluno/useGetAlunoByMatricula";
import { useGetCursos } from "../../../hooks/curso/useGetCursos";

function EditAlunoPage() {
  const { matricula } = useParams();
  const { data: alunoData, isLoading, error: getError} = useGetAlunoByMatricula(matricula);
  const { mutate: updateAluno, error: updateError, isPending } = useUpdateAluno(alunoData?.id);
  const { data: cursos } = useGetCursos({size: 100, filters: {statusAtivo: true}});

  const opcoesCursos = cursos?.content?.map((curso) => ({
    value: curso.id,
    label: `${curso.nomeCurso} (${curso.cursoSigla})`,
  }));

  if (isLoading) {
    return <div>Carregando dados do aluno...</div>;
  }

  return (
    <AlunoForm
      mode="edit"
      onSubmit={updateAluno}
      isPending={isPending}
      isLoading={isLoading}
      error={updateError || getError}
      opcoesCursos = {opcoesCursos}
      defaultValues={alunoData}
  />
  );
}

export default EditAlunoPage;