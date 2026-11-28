package com.ifpb.edu.br.clai.mapper;

import com.ifpb.edu.br.clai.dto.pei.PeiRequestDto;
import com.ifpb.edu.br.clai.dto.pei.PeiResponseDto;
import com.ifpb.edu.br.clai.dto.pei.PeiUpdateRequestDto;
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
        pei.setPeriodoPei(aluno != null ? aluno.getPeriodoAluno() : null);
        pei.setDificuldadesApresentadas(request.dificuldadesApresentadas());
        pei.setPropostasAdaptacoes(request.propostasAdaptacoes());
        pei.setAtivo(request.ativo() != null ? request.ativo() : true);
        return pei;
    }

    public static void updateEntity(PeiUpdateRequestDto request, Pei pei) {
        if (request.historico() != null) {
            pei.setHistorico(request.historico());
        }
        if (request.necessidadesEspecificas() != null) {
            pei.setNecessidadesEspecificas(request.necessidadesEspecificas());
        }
        if (request.conhecimentosHabilidadesInteresses() != null) {
            pei.setConhecimentosHabilidadesInteresses(request.conhecimentosHabilidadesInteresses());
        }
        if (request.dificuldadesApresentadas() != null) {
            pei.setDificuldadesApresentadas(request.dificuldadesApresentadas());
        }
        if (request.propostasAdaptacoes() != null) {
            pei.setPropostasAdaptacoes(request.propostasAdaptacoes());
        }
    }

    public static PeiResponseDto entityToResponse(Pei pei) {
        Aluno aluno = pei.getAluno();
        return new PeiResponseDto(
                pei.getId(),
                aluno != null ? aluno.getId() : null,
                aluno != null ? aluno.getAlunoNome() : null,
                aluno != null ? aluno.getAlunoMatricula() : null,
                pei.getHistorico(),
                pei.getNecessidadesEspecificas(),
                pei.getConhecimentosHabilidadesInteresses(),
                pei.getDificuldadesApresentadas(),
                pei.getPropostasAdaptacoes(),
                pei.getAtivo(),
                pei.getPeriodoPei()
        );
    }
}
