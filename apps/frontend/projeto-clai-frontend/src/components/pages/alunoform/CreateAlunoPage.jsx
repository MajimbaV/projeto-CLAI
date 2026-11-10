import AlunoForm from "./AlunoForm";
import { useCreateAluno } from "../../../hooks/aluno/useCreateAluno";

function CreateAlunoPage() {
  const { mutate: createAluno, isLoading, error, isPending} = useCreateAluno();

  return (
    <AlunoForm
      mode="create"
      onSubmit={createAluno}
      isPending={isPending}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default CreateAlunoPage;