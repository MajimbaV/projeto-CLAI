import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import PeiForm from "./PeiForm";

import { useUpdatePei } from "../../../hooks/pei/useUpdatePei";
import { useGetAlunoByMatricula } from "../../../hooks/aluno/useGetAlunoByMatricula";
import { useGetPei } from "../../../hooks/pei/useGetPei";

const VALORES_INICIAIS = {
  historico: "",
  necessidadesEspecificas: "",
  conhecimentosHabilidadesCapacidadesInteressesNecessidades: "",
  dificuldadesApresentadas: "",
  propostasAdaptacoesCurriculares: "",
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

  if (!peiAtual || !aluno) {
    return (
      <div>
        <p>Não foi possível carregar os dados do PEI ou do estudante.</p>
        <button type="button" onClick={() => navigate(caminhoDeVolta)}>
          Voltar
        </button>
      </div>
    );
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
      historico: formData.historico,
      necessidadesEspecificas: formData.necessidadesEspecificas,
      conhecimentosHabilidadesCapacidadesInteressesNecessidades:
        formData.conhecimentosHabilidadesCapacidadesInteressesNecessidades,
      dificuldadesApresentadas: formData.dificuldadesApresentadas,
      propostasAdaptacoesCurriculares: formData.propostasAdaptacoesCurriculares,
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
