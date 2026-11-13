import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PeiForm from "./PeiForm";
import FormSelect from "../../forms/FormSelect";

import { useGetAlunos } from "../../../hooks/aluno/useGetAlunos";
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

function obterChaveAluno(aluno) {
  return String(aluno?.id ?? aluno?.alunoMatricula ?? aluno?.matricula ?? "");
}

function obterMatricula(aluno) {
  return String(aluno?.alunoMatricula ?? aluno?.matricula ?? "");
}

function obterNomeAluno(aluno) {
  return aluno?.alunoNome ?? aluno?.nome ?? "";
}

function obterCursoAluno(aluno) {
  return aluno?.alunoCurso ?? aluno?.curso ?? "";
}

export default function NewPeiPage() {
  const navigate = useNavigate();

  const {
    data,
    isLoading: isLoadingAlunos,
    error: errorAlunos,
  } = useGetAlunos();

  const { mutate: createPei, isPending, error: errorCreate } = useCreatePei();

  const [formData, setFormData] = useState(VALORES_INICIAIS);
  const [idAlunoSelecionado, setIdAlunoSelecionado] = useState("");
  const [feedback, setFeedback] = useState("");

  const caminhoDeVolta = "/planejamento/alunos";

  const alunos = Array.isArray(data)
    ? data
    : Array.isArray(data?.content)
      ? data.content
      : [];

  const alunoSelecionado =
    alunos.find((aluno) => obterChaveAluno(aluno) === idAlunoSelecionado) ||
    null;

  function handleAlunoChange(event) {
    setIdAlunoSelecionado(event.target.value);
    setFeedback("");
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");

    if (!alunoSelecionado) {
      setFeedback("Selecione um estudante antes de cadastrar o PEI.");
      return;
    }

    const payload = {
      ...formData,
      nomeEstudante: obterNomeAluno(alunoSelecionado),
      matricula: obterMatricula(alunoSelecionado),
      curso: obterCursoAluno(alunoSelecionado),
      semestreAno: formData.semestreAno || alunoSelecionado.periodoAluno || "",
    };

    createPei(payload, {
      onSuccess: () => navigate(caminhoDeVolta),
    });
  }

  if (isLoadingAlunos) {
    return <div>Carregando dados...</div>;
  }

  return (
    <>
      <div className="pei-student-selector">
        <FormSelect
          name="estudanteSelecionado"
          label="Selecione o estudante"
          value={idAlunoSelecionado}
          onChange={handleAlunoChange}
          options={alunos.map((aluno) => ({
            value: obterChaveAluno(aluno),
            label: `${obterNomeAluno(aluno) || "Nome não informado"} — ${
              obterMatricula(aluno) || obterChaveAluno(aluno)
            }`,
          }))}
          placeholder="Selecione um estudante..."
          required
          disabled={isPending || alunos.length === 0}
        />
      </div>

      {feedback && (
        <div className="pei-alert" role="alert">
          {feedback}
        </div>
      )}

      <PeiForm
        initialValues={formData}
        alunoSelecionado={alunoSelecionado}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate(caminhoDeVolta)}
        isLoading={isPending}
        errors={errorCreate || errorAlunos}
      />
    </>
  );
}
