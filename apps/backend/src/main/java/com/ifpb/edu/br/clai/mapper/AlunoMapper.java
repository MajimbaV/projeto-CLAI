package com.ifpb.edu.br.clai.mapper;

import com.ifpb.edu.br.clai.dto.AlunoRequestDto;
import com.ifpb.edu.br.clai.model.Aluno;

public class AlunoMapper {
    public static void requestToEntity(AlunoRequestDto request, Aluno aluno) {
        aluno.setAlunoNome(request.alunoNome());
        aluno.setAlunoNascimento(request.alunoNascimento());
        aluno.setAlunoTelefone(request.alunoTelefone());
        aluno.setAlunoEmail(request.alunoEmail());
        aluno.setAlunoMatricula(request.alunoMatricula());
        aluno.setAlunoCurso(request.alunoCurso());
        aluno.setPeriodoIngresso(request.periodoIngresso());
        aluno.setPeriodoAluno(request.periodoAluno());
        aluno.setNomeResponsavel(request.nomeResponsavel());
        aluno.setGrauParentesco(request.grauParentesco());
        aluno.setResponsavelTelefone(request.responsavelTelefone());
        aluno.setResponsavelEmail(request.responsavelEmail());
    }

    // futuro metodo para o AlunoResponseDto
    public static AlunoRequestDto entityToResponse(Aluno aluno) {
        return new AlunoRequestDto(
                aluno.getAlunoNome(),
                aluno.getAlunoNascimento(),
                aluno.getAlunoTelefone(),
                aluno.getAlunoEmail(),
                aluno.getNomeResponsavel(),
                aluno.getGrauParentesco(),
                aluno.getResponsavelTelefone(),
                aluno.getResponsavelEmail(),
                aluno.getAlunoMatricula(),
                aluno.getAlunoCurso(),
                aluno.getPeriodoIngresso(),
                aluno.getPeriodoAluno()
        );
    }
}
