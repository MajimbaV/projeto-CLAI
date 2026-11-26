export function getAlunoMockFromPei(pei) {
  const id = pei?.alunoId ?? pei?.aluno?.id ?? pei?.aluno?._id;

  if (!id) return null;

  return {
    id,
    alunoId: id,
    alunoNome: pei.alunoNome ?? pei.aluno?.alunoNome ?? pei.aluno?.nome ?? "",
    alunoMatricula:
      pei.alunoMatricula ?? pei.aluno?.alunoMatricula ?? pei.aluno?.matricula ?? "",
    alunoCurso: pei.alunoCurso ?? pei.aluno?.alunoCurso ?? pei.aluno?.curso ?? "",
  };
}
