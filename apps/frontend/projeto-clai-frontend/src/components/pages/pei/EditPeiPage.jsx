import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import PeiForm from "./PeiForm";

import { useUpdatePei } from "../../../hooks/pei/useUpdatePei";
import { useGetAlunoByMatricula } from "../../../hooks/aluno/useGetAlunoByMatricula";
import { useGetPei } from "../../../hooks/pei/useGetPei";

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

export default function EditPeiPage() {
  const navigate = useNavigate();
  const { matricula, id } = useParams();
  const location = useLocation();

  const peiInicial = location.state?.pei || null;

  const {
    data: peiBuscado,
    isLoading: isLoadingPei,
    error: errorPei,
  } = useGetPei(id);

  const peiAtual = peiInicial || peiBuscado;

  const {
    data: aluno,
    isLoading: isLoadingAluno,
    error: errorAluno,
  } = useGetAlunoByMatricula(matricula);

  const { mutate: updatePei, isPending, error: errorUpdate } = useUpdatePei(id);

  const caminhoDeVolta = matricula
    ? `/planejamento/alunos/${encodeURIComponent(matricula)}`
    : "/planejamento/alunos";

  if (isLoadingPei || isLoadingAluno) {
    return <div>Carregando dados...</div>;
  }

  return (
    <EditPeiForm
      peiAtual={peiAtual}
      aluno={aluno}
      isPending={isPending}
      error={errorPei || errorAluno || errorUpdate}
      updatePei={updatePei}
      onCancel={() => navigate(caminhoDeVolta)}
    />
  );
}

function EditPeiForm({
  peiAtual,
  aluno,
  isPending,
  error,
  updatePei,
  onCancel,
}) {
  const [formData, setFormData] = useState(() => ({
    ...VALORES_INICIAIS,
    ...peiAtual,
  }));

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
      matricula:
        aluno?.alunoMatricula ?? aluno?.matricula ?? formData.matricula,
      curso: aluno?.alunoCurso ?? aluno?.curso ?? formData.curso,
      semestreAno: aluno?.periodoAluno ?? formData.semestreAno,
    };

    updatePei(payload);
  }

  return (
    <PeiForm
      initialValues={formData}
      alunoSelecionado={aluno}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={isPending}
      errors={error}
    />
  );
}
