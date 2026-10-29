import {useNavigate, useParams } from "react-router-dom";
import EstudoCasoForm from "./EstudoCasoForm";
import { useGetAlunoByMatricula } from "../../../hooks/useGetAlunoByMatricula";
import { useCreateEstudoCaso } from "../../../hooks/useCreateEstudoCaso";

export default function AddEstudoCasoPage({
  modo = "adicionar",
}) {
  const navigate = useNavigate();
  const { matricula } = useParams();

  const { data: aluno, isLoading: isLoadingAluno, error: errorAluno } = useGetAlunoByMatricula(matricula);
  const { mutate: createAluno, isPending, error: errorCreate } = useCreateEstudoCaso();


  const caminhoDeVolta = matricula
    ? `/alunos/${encodeURIComponent(matricula)}`
    : "/alunos";

  if (isLoadingAluno) {
    return <div>Carregando dados...</div>;
  }
  
  console.log("Aluno carregado:", aluno);
  return (
    <EstudoCasoForm
      modo={modo}
      alunoInicial = {aluno}
      isLoadingAlunos={isLoadingAluno}
      isPending={isPending}
      error={errorCreate || errorAluno}
      onSubmit={createAluno ? createAluno : undefined}
      onCancel={() => navigate(caminhoDeVolta)}
    />
  );
}
