import {useNavigate, useParams, useLocation } from "react-router-dom";
import EstudoCasoForm from "./EstudoCasoForm";
import { useUpdateEstudoCaso } from "../../../hooks/estudo-caso/useUpdateEstudoCaso";
import { useGetAlunoByMatricula } from "../../../hooks/aluno/useGetAlunoByMatricula";

export default function AddEstudoCasoPage({
  modo = "adicionar",
}) {
  const navigate = useNavigate();
  const { matricula, id } = useParams();
  const location = useLocation();

  const estudoCasoInicial = location.state?.estudoCaso || null;

  const { data: aluno, isLoading: isLoadingAluno, error: errorAluno } = useGetAlunoByMatricula(matricula);
  const { mutate: updateEstudoCaso, isPending, error: errorUpdate } = useUpdateEstudoCaso(id);

  console.log("estudoCasoInicial", estudoCasoInicial);

  const caminhoDeVolta = matricula
    ? `/alunos/${encodeURIComponent(matricula)}`
    : "/alunos";

  if (isLoadingAluno) {
    return <div>Carregando dados...</div>;
  }
  
  return (
    <EstudoCasoForm
      modo={modo}
      alunoInicial = {aluno}
      defaultValues={estudoCasoInicial}
      isLoadingAlunos={isLoadingAluno}
      isPending={isPending}
      error={errorUpdate || errorAluno}
      onSubmit={updateEstudoCaso ? updateEstudoCaso : undefined}
      onCancel={() => navigate(caminhoDeVolta)}
    />
  );
}
