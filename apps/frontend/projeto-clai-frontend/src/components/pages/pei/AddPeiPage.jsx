import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PeiForm from "./PeiForm";

import { useGetAlunoByMatricula } from "../../../hooks/aluno/useGetAlunoByMatricula";
import { useCreatePei } from "../../../hooks/pei/useCreatePei";

const VALORES_INICIAIS = {
  nomeEstudante: "",
  matricula: "",
  curso: "",
  semestreAno: "",
  historico: "",
  necessidadesEspecificas: "",
  conhecimentosHabilidadesCapacidadesInteressesNecessidades: "",
  dificuldadesApresentadas: "",
  propostasAdaptacoesCurriculares: "",
  assinaturaClai: "",
  assinaturaSetorPedagogico: "",
  assinaturaCoordenadorCurso: "",
  assinaturaEstudanteResponsavel: "",
  assinaturaDocente: "",
};

export default function AddPeiPage() {
  const navigate = useNavigate();
  const { matricula } = useParams();

  const {
    data: aluno,
    isLoading: isLoadingAluno,
    error: errorAluno,
  } = useGetAlunoByMatricula(matricula);

  const { mutate: createPei, isPending, error: errorCreate } = useCreatePei();

  const [formData, setFormData] = useState(VALORES_INICIAIS);

  const caminhoDeVolta = matricula
    ? `/alunos/${encodeURIComponent(matricula)}`
    : "/alunos";

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...formData,
      nomeEstudante: aluno?.alunoNome ?? aluno?.nome ?? formData.nomeEstudante,
      matricula: aluno?.alunoMatricula ?? matricula ?? formData.matricula,
      curso: aluno?.alunoCurso ?? aluno?.curso ?? formData.curso,
      semestreAno: aluno?.periodoAluno ?? formData.semestreAno,
    };

    createPei(payload, {
      onSuccess: () => navigate(caminhoDeVolta),
    });
  }

  if (isLoadingAluno) {
    return <div>Carregando dados...</div>;
  }

  return (
    <PeiForm
      initialValues={formData}
      alunoSelecionado={aluno}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={() => navigate(caminhoDeVolta)}
      isLoading={isPending}
      errors={errorCreate || errorAluno}
    />
  );
}
