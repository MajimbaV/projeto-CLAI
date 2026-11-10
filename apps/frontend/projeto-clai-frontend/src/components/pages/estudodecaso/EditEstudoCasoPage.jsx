import {useNavigate, useParams, useLocation } from "react-router-dom";
import EstudoCasoForm from "./EstudoCasoForm";
import { useUpdateEstudoCaso } from "../../../hooks/estudo-caso/useUpdateEstudoCaso";
import { useGetAlunoByMatricula } from "../../../hooks/aluno/useGetAlunoByMatricula";
import { useGetEstudoCaso } from "../../../hooks/estudo-caso/useGetEstudoCaso";

export default function AddEstudoCasoPage({
  modo = "adicionar",
}) {
  const navigate = useNavigate();
  const { matricula, id } = useParams();
  const location = useLocation();

  const estudoCasoInicial = location.state?.estudoCaso || null;
  const { data: estudoCasoBuscado, isLoading: isLoadingEstudoCaso, error: errorEstudoCaso } = useGetEstudoCaso(id)

  const estudoCasoAtual = estudoCasoInicial || estudoCasoBuscado;

  const { data: aluno, isLoading: isLoadingAluno, error: errorAluno } = useGetAlunoByMatricula(matricula);
  const { mutate: updateEstudoCaso, isPending, error: errorUpdate } = useUpdateEstudoCaso(id);

  console.log("estudoCasoAtual", estudoCasoAtual);

  const caminhoDeVolta = matricula
    ? `..//planejamento/alunos/${encodeURIComponent(matricula)}`
    : "..//planejamento/alunos";

  if (isLoadingEstudoCaso || isLoadingAluno) {
    return <div>Carregando dados...</div>;
  }
  
  return (
    <EstudoCasoForm
      modo={modo}
      alunoInicial = {aluno}
      defaultValues={estudoCasoAtual}
      isLoadingAlunos={isLoadingAluno}
      isPending={isPending}
      error={errorEstudoCaso || errorAluno || errorUpdate}
      onSubmit={updateEstudoCaso ? updateEstudoCaso : undefined}
      onCancel={() => navigate(caminhoDeVolta)}
    />
  );
}
