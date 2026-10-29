import {useNavigate} from "react-router-dom";
import EstudoCasoForm from "./EstudoCasoForm";
import { useGetAlunos } from "../../../hooks/useGetAlunos";
import { useCreateEstudoCaso } from "../../../hooks/useCreateEstudoCaso";

export default function EstudoCasoPage({
  modo = "criar",
}) {
  const navigate = useNavigate();

  const { data, isLoading: isLoadingAlunos, error: errorAlunos } = useGetAlunos();
  const { mutate: createAluno, isPending, error: errorCreate } = useCreateEstudoCaso();

  const caminhoDeVolta = "/planejamento/alunos";

  if (isLoadingAlunos) {
    return <div>Carregando dados...</div>;
  }

  const alunos = data.content || null;

  return (
    <EstudoCasoForm
      modo={modo}
      alunos={alunos}
      isLoadingAlunos={isLoadingAlunos}
      isPending={isPending}
      error={errorCreate || errorAlunos}
      onSubmit={createAluno ? createAluno : undefined}
      onCancel={() => navigate(caminhoDeVolta)}
    />
  );
}
