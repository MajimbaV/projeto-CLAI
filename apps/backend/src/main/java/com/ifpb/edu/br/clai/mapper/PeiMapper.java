package com.ifpb.edu.br.clai.mapper;

import com.ifpb.edu.br.clai.dto.pei.PeiRequestDto;
import com.ifpb.edu.br.clai.dto.pei.PeiResponseDto;
import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.pei.Pei;

public final class PeiMapper {

    private PeiMapper() {}

    public static Pei requestToEntity(PeiRequestDto request, Aluno aluno) {
        Pei pei = new Pei();
        pei.setAluno(aluno);
        pei.setHistorico(request.historico());
        pei.setNecessidadesEspecificas(request.necessidadesEspecificas());
        pei.setConhecimentosHabilidadesInteresses(request.conhecimentosHabilidadesInteresses());
        pei.setDificuldadesApresentadas(request.dificuldadesApresentadas());
        pei.setPropostasAdaptacoes(request.propostasAdaptacoes());
        pei.setAtivo(request.ativo() != null ? request.ativo() : true);
        return pei;
    }

    public static PeiResponseDto entityToResponse(Pei pei) {
        Aluno aluno = pei.getAluno();
        return new PeiResponseDto(
                pei.getId(),
                aluno.getId(),
                aluno.getAlunoNome(),
                aluno.getAlunoMatricula(),
                pei.getHistorico(),
                pei.getNecessidadesEspecificas(),
                pei.getConhecimentosHabilidadesInteresses(),
                pei.getDificuldadesApresentadas(),
                pei.getPropostasAdaptacoes(),
                pei.getAtivo()
        );
    }
}
