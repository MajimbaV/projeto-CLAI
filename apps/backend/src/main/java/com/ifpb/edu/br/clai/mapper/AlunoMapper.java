package com.ifpb.edu.br.clai.mapper;

import com.ifpb.edu.br.clai.dto.aluno.AlunoRequestDto;
import com.ifpb.edu.br.clai.dto.aluno.AlunoResponseDto;
import com.ifpb.edu.br.clai.model.aluno.Aluno;

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

        if (request.statusAtivo() != null) {
            aluno.setStatusAtivo(request.statusAtivo());
        }
    }

    public static AlunoResponseDto entityToResponse(Aluno aluno) {
        return new AlunoResponseDto(
                aluno.getId(),
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
                aluno.getPeriodoAluno(),
                aluno.getStatusAtivo()
        );
    }
}
