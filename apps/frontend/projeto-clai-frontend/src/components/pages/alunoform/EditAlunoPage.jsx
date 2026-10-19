import { useParams } from "react-router-dom";
import AlunoForm from "./AlunoForm";
import { useUpdateAluno } from "../../../hooks/useUpdateAluno";
import { useGetAlunoByMatricula } from "../../../hooks/useGetAlunoByMatricula";

function EditAlunoPage() {
  const { matricula } = useParams();
  const { data: alunoData, isLoading, error: getError} = useGetAlunoByMatricula(matricula);
  const { mutate: updateAluno, error: updateError, isPending } = useUpdateAluno(alunoData?.id);

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
      defaultValues={alunoData}
  />
  );
}

export default EditAlunoPage;