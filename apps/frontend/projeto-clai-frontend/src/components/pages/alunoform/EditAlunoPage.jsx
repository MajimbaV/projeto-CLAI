import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlunoForm from "./AlunoForm";

function buscarAlunoMock(matricula) {
  return {
    alunoNome: "Maria Silva",
    alunoNascimento: "2012-04-20",
    alunoTelefone: "(83) 99999-0000",
    alunoEmail: "maria.silva@email.com",
    nomeResponsavel: "Joana Silva",
    grauParentesco: "Mãe",
    responsavelTelefone: "(83) 98888-0000",
    responsavelEmail: "joana.silva@email.com",
    alunoMatricula: matricula,
    alunoCurso: "Informática",
    periodoIngresso: "2026.1",
    periodoAluno: "2026.1",
  };
}

function EditAlunoPage() {
  const { matricula } = useParams();

  const [aluno, setAluno] = useState(null);
  const [matriculaCarregada, setMatriculaCarregada] = useState(null);

  const isLoading = matricula !== matriculaCarregada;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAluno(buscarAlunoMock(matricula));
      setMatriculaCarregada(matricula);
    }, 1500);

    return () => clearTimeout(timer);
  }, [matricula]);

  function handleUpdate(payload) {
    console.log("Aluno editado (mock):", payload);
  }

  return (
    <AlunoForm
  key={`${matricula}-${aluno ? "carregado" : "carregando"}`}
  mode="edit"
  onSubmit={handleUpdate}
  isPending={false}
  isLoading={isLoading}
  error={null}
  defaultValues={aluno}
/>
  );
}

export default EditAlunoPage;